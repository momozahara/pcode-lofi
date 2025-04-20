import { type Prisma, PrismaClient } from "./generated/prisma-client-js/client";

const prisma = new PrismaClient();

const seedData: Prisma.ChannelCreateInput[] = [
  {
    name: "chillhop raccoon",
    key: "5yx6BWlEVcY",
    weight: 0,
  },
  {
    name: "chillhop relaxing raccoon",
    key: "7NOSDKb0HlU",
    weight: 1,
  },
  {
    name: "bootlet smoke",
    key: "A_hmrykwR7g",
    weight: 2,
  },
  {
    name: "college guy",
    key: "4xDzrJKXOOY",
    weight: 3,
  },
  {
    name: "college girl",
    key: "jfKfPfyJRdk",
    weight: 4,
  },
  {
    name: "sleepy girl",
    key: "28KRPhVzCus",
    weight: 5,
  },
  {
    name: "rural girl",
    key: "Na0w3Mz46GA",
    weight: 6,
  },
];

const seed = async (): Promise<{
  result: Prisma.ChannelCreateInput[];
  toDelete: number[];
}> => {
  const channels = await prisma.channel.findMany();
  const result: Prisma.ChannelCreateInput[] = [];
  const toDelete: number[] = [];

  const intersectionResult = channels.filter(
    (item1) => !seedData.some((item2) => item2.weight === item1.weight),
  );

  intersectionResult.forEach((s) => {
    toDelete.push(s.weight);
  });

  for (const s of seedData) {
    const _isExist = channels.find((x) => x.weight === s.weight);
    if (_isExist) {
      if (_isExist.name !== s.name || _isExist.key !== s.key) {
        toDelete.push(s.weight);
        result.push(s);
      }
      continue;
    }
    result.push(s);
  }
  if (toDelete.length !== 0) {
    await prisma.channel.deleteMany({
      where: {
        weight: {
          in: toDelete,
        },
      },
    });
  }
  if (result.length !== 0) {
    await prisma.channel.createMany({
      data: result,
    });
  }
  return {
    result,
    toDelete,
  };
};

const start = async () => {
  const { result: channels, toDelete } = await seed();
  console.log(channels);
  console.log(toDelete);
};

void start();
