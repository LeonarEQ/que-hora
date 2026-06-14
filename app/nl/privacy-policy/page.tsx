export const metadata = {
  title: "Privacybeleid - que-hora.com",
  description: "Privacybeleid van que-hora.com.",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/politica-privacidad",
      en: "https://que-hora.com/en/privacy-policy",
      zh: "https://que-hora.com/zh/privacy-policy",
      nl: "https://que-hora.com/nl/privacy-policy",
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Privacybeleid</h1>
      <p><strong>Laatst bijgewerkt:</strong> 10 november 2025</p>
      <p>
        que-hora.com gebruikt noodzakelijke technische informatie om de actuele tijd, locatiegerelateerde gegevens en het weer te tonen.
      </p>
      <p>
        Als je cookies accepteert, kan deze website Google Analytics gebruiken om bezoeken anoniem te analyseren en de dienst te verbeteren.
      </p>
      <p>
        Voor vragen over privacy kun je contact opnemen via <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a>.
      </p>
    </section>
  );
}
