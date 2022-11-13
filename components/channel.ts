export const getChannel = async () => {
  const response = await fetch(
    `${
      process.env.HOSTNAME !== undefined
        ? process.env.HOSTNAME
        : process.env.VERCEL_URL
    }/api/channel`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return data;
};
