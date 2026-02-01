import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { createCartWorkflow } from "../../../workflows/create-cart"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await createCartWorkflow(req.scope)
    .run()

  res.json(result)
}
