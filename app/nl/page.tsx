import Clock from "../components/Clock";
import { HomeIntro } from "../components/HomeIntro";
import { getHomeMetadata } from "../seo";

export const metadata = getHomeMetadata("nl");

export default function Page() {
  return (
    <main>
      <HomeIntro locale="nl" />
      <Clock />
    </main>
  );
}
