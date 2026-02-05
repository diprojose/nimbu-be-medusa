import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../../modules/blog"
import BlogModuleService from "../../../../../modules/blog/service"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const blogModuleService: BlogModuleService = req.scope.resolve(BLOG_MODULE)

  const post = await blogModuleService.retrievePost(req.params.id)

  res.json({ post })
}
