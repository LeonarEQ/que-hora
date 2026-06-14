export const metadata = {
  title: "Juridische kennisgeving - que-hora.com",
  description: "Juridische kennisgeving en gebruiksvoorwaarden van que-hora.com.",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/aviso-legal",
      en: "https://que-hora.com/en/legal-notice",
      zh: "https://que-hora.com/zh/legal-notice",
      nl: "https://que-hora.com/nl/legal-notice",
    },
  },
};

export default function LegalNotice() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Juridische kennisgeving</h1>
      <p><strong>Laatst bijgewerkt:</strong> 10 november 2025</p>
      <p>
        De website <strong>https://que-hora.com</strong> is eigendom van <strong>Sunvalis</strong>.
        Je kunt contact opnemen via <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a>.
      </p>
      <p>
        Deze website toont de actuele tijd en weersinformatie op verschillende locaties ter wereld, uitsluitend voor informatieve doeleinden.
      </p>
      <p>
        Alle inhoud en het ontwerp van deze site zijn eigendom van Sunvalis. Reproductie zonder voorafgaande toestemming is verboden.
      </p>
      <p>
        Sunvalis is niet verantwoordelijk voor fouten, onderbrekingen of inhoud van derden waarnaar vanaf deze site wordt gelinkt.
      </p>
    </section>
  );
}
