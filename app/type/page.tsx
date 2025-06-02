// export const runtime = 'nodejs'

// import React from 'react'
// import { prisma } from '../../lib/prisma'
// import type { Post } from '@prisma/client'

// const Page = async () => {
//   const posts: Post[] = await prisma.post.findMany()

//   return (
//     <div className="p-4">
//       {posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post.id} className="mb-4 p-2 border rounded">
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="text-gray-600">{post.content}</p>
//             <small className="text-sm text-gray-400">
//               Created: {new Date(post.createdAt).toLocaleString()}
//             </small>
//           </div>
//         ))
//       ) : (
//         <div>No posts found.</div>
//       )}
//     </div>
//   )
// }

// export default Page



import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page