import { PaymentService } from "@/lib/payments/payment-service";

export async function reconcileIciciPayments(limit = 100) {
  const service = new PaymentService();
  return service.reconcilePending(limit);
}
