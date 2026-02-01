import { z } from "zod"

export const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
})

export const UpdatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
})
