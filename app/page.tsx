"use client";

import { use } from "react";
import { getChannel } from "components/channel";
import Application from "components/application";

export default function Page() {
  const channelList = use(getChannel());
  return <Application channelList={channelList} />;
}
