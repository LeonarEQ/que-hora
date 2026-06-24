import Clock from "../components/Clock";
import { HomeIntro } from "../components/HomeIntro";
import { getHomeMetadata } from "../seo";

export const metadata = getHomeMetadata("zh");

export default function Page() {
  return (
    <main>
      <HomeIntro locale="zh" />
      <Clock />
    </main>
  );
}
