export const metadata = {
  title: "Política de Cookies - que-hora.com",
  description:
    "Información sobre el uso de cookies en que-hora.com. Sunvalis utiliza Google Analytics para analizar el tráfico y mejorar la experiencia del usuario.",
  alternates: {
    languages: {
      en: "https://que-hora.com/en/cookies-policy",
    },
  },
};

export default function PoliticaCookies() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Política de Cookies</h1>
      <p><strong>Última actualización:</strong> 10 de noviembre de 2025</p>

      <p>
        En <strong>que-hora.com</strong> utilizamos cookies propias y de terceros (Google Analytics) 
        para analizar el tráfico y mejorar la experiencia de navegación del usuario.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web.
        Sirven para recordar preferencias, ofrecer funciones básicas o recopilar estadísticas de uso.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Tipos de cookies utilizadas</h2>
      <table className="w-full border-collapse border border-gray-300 my-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Tipo</th>
            <th className="border border-gray-300 p-2">Finalidad</th>
            <th className="border border-gray-300 p-2">Duración</th>
            <th className="border border-gray-300 p-2">Proveedor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Analítica</td>
            <td className="border border-gray-300 p-2">
              Mide el tráfico y comportamiento de los usuarios para mejorar el sitio.
            </td>
            <td className="border border-gray-300 p-2">Hasta 2 años</td>
            <td className="border border-gray-300 p-2">Google LLC</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Gestión del consentimiento</h2>
      <p>
        Al acceder por primera vez, se mostrará un banner que permite aceptar o rechazar las cookies.
        Puedes modificar tu decisión en cualquier momento desde el enlace en el pie de página (“Configuración de cookies”).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Cómo eliminar o bloquear cookies</h2>
      <p>
        Puedes eliminar las cookies configurando tu navegador:
        <ul className="list-disc pl-6 mt-2">
          <li><a className="text-blue-600" href="https://support.google.com/chrome/answer/95647">Chrome</a></li>
          <li><a className="text-blue-600" href="https://support.mozilla.org/es/kb/Borrar%20cookies">Firefox</a></li>
          <li><a className="text-blue-600" href="https://support.microsoft.com/es-es/help/4027947">Edge</a></li>
          <li><a className="text-blue-600" href="https://support.apple.com/es-es/guide/safari/sfri11471/mac">Safari</a></li>
        </ul>
      </p>
    </section>
  );
}
