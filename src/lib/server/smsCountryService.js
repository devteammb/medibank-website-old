const DEFAULT_BASE_URL = "https://restapi.smscountry.com";
const DEFAULT_COUNTRY_CODE = "91";
const DEFAULT_SEND_PATH = "/v0.1/Accounts/${SMSCOUNTRY_AUTH_KEY}/SMSes/";
const DEFAULT_OTP_TEMPLATE =
  "Dear User, {{OTP}} is the OTP for New user registration on the Charak HealthTech app";

function env(name, fallback = "") {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : fallback;
}

function interpolatePath(pathTemplate) {
  return pathTemplate.replace(/\$\{([A-Z0-9_]+)\}/g, (_, key) => env(key));
}

function normalizeMobile(mobile) {
  const digits = String(mobile || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10
    ? `${env("SMSCOUNTRY_COUNTRY_CODE", DEFAULT_COUNTRY_CODE)}${digits}`
    : digits;
}

function createAuthorizationHeader() {
  const explicit = env("SMSCOUNTRY_AUTH_HEADER");
  if (explicit) return explicit;

  const key = env("SMSCOUNTRY_AUTH_KEY");
  const token = env("SMSCOUNTRY_AUTH_TOKEN");

  if (key && token) {
    return `Basic ${Buffer.from(`${key}:${token}`).toString("base64")}`;
  }

  return "";
}

function buildSmsPayload({ mobile, otp }) {
  const messageTemplate = env("SMSCOUNTRY_OTP_MESSAGE", DEFAULT_OTP_TEMPLATE);

  return {
    Text: messageTemplate.replaceAll("{{OTP}}", otp),
    Number: normalizeMobile(mobile),
    SenderId: env("SMSCOUNTRY_SENDER_ID"),
    Tool: "API",
  };
}

function buildRequest() {
  const baseUrl = env("SMSCOUNTRY_BASE_URL", DEFAULT_BASE_URL);
  const sendPath = interpolatePath(env("SMSCOUNTRY_SEND_PATH", DEFAULT_SEND_PATH));

  return {
    url: new URL(sendPath, baseUrl).toString(),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: createAuthorizationHeader(),
    },
  };
}

export function validateSmsCountryConfig() {
  const issues = [];

  if (!env("SMSCOUNTRY_AUTH_KEY")) issues.push("SMSCOUNTRY_AUTH_KEY is missing");
  if (!env("SMSCOUNTRY_AUTH_TOKEN") && !env("SMSCOUNTRY_AUTH_HEADER")) {
    issues.push("SMSCOUNTRY_AUTH_TOKEN or SMSCOUNTRY_AUTH_HEADER is missing");
  }
  if (!env("SMSCOUNTRY_SENDER_ID")) issues.push("SMSCOUNTRY_SENDER_ID is missing");

  return issues;
}

export async function sendSmsCountryOtp({ mobile, otp }) {
  const issues = validateSmsCountryConfig();

  if (issues.length) {
    return {
      success: false,
      message: "SMS provider is not configured correctly.",
      debug: issues.join("; "),
    };
  }

  const payload = buildSmsPayload({ mobile, otp });
  const { url, headers } = buildRequest();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await response.text();

    let parsed = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {}

    if (!response.ok) {
      return {
        success: false,
        message: "OTP could not be sent.",
        debug: `SMSCountry ${response.status}: ${text.slice(0, 500)}`,
      };
    }

    const success =
      parsed?.Success === true ||
      parsed?.Success === "True" ||
      parsed?.Message === "Messages Queued";

    if (!success) {
      return {
        success: false,
        message: "OTP could not be sent.",
        debug: text.slice(0, 500),
      };
    }

    return {
      success: true,
      message: "OTP sent successfully.",
      providerResponse: parsed,
    };
  } catch (error) {
    return {
      success: false,
      message: "OTP could not be sent.",
      debug: error instanceof Error ? error.message : "Unknown SMSCountry error.",
    };
  } finally {
    clearTimeout(timeout);
  }
}