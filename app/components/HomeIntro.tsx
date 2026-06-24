import { homeCopy, type Locale } from "../seo";

export function HomeIntro({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];

  return (
    <section className="sr-only">
      <h1>{copy.heading}</h1>
      <p>{copy.intro}</p>
    </section>
  );
}
