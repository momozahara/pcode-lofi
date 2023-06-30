import { prisma } from "prisma/client";

export const getChannel = async () => {
  return await prisma.channel.findMany();
};
