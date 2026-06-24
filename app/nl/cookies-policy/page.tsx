import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("cookies", "nl");

export default function CookiesPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Cookiebeleid</h1>
      <p>
        <strong>Laatste update:</strong> 10 november 2025
      </p>
      <p>
        que-hora.com gebruikt technische cookies die nodig zijn voor de werking
        van de site en anonieme analytische cookies om het gebruik van de dienst
        te meten.
      </p>
      <p>
        Je kunt niet-essentiële cookies instellen of weigeren via de cookiebanner
        op de site.
      </p>
    </section>
  );
}
