// prepare for prisma in the future
export const getChannel = async () => {
  const response = await fetch("http://localhost:3000/api/channel", {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};
