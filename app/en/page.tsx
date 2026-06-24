import Clock from "../components/Clock";
import { HomeIntro } from "../components/HomeIntro";
import { getHomeMetadata } from "../seo";

export const metadata = getHomeMetadata("en");

export default function Page() {
  return (
    <main>
      <HomeIntro locale="en" />
      <Clock />
    </main>
  );
}
