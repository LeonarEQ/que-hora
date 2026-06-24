import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("legal", "nl");

export default function LegalNotice() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Juridische kennisgeving</h1>
      <p>
        <strong>Laatste update:</strong> 10 november 2025
      </p>
      <p>
        De website <strong>https://que-hora.com</strong> is eigendom van{" "}
        <strong>Sunvalis</strong>. Contact is mogelijk via{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        .
      </p>
      <p>
        Deze website biedt actuele tijd- en weersinformatie voor informatieve
        doeleinden.
      </p>
      <p>
        Alle vormgeving en inhoud zijn eigendom van Sunvalis. Reproductie zonder
        schriftelijke toestemming is verboden.
      </p>
      <p>
        Sunvalis is niet verantwoordelijk voor fouten, onderbrekingen of inhoud
        van derden waarnaar vanaf deze site wordt gelinkt.
      </p>
    </section>
  );
}
