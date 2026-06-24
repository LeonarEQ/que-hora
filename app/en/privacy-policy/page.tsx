import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("privacy", "en");

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
      <p>
        <strong>Last update:</strong> November 10, 2025
      </p>
      <p>
        This website does not collect personal data directly from users. Google
        Analytics is used in anonymous mode to gather traffic statistics and
        improve the service.
      </p>
      <p>
        The data controller is <strong>Sunvalis</strong>, contactable at{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        .
      </p>
    </section>
  );
}
