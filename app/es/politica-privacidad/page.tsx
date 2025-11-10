export const metadata = {
  title: "Política de Privacidad - que-hora.com",
  description: "Consulta cómo Sunvalis gestiona los datos y la información del usuario en que-hora.com.",
  alternates: {
    languages: {
      en: "https://que-hora.com/en/privacy-policy",
    },
  },
};

export default function PoliticaPrivacidad() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Política de Privacidad</h1>
      <p><strong>Última actualización:</strong> 10 de noviembre de 2025</p>
      <p>
        Este sitio web no recopila datos personales de los usuarios. 
        Se utiliza Google Analytics de manera anónima para conocer estadísticas de tráfico y mejorar el servicio.
      </p>
      <p>
        El responsable del tratamiento es <strong>Sunvalis</strong>, contactable en <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a>.
      </p>
    </section>
  );
}
