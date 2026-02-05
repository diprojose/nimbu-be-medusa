import { Heading, Container, Button, Input, Textarea, Label } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const EditBlogPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      fetch(`/admin/blog/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.post) {
                setTitle(data.post.title)
                setContent(data.post.content)
            }
            setIsLoading(false)
        })
        .catch(console.error)
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch(`/admin/blog/posts/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })

    navigate("/blog")
  }

  const handleDelete = async () => {
      if(!confirm("Are you sure?")) return;

      await fetch(`/admin/blog/posts/${id}`, {
          method: "DELETE"
      })
      navigate("/blog")
  }

  if (isLoading) return <Container>Loading...</Container>

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Heading>Edit Blog Post</Heading>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
            <Label>Content</Label>
            <Textarea placeholder="Post Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Container>
  )
}

export default EditBlogPage
