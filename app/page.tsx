"use client";

import { use } from "react";
import { lTest } from "components/channel-list";
import Application from "components/application";

export default function Page() {
  const channelList = use(lTest());
  return <Application channelList={channelList} />;
}
