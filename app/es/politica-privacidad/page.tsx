import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("privacy", "es");

export default function PoliticaPrivacidad() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Política de Privacidad</h1>
      <p>
        <strong>Última actualización:</strong> 10 de noviembre de 2025
      </p>
      <p>
        Este sitio no recoge datos personales directamente de los usuarios.
        Google Analytics se utiliza en modo anónimo para obtener estadísticas de
        tráfico y mejorar el servicio.
      </p>
      <p>
        El responsable del sitio es <strong>Sunvalis</strong>, contactable en{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        .
      </p>
    </section>
  );
}
