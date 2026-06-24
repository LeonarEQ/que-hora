import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("privacy", "nl");

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Privacybeleid</h1>
      <p>
        <strong>Laatste update:</strong> 10 november 2025
      </p>
      <p>
        Deze website verzamelt niet rechtstreeks persoonlijke gegevens van
        gebruikers. Google Analytics wordt anoniem gebruikt om verkeersstatistieken
        te verzamelen en de dienst te verbeteren.
      </p>
      <p>
        De verwerkingsverantwoordelijke is <strong>Sunvalis</strong>, bereikbaar
        via{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        .
      </p>
    </section>
  );
}
