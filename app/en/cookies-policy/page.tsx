import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("cookies", "en");

export default function CookiesPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Cookies Policy</h1>
      <p>
        <strong>Last update:</strong> November 10, 2025
      </p>
      <p>
        que-hora.com uses technical cookies required for site operation and
        anonymous analytics cookies to measure service usage.
      </p>
      <p>
        You can configure or reject non-essential cookies from the cookie banner
        on the site.
      </p>
    </section>
  );
}
