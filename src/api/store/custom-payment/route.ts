import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { createPaymentCollectionWorkflow } from "../../../workflows/create-payment-collection"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await createPaymentCollectionWorkflow(req.scope)
    .run()

  res.json(result)
}
