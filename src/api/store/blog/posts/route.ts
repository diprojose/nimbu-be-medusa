import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogModuleService from "../../../../modules/blog/service"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const blogModuleService: BlogModuleService = req.scope.resolve(BLOG_MODULE)

  const limit = parseInt(req.query.limit as string) || 20
  const offset = parseInt(req.query.offset as string) || 0

  const [posts, count] = await blogModuleService.listAndCountPosts(
    {},
    {
      skip: offset,
      take: limit,
    }
  )

  res.json({
    posts,
    count,
    limit,
    offset,
  })
}
