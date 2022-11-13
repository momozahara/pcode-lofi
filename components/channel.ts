export const getChannel = async () => {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/channel`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return data;
};
