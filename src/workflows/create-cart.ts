import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

const createCartStep = createStep(
  "create-cart",
  async ({}, { container }) => {
    const cartModuleService = container.resolve(Modules.CART)

    const cart = await cartModuleService.createCarts({
      currency_code: "usd",
      shipping_address: {
        address_1: "1512 Barataria Blvd",
        country_code: "us",
      },
      items: [
        {
          title: "Shirt",
          unit_price: 1000,
          quantity: 1,
        },
      ],
    })

    return new StepResponse({ cart }, cart.id)
  },
  async (cartId, { container }) => {
    if (!cartId) {
      return
    }
    const cartModuleService = container.resolve(Modules.CART)

    await cartModuleService.deleteCarts([cartId])
  }
)

export const createCartWorkflow = createWorkflow(
  "create-cart",
  () => {
    const { cart } = createCartStep()

    return new WorkflowResponse({
      cart,
    })
  }
)
