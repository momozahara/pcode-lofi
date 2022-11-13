import { Prisma, PrismaClient, Channel } from "@prisma/client";

const prisma = new PrismaClient();

const seedData: Prisma.ChannelCreateInput[] = [
  {
    name: "bootleg smoke",
    key: "bLlloaA4b4g",
  },
  {
    name: "pig smoke",
    key: "j4sJkuOPUP8",
  },
  {
    name: "chillhop raccoon",
    key: "5yx6BWlEVcY",
  },
  {
    name: "chillhop relaxing raccoon",
    key: "7NOSDKb0HlU",
  },
  {
    name: "college girl",
    key: "MCkTebktHVc",
  },
  {
    name: "college guy",
    key: "kgx4WGK0oNU",
  },
  {
    name: "college guy piano",
    key: "tfBVp0Zi2iE",
  },
  {
    name: "coffee shop",
    key: "-5KAN9_CzSA",
  },
];

const seed = async () => {
  const channels = await prisma.channel.findMany();
  let result: Channel[] = [];
  for (const s of seedData) {
    const _isExist = channels.find((x) => x.key === s.key);
    if (_isExist) {
      continue;
    }
    const _channels = await prisma.channel.create({
      data: s,
    });
    result.push(_channels);
  }
  return result;
};

const start = async () => {
  const channels = await seed();
  console.log(channels);
};

start();
