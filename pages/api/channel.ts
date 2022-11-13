import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.channel.findMany();
  res.status(200).json(data);
}
