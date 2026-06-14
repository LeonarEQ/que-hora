import Clock from "../components/Clock";

export const metadata = {
  title: "Hoe laat is het nu - que-hora.com",
  description:
    "Bekijk de actuele tijd en het weer in je stad. Snel, nauwkeurig en elke seconde bijgewerkt.",
  alternates: {
    canonical: "https://que-hora.com/nl",
    languages: {
      es: "https://que-hora.com/es",
      en: "https://que-hora.com/en",
      zh: "https://que-hora.com/zh",
      nl: "https://que-hora.com/nl",
      pt: "https://que-hora.com/pt",
    },
  },
};

export default function Page() {
  return (
    <main>
      <Clock />
    </main>
  );
}
