import Clock from "../components/Clock";

export const metadata = {
  title: "Qué hora es ahora - que-hora.com",
  description: "Consulta la hora actual y el clima en tu ciudad con Sunvalis.",
  alternates: {
    languages: {
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
