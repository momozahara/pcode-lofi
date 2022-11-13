import { getChannel } from "components/channel";
import Application from "components/application";

export default async function Page() {
  const channelList = await getChannel();
  return <Application channelList={channelList} />;
}
