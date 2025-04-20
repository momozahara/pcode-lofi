import { prisma } from "@prismaclient/client";

export const getChannel = async () => {
  return await prisma.channel.findMany();
};
