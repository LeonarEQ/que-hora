import Clock from "../components/Clock";

export const metadata = {
  title: "现在几点 - que-hora.com",
  description: "查看你所在城市的当前时间和天气。快速、准确，并每秒更新。",
  alternates: {
    canonical: "https://que-hora.com/zh",
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
