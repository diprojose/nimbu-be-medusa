import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading, Table, Button } from "@medusajs/ui"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const BlogList = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/admin/blog/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Heading level="h1">Blog Posts</Heading>
        <Link to="/blog/create">
            <Button variant="secondary">Create Post</Button>
        </Link>
      </div>

      {isLoading ? (
          <div className="text-ui-fg-subtle">Loading...</div>
      ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {posts.map((post) => (
                <Table.Row key={post.id}>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell className="text-right">
                    <Link to={`/blog/${post.id}`} className="text-ui-fg-interactive hover:underline">Edit</Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Blog",
  icon: ChatBubbleLeftRight,
})

export default BlogList
