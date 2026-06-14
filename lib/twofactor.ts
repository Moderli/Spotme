// ============================================================
// twofactor.ts — 2Factor.in OTP API integration
// Server-side helper to send and verify guest mobile OTP codes
// ============================================================
import crypto from "crypto";

const API_KEY = process.env.FACTOR_API_KEY?.trim();
const OTP_SECRET = process.env.GUEST_SESSION_SECRET || "spotme_guest_session_secret_default_32chars_spotme";

/**
 * Normalise phone numbers to E.164-like format (e.g. +919876543210 or 919876543210)
 * 2Factor.in expects country code prefix (e.g. 91 for India) without leading + or with it,
 * depending on their parsing. Usually sending with + is fine, or we strip any non-digit.
 */
function cleanPhoneNumber(phone: string): string {
  return phone.trim().replace(/[^\d+]/g, "");
}

interface SendOtpResult {
  success: boolean;
  sessionId?: string;
  error?: string;
  method: "2factor" | "mock";
}

interface VerifyOtpResult {
  success: boolean;
  error?: string;
  method: "2factor" | "mock";
}

/**
 * Helper to cryptographically sign the OTP session ID with a timestamp.
 */
function signOtpSession(sessionId: string, timestamp: number): string {
  const payload = `${sessionId}:${timestamp}`;
  const signature = crypto
    .createHmac("sha256", OTP_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}:${signature}`;
}

/**
 * Helper to verify and decode the cryptographically signed OTP session ID.
 */
function verifyOtpSession(signedSessionId: string): { sessionId: string; timestamp: number } | null {
  try {
    const parts = signedSessionId.split(":");
    if (parts.length !== 3) return null;
    const [sessionId, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return null;

    const payload = `${sessionId}:${timestamp}`;
    const expectedSignature = crypto
      .createHmac("sha256", OTP_SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      return null;
    }

    return { sessionId, timestamp };
  } catch {
    return null;
  }
}

/**
 * Send an OTP code via 2Factor.in AUTOGEN API (or mock in development)
 */
export async function sendOtpCode(phone: string): Promise<SendOtpResult> {
  const cleanPhone = cleanPhoneNumber(phone);

  if (!API_KEY || API_KEY === "" || API_KEY.startsWith("your_") || API_KEY.includes("FACTOR_API_KEY")) {
    // Mock Mode
    console.log(`\n========================================\n[2FACTOR MOCK] Sent OTP code "123456" to ${cleanPhone}\n========================================\n`);
    const signedSessionId = signOtpSession("mock-session-id", Date.now());
    return {
      success: true,
      sessionId: signedSessionId,
      method: "mock",
    };
  }

  try {
    // 2Factor AUTOGEN endpoint: GET https://2factor.in/API/V1/{api_key}/SMS/{phone_number}/AUTOGEN
    // We append ?OTPLen=6 to request a 6-digit OTP code.
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/${encodeURIComponent(cleanPhone)}/AUTOGEN?OTPLen=6`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`2Factor API returned status ${res.status}`);
    }

    const data = await res.json();

    if (data.Status === "Success") {
      const signedSessionId = signOtpSession(data.Details, Date.now());
      return {
        success: true,
        sessionId: signedSessionId, // Session ID hash
        method: "2factor",
      };
    } else {
      console.error("[twofactor] Send API failure response:", data);
      return {
        success: false,
        error: data.Details || "Failed to send OTP code",
        method: "2factor",
      };
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[twofactor] Exception sending OTP:", msg);
    return {
      success: false,
      error: `Network error sending OTP: ${msg}`,
      method: "2factor",
    };
  }
}

/**
 * Verify an OTP code via 2Factor.in SMS/VERIFY API (or mock in development)
 */
export async function verifyOtpCode(signedSessionId: string, code: string): Promise<VerifyOtpResult> {
  const verified = verifyOtpSession(signedSessionId);
  if (!verified) {
    return {
      success: false,
      error: "Invalid or tampered verification session.",
      method: "mock",
    };
  }

  const { sessionId, timestamp } = verified;

  // Enforce 10-minute expiry (10 * 60 * 1000 ms)
  const EXPIRY_MS = 10 * 60 * 1000;
  if (Date.now() - timestamp > EXPIRY_MS) {
    return {
      success: false,
      error: "Verification code has expired. Please request a new one.",
      method: sessionId === "mock-session-id" ? "mock" : "2factor",
    };
  }

  if (sessionId === "mock-session-id") {
    if (code === "123456") {
      return { success: true, method: "mock" };
    }
    return {
      success: false,
      error: "Invalid verification code. Use 123456 for testing.",
      method: "mock",
    };
  }

  if (!API_KEY) {
    return {
      success: false,
      error: "2Factor API key is not configured.",
      method: "mock",
    };
  }

  try {
    // 2Factor VERIFY endpoint: GET https://2factor.in/API/V1/{api_key}/SMS/VERIFY/{session_id}/{otp_input}
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${encodeURIComponent(sessionId)}/${encodeURIComponent(code)}`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`2Factor API returned status ${res.status}`);
    }

    const data = await res.json();

    if (data.Status === "Success") {
      return { success: true, method: "2factor" };
    } else {
      console.warn("[twofactor] Verify API failure response:", data);
      return {
        success: false,
        error: data.Details || "Invalid verification code",
        method: "2factor",
      };
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[twofactor] Exception verifying OTP:", msg);
    return {
      success: false,
      error: `Network error verifying OTP: ${msg}`,
      method: "2factor",
    };
  }
}

