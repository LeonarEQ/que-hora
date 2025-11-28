import Clock from "../components/Clock";

export const metadata = {
  title: "Qué hora es ahora - que-hora.com",
  description: "Consulta la hora actual y el clima en tu ciudad con Sunvalis.",
  alternates: {
    canonical: "https://que-hora.com/es",
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