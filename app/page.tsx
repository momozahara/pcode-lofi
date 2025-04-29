import App from "./app";
import prisma from "@/app/lib/prisma";

export default async function Page() {
  const channels = await prisma.channel.findMany();

  return <App channelList={channels} />;
}
