import React from 'react'
import { prisma } from '@/lib/prisma'

export default async function Type() {
  const posts = await prisma.post.findMany({})

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            {post.title}
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}
