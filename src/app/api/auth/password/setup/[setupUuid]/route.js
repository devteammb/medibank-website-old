import { NextResponse } from "next/server";

function getPatientApiBaseUrl() {
  const baseUrl = String(process.env.PATIENT_API_BASE_URL || "").trim();
  if (!baseUrl) throw new Error("PATIENT_API_BASE_URL is not configured");
  return baseUrl.replace(/\/+$/, "");
}

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    ...(process.env.PATIENT_API_TOKEN
      ? { Authorization: `Bearer ${process.env.PATIENT_API_TOKEN}` }
      : {}),
  };
}

export async function POST(request, { params }) {
  try {
    const { setupUuid } = params;
    const body = await request.json();

    const response = await fetch(
      `${getPatientApiBaseUrl()}/api/v1/auth/password/setup/${setupUuid}`,
      {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ password: body?.password || "" }),
        cache: "no-store",
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            result?.message ||
            result?.detail ||
            `Password setup failed with status ${response.status}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: result?.message || "Password created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unable to set password right now",
      },
      { status: 500 }
    );
  }
}
