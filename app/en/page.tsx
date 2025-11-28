import Clock from "../components/Clock";

export const metadata = {
  title: "Current time now - que-hora.com",
  description:
    "Check the current time and weather in your city with Sunvalis. Accurate, fast and updated every second.",
  alternates: {
    canonical: "https://que-hora.com/en",
    languages: {
      es: "https://que-hora.com/es",
      en: "https://que-hora.com/en",
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