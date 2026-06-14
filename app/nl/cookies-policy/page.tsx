export const metadata = {
  title: "Cookiebeleid - que-hora.com",
  description: "Cookiebeleid van que-hora.com.",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/politica-cookies",
      en: "https://que-hora.com/en/cookies-policy",
      zh: "https://que-hora.com/zh/cookies-policy",
      nl: "https://que-hora.com/nl/cookies-policy",
    },
  },
};

export default function CookiesPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Cookiebeleid</h1>
      <p><strong>Laatst bijgewerkt:</strong> 10 november 2025</p>
      <p>
        Deze website gebruikt noodzakelijke cookies om voorkeuren op te slaan, zoals je keuze voor analytische cookies.
      </p>
      <p>
        Als je toestemming geeft, laden we Google Analytics om het gebruik van de website te begrijpen en de ervaring te verbeteren.
      </p>
      <p>
        Je kunt cookies verwijderen of blokkeren via de instellingen van je browser.
      </p>
    </section>
  );
}
