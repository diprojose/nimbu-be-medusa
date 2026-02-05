import { Heading, Container, Button, Input, Textarea, Label } from "@medusajs/ui"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateBlogPage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/admin/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })

    navigate("/blog")
  }

  return (
    <Container>
      <Heading className="mb-6">Create Blog Post</Heading>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
            <Label>Content</Label>
            <Textarea placeholder="Post Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </Container>
  )
}

export default CreateBlogPage
