import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("legal", "en");

export default function LegalNotice() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Legal Notice</h1>
      <p>
        <strong>Last update:</strong> November 10, 2025
      </p>
      <p>
        The website <strong>https://que-hora.com</strong> is owned by{" "}
        <strong>Sunvalis</strong>. You can contact the site owner at{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        .
      </p>
      <p>
        This website provides current time and weather information for
        informational purposes only.
      </p>
      <p>
        All site design and content are property of Sunvalis. Reproduction
        without written consent is prohibited.
      </p>
      <p>
        Sunvalis is not responsible for errors, interruptions, or third-party
        content linked from this site.
      </p>
    </section>
  );
}
