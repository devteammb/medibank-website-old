import crypto from "crypto";

function parseGender(gender) {
  const lowered = String(gender || "").trim().toLowerCase();
  if (lowered === "male") return "male";
  if (lowered === "female") return "female";
  return "other";
}

function normalizeDateOfBirth(dob) {
  const value = String(dob || "").trim();
  if (!value) return "1970-01-01";
  return value;
}

function formatIndianMobileWithCountryCode(mobile) {
  const digits = String(mobile || "").replace(/\D/g, "").slice(-10);
  return digits ? `+91${digits}` : "";
}

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    ...(process.env.PATIENT_API_TOKEN
      ? { Authorization: `Bearer ${process.env.PATIENT_API_TOKEN}` }
      : {}),
  };
}

function getPatientApiBaseUrl() {
  const baseUrl = String(process.env.PATIENT_API_BASE_URL || "").trim();
  if (!baseUrl) throw new Error("PATIENT_API_BASE_URL is not configured");
  return baseUrl.replace(/\/+$/, "");
}

function truncateText(value, maxLength = 1000) {
  const text = String(value || "");
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}... [truncated ${text.length - maxLength} chars]`;
}

function extractCloudflareMeta(html) {
  const source = String(html || "");
  const rayMatch = source.match(/cRay:\s*'([^']+)'/);
  const zoneMatch = source.match(/cZone:\s*'([^']+)'/);

  return {
    blockedByCloudflare: source.includes("cf_chl_opt"),
    cloudflareRayId: rayMatch?.[1] || "",
    cloudflareZone: zoneMatch?.[1] || "",
  };
}

function extractPatientApiErrorMessage(result, fallbackText = "") {
  if (!result || typeof result !== "object") {
    return String(fallbackText || "").trim();
  }

  const firstError =
    Array.isArray(result?.errors) && result.errors.length > 0
      ? result.errors[0]
      : null;

  return (
    result?.message ||
    result?.error_description ||
    result?.error ||
    firstError?.message ||
    firstError?.detail ||
    result?.error?.message ||
    result?.detail ||
    String(fallbackText || "").trim()
  );
}

export async function checkPatientUser({ phone, email }) {
  const path = process.env.PATIENT_API_CHECK_USER_PATH || "/api/v1/auth/check-user";
  const requestUrl = `${getPatientApiBaseUrl()}${path}`;
  const payload = {
    phone: String(phone || "").trim(),
    email: String(email || "").trim(),
  };

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const rawResponseText = await response.text();
  const contentType = response.headers.get("content-type") || "";

  let result = {};
  if (rawResponseText) {
    try {
      result = JSON.parse(rawResponseText);
    } catch {
      result = {};
    }
  }

  if (!response.ok) {
    const cloudflare = extractCloudflareMeta(rawResponseText);
    const externalMessage =
      (cloudflare.blockedByCloudflare
        ? "Patient check-user API request was blocked by Cloudflare challenge. Ask the API team to allowlist this server/IP or bypass bot protection for server-to-server traffic."
        : "") ||
      extractPatientApiErrorMessage(result, rawResponseText);
    const errorMessage = externalMessage
      ? `${externalMessage} (status ${response.status})`
      : `Patient check-user API failed with status ${response.status}`;

    const error = new Error(errorMessage);
    error.code = "patient_check_user_api_failed";
    error.stage = "check_patient_user";
    error.debugDetail = {
      requestUrl,
      payload,
      responseStatus: response.status,
      responseBody: result,
      responseContentType: contentType,
      responseText: truncateText(rawResponseText),
    };
    error.responseStatus = response.status;
    throw error;
  }

  return {
    exists: Boolean(result?.exists),
    conflict: typeof result?.conflict === "string" ? result.conflict : "",
  };
}


export function toPatientRegisterPayload(draft = {}) {
  const randomCredential = crypto.randomBytes(8).toString("hex");

  return {
    email: draft.email,
    password: draft.password || randomCredential,
    phone: formatIndianMobileWithCountryCode(draft.mobile),
    first_name: draft.firstName,
    last_name: draft.lastName || "-",
    date_of_birth: normalizeDateOfBirth(draft.dob),
    gender: parseGender(draft.gender),
    abha_id: draft.abhaId || randomCredential,
    city: draft.city || "",
    state: draft.state || "",
    pincode: draft.pincode || "000000",
    country: draft.country || "India",
  };
}

export async function registerPatient(payload) {
  const path =
    process.env.PATIENT_API_REGISTER_PATH || "/api/v1/patients/register";
  const requestUrl = `${getPatientApiBaseUrl()}${path}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const rawResponseText = await response.text();
  const contentType = response.headers.get("content-type") || "";

  let result = {};
  if (rawResponseText) {
    try {
      result = JSON.parse(rawResponseText);
    } catch {
      result = {};
    }
  }

  if (!response.ok) {
    const cloudflare = extractCloudflareMeta(rawResponseText);
    const externalMessage =
      (cloudflare.blockedByCloudflare
        ? "Patient register API request was blocked by Cloudflare challenge. Ask the API team to allowlist this server/IP or bypass bot protection for server-to-server traffic."
        : "") ||
      extractPatientApiErrorMessage(result, rawResponseText);
    const errorMessage = externalMessage
      ? `${externalMessage} (status ${response.status})`
      : `Patient register API failed with status ${response.status}`;

    const error = new Error(errorMessage);
    error.code = "patient_register_api_failed";
    error.stage = "register_patient";
    error.debugDetail = {
      requestUrl,
      payload,
      responseStatus: response.status,
      responseBody: result,
      responseContentType: contentType,
      responseText: truncateText(rawResponseText),
    };
    error.responseStatus = response.status;
    throw error;
  }

  return result;
}

export async function recordPatientPayment(patientUuid, payload) {
  if (!patientUuid) throw new Error("patientUuid is required to record MID");

  const path =
    process.env.PATIENT_API_MID_PATH_TEMPLATE ||
    `/api/v1/patients/${patientUuid}/mid`;

  const response = await fetch(`${getPatientApiBaseUrl()}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      result.message || `Patient MID API failed with status ${response.status}`
    );
  }

  return result;
}

export function toPatientMidPayload({ attempt, callbackPayload }) {
  const amountFromAttempt = Number(attempt?.amountPaise || 0) / 100;

  return {
    amount: Number(
      callbackPayload?.amount ||
        callbackPayload?.txnAmount ||
        callbackPayload?.transactionAmount ||
        amountFromAttempt ||
        0
    ),
    currency:
      String(
        callbackPayload?.currency ||
          callbackPayload?.currencyCode ||
          "INR"
      ).toUpperCase() || "INR",
    notes: `Gateway merchantTxnNo: ${attempt?.merchantTxnNo || ""}`,
    provider: "icici",
    status: attempt?.state === "SUCCESS" ? "succeeded" : "failed",
    transaction_id:
      callbackPayload?.bankTxnNo ||
      callbackPayload?.txnID ||
      callbackPayload?.txnAuthID ||
      attempt?.merchantTxnNo ||
      "",
  };
}

export async function createInlinePasswordSetupSession({ patientUuid, email }) {
  const response = await fetch(
    `${getPatientApiBaseUrl()}/api/v1/auth/password/setup-inline`,
    {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({
        patient_uuid: patientUuid,
        email,
        purpose: "post_onboarding",
      }),
      cache: "no-store",
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Inline password setup failed:", {
      status: response.status,
      result,
    });

    const errorMessage =
      typeof result.detail === "string"
        ? result.detail
        : result.message ||
          JSON.stringify(result.detail || result || {});

    throw new Error(errorMessage || "Password setup session failed");
  }

  return {
    setupUuid: result.setup_uuid || result.setupUuid,
    expiresIn: result.expires_in || result.expiresIn || 1800,
  };
}
