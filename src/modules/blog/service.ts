import { MedusaService } from "@medusajs/framework/utils"
import Post from "./models/post.ts"

class BlogModuleService extends MedusaService({
  Post,
}){
}

export default BlogModuleService