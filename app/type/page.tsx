'use client'

import { useEffect, useState } from 'react'

type Post = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts', err))
  }, [])

  return (
    <div className="p-4">
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="mb-4 p-2 border rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <small className="text-gray-400">{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  )
}

export default Page
