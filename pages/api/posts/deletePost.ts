import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: "Please sign in" })
    }

    // Delete Post
    try {
      const postId: string = await req.body.id
      //console.log(postId)
      const result = await prisma.post.delete({
        where: {
          id: postId,
        }
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ message: "Error has occured while deleting the post"})
    }
  }
}
