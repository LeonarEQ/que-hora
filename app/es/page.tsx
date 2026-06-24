import Clock from "../components/Clock";
import { HomeIntro } from "../components/HomeIntro";
import { getHomeMetadata } from "../seo";

export const metadata = getHomeMetadata("es");

export default function Page() {
  return (
    <main>
      <HomeIntro locale="es" />
      <Clock />
    </main>
  );
}
