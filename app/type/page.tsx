// app/type/page.tsx
import { prisma } from '@/lib/prisma'
import { Post } from '@prisma/client'
import React from 'react'

export default async function TypePage() {
  const posts: Post[] = await prisma.post.findMany()

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>
              <em>{new Date(post.createdAt).toLocaleString()}</em>
            </p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}
