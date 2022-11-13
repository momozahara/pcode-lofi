export const getChannel = async () => {
  const response = await fetch(`${process.env.HOSTNAME}/api/channel`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};
