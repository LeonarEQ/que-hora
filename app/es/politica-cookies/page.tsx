import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("cookies", "es");

export default function PoliticaCookies() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Política de Cookies</h1>
      <p>
        <strong>Última actualización:</strong> 10 de noviembre de 2025
      </p>
      <p>
        que-hora.com utiliza cookies técnicas necesarias para el funcionamiento
        del sitio y cookies analíticas anónimas para medir el uso del servicio.
      </p>
      <p>
        Puedes configurar o rechazar las cookies no esenciales desde el banner de
        cookies del sitio.
      </p>
    </section>
  );
}
