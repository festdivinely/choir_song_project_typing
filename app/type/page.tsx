import React from 'react'
import { prisma } from '@/lib/prisma'

const Page = async () => {
  const posts = await prisma.post.findMany()

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <div key={post.id}>
            {post.title} {/* Or any post property you want to show */}
          </div>
        ))
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  )
}

export default Page

