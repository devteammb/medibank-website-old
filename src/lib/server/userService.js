import crypto from "crypto";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import { getRedisUrl, sendRedisCommand } from "@/lib/server/redisClient";

const SHEET_TITLE = "User  Data (Beta Access)";
const HEADER_VALUES = ["firstName", "lastName", "mobile", "email", "timestamp"];

async function initializeSheet(doc) {
  const sheet = await doc.addSheet({ headerValues: HEADER_VALUES });
  await doc.updateProperties({ title: SHEET_TITLE });
  return sheet;
}

async function addUserDataToSheet(sheet, userData) {
  await sheet.addRow(userData);
}

function isGoogleSheetConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID);
}

async function writeUserDataToGoogleSheet(userData) {
  if (!isGoogleSheetConfigured()) return { enabled: false, success: false };

  const MAX_RETRIES = 5;
  const BASE_DELAY = 1000;

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  let sheet = doc.sheetsByIndex[0];
  if (!sheet) {
    sheet = await initializeSheet(doc);
  } else {
    let headers = [];
    let shouldSetHeaders = false;

    try {
      await sheet.loadHeaderRow();
      headers = sheet.headerValues;
    } catch (error) {
      if (error?.message?.includes("No values in the header row")) {
        shouldSetHeaders = true;
      } else {
        throw error;
      }
    }

    if (shouldSetHeaders || !headers || headers.length === 0 || !HEADER_VALUES.every((header) => headers.includes(header))) {
      await sheet.setHeaderRow(HEADER_VALUES);
    }
  }

  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    try {
      await addUserDataToSheet(sheet, userData);
      return { enabled: true, success: true };
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const waitTime = BASE_DELAY * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Max retries exceeded while writing to Google Sheet");
}

async function writeUserDataToRedis(userData) {
  const redisUrl = getRedisUrl();
  if (!redisUrl) {
    throw new Error("Redis is not configured. Set REDIS_URL with your Redis Cloud connection string.");
  }

  const uid = `user:${Date.now()}:${crypto.randomBytes(4).toString("hex")}`;
  const key = `users:lead:${uid}`;
  const payload = JSON.stringify({ ...userData, redisKey: key });

  const saveResult = await sendRedisCommand(["SET", key, payload]);
  if (saveResult !== "OK") throw new Error("Failed to save user data in Redis.");

  await sendRedisCommand(["LPUSH", "users:lead:index", key]);
  if (userData.mobile) {
    await sendRedisCommand(["SET", `users:lead:byMobile:${userData.mobile}`, key]);
  }
  if (userData.email) {
    await sendRedisCommand(["SET", `users:lead:byEmail:${userData.email.toLowerCase()}`, key]);
  }

  return key;
}

export const addUserData = async (data) => {
  const userData = {
    firstName: String(data.firstName || "").trim(),
    lastName: String(data.lastName || "").trim(),
    mobile: String(data.mobile || "").replace(/\D/g, "").slice(-10),
    email: String(data.email || "").trim().toLowerCase(),
    timestamp: new Date().toISOString(),
  };

  const redisKey = await writeUserDataToRedis(userData);

  let sheetStatus = { enabled: false, success: false };
  try {
    sheetStatus = await writeUserDataToGoogleSheet(userData);
  } catch (error) {
    console.warn("Google Sheet write failed; user data is still safely stored in Redis.", error);
  }

  return {
    success: true,
    message: "User data saved to Redis successfully.",
    data: {
      ...userData,
      redisKey,
      sheetMirrored: sheetStatus.enabled ? sheetStatus.success : false,
    },
  };
};
