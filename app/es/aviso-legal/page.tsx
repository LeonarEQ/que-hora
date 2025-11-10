export const metadata = {
  title: "Aviso Legal - que-hora.com",
  description: "Aviso legal y condiciones de uso del sitio que-hora.com operado por Sunvalis.",
  alternates: {
    languages: {
      en: "https://que-hora.com/en/legal-notice",
    },
  },
};

export default function AvisoLegal() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Aviso Legal</h1>
      <p><strong>Última actualización:</strong> 10 de noviembre de 2025</p>
      <p>
        El sitio web <strong>https://que-hora.com</strong> es propiedad de <strong>Sunvalis</strong>.
        Puede contactar al responsable mediante el correo <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a>.
      </p>
      <p>
        El propósito de este sitio es mostrar la hora actual y el clima en diferentes ubicaciones del mundo, con fines exclusivamente informativos.
      </p>
      <p>
        Todo el contenido y diseño del sitio es propiedad de Sunvalis. Queda prohibida su reproducción total o parcial sin autorización previa.
      </p>
      <p>
        Sunvalis no se hace responsable de errores, interrupciones o contenido de terceros enlazado desde este sitio.
      </p>
    </section>
  );
}
