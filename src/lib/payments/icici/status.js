const successCodes = new Set(["0", "00", "000", "0000", "SUCCESS", "S", "SUC", "CAPTURED"]);
const pendingCodes = new Set(["PENDING", "P", "1", "01", "PROCESSING", "R1000", "REQUEST_INITIATED", "IN_PROGRESS"]);
const failedCodes = new Set(["FAILED", "F", "2", "02", "DECLINED", "REJECTED"]);
const cancelledCodes = new Set(["CANCELLED", "C", "3", "03", "USER_CANCELLED"]);

export function mapIciciToInternalState(input) {
  const normalized = String(input || "").trim().toUpperCase();
  if (successCodes.has(normalized)) return "SUCCESS";
  if (pendingCodes.has(normalized)) return "PENDING";
  if (failedCodes.has(normalized)) return "FAILED";
  if (cancelledCodes.has(normalized)) return "CANCELLED";
  return "PENDING";
}
