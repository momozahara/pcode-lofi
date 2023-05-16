import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData: Prisma.ChannelCreateInput[] = [
  {
    name: "bootleg smoke",
    key: "bLlloaA4b4g",
    weight: 0,
  },
  {
    name: "chillhop raccoon",
    key: "5yx6BWlEVcY",
    weight: 1,
  },
  {
    name: "chillhop relaxing raccoon",
    key: "7NOSDKb0HlU",
    weight: 2,
  },
  {
    name: "college girl",
    key: "jfKfPfyJRdk",
    weight: 3,
  },
  {
    name: "sleepy girl",
    key: "rUxyKA_-grg",
    weight: 4,
  },
  {
    name: "lonely girl",
    key: "dxUtV-zNv9w",
    weight: 5,
  },
  {
    name: "college guy",
    key: "epaP2LCCuVE",
    weight: 6,
  },
  {
    name: "college guy piano",
    key: "tfBVp0Zi2iE",
    weight: 7,
  },
  {
    name: "coffee shop",
    key: "e3L1PIY1pN8",
    weight: 8,
  },
];

const seed = async (): Promise<Prisma.ChannelCreateInput[]> => {
  const channels = await prisma.channel.findMany();
  let result: Prisma.ChannelCreateInput[] = [];
  for (const s of seedData) {
    const _isExist = channels.find((x) => x.key === s.key);
    if (_isExist) {
      continue;
    }
    result.push(s);
  }
  if (result.length !== 0) {
    await prisma.channel.createMany({
      data: result,
    });
  }
  return result;
};

const start = async () => {
  const channels = await seed();
  console.log(channels);
};

start();
