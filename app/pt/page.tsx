import Clock from "../components/Clock";

export const metadata = {
  title: "Que horas são agora - que-hora.com",
  description:
    "Veja a hora atual e o clima na sua cidade. Rápido, preciso e atualizado a cada segundo.",
  alternates: {
    canonical: "https://que-hora.com/pt",
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
