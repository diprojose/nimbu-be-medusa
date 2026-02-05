import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { UpdatePostSchema } from "../validators"
import { BLOG_MODULE } from "../../../../../modules/blog"
import BlogModuleService from "../../../../../modules/blog/service"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const blogModuleService: BlogModuleService = req.scope.resolve(BLOG_MODULE)

  const post = await blogModuleService.retrievePost(req.params.id)

  res.json({ post })
}

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const validation = UpdatePostSchema.safeParse(req.body)

  if (!validation.success) {
     res.status(400).json({ message: "Invalid request body", errors: validation.error })
     return
  }

  const blogModuleService: BlogModuleService = req.scope.resolve(BLOG_MODULE)

  const post = await blogModuleService.updatePosts({
      id: req.params.id,
      ...validation.data
  })

  res.json({ post })
}

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const blogModuleService: BlogModuleService = req.scope.resolve(BLOG_MODULE)

  await blogModuleService.deletePosts(req.params.id)

  res.status(200).json({
    id: req.params.id,
    object: "post",
    deleted: true,
  })
}
