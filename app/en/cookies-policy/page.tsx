export const metadata = {
  title: "Cookies Policy - que-hora.com",
  description:
    "Information about the use of cookies on que-hora.com. Sunvalis uses Google Analytics to analyze traffic and improve user experience.",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/politica-cookies",
    },
  },
};

export default function CookiesPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Cookies Policy</h1>
      <p><strong>Last update:</strong> November 10, 2025</p>

      <p>
        At <strong>que-hora.com</strong>, we use first-party and third-party cookies (Google Analytics)
        to analyze traffic and enhance user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website.
        They help remember preferences, enable features, or collect usage statistics.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Types of cookies used</h2>
      <table className="w-full border border-gray-300 mt-6 text-left">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Purpose</th>
            <th className="border border-gray-300 px-4 py-2">Duration</th>
            <th className="border border-gray-300 px-4 py-2">Provider</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 dark:text-gray-100">
          <tr>
            <td className="border border-gray-300 px-4 py-2">Analytics</td>
            <td className="border border-gray-300 px-4 py-2">
              Measures traffic and user behavior to improve the site.
            </td>
            <td className="border border-gray-300 px-4 py-2">Up to 2 years</td>
            <td className="border border-gray-300 px-4 py-2">Google LLC</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Consent management</h2>
      <p>
        When you first visit the site, a banner will appear allowing you to accept or reject cookies.
        You can change your choice anytime from the footer link (“Cookies settings”).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">How to delete or block cookies</h2>
      <p>
        You can delete cookies from your browser settings:
        <ul className="list-disc pl-6 mt-2">
          <li><a className="text-blue-600" href="https://support.google.com/chrome/answer/95647">Chrome</a></li>
          <li><a className="text-blue-600" href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox">Firefox</a></li>
          <li><a className="text-blue-600" href="https://support.microsoft.com/en-us/help/4027947">Edge</a></li>
          <li><a className="text-blue-600" href="https://support.apple.com/en-us/guide/safari/sfri11471/mac">Safari</a></li>
        </ul>
      </p>
    </section>
  );
}
