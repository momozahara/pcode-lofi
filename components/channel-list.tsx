const lists = [
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

// prepare for prisma in the future
export const lTest = async () => {
  await new Promise((res) => setTimeout(res, 300));
  return lists;
};

export default lists;
