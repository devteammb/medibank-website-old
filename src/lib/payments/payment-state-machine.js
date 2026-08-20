const allowedTransitions = {
  CREATED: ["INITIATED", "FAILED", "CANCELLED"],
  INITIATED: ["REDIRECTED", "PENDING", "FAILED", "CANCELLED", "RECONCILING"],
  REDIRECTED: ["PENDING", "SUCCESS", "FAILED", "CANCELLED", "RECONCILING"],
  PENDING: ["SUCCESS", "FAILED", "CANCELLED", "RECONCILING"],
  SUCCESS: [],
  FAILED: ["RECONCILING"],
  CANCELLED: ["RECONCILING"],
  RECONCILING: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
};

export function canTransition(from, to) {
  if (from === to) return true;
  return allowedTransitions[from]?.includes(to) || false;
}

export function assertValidTransition(from, to) {
  if (!canTransition(from, to)) throw new Error(`Invalid payment state transition: ${from} -> ${to}`);
}
