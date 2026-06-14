export const metadata = {
  title: "Política de Privacidade - que-hora.com",
  description: "Política de privacidade de que-hora.com.",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/politica-privacidad",
      en: "https://que-hora.com/en/privacy-policy",
      zh: "https://que-hora.com/zh/privacy-policy",
      nl: "https://que-hora.com/nl/privacy-policy",
      pt: "https://que-hora.com/pt/privacy-policy",
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Política de Privacidade</h1>
      <p><strong>Última atualização:</strong> 10 de novembro de 2025</p>
      <p>
        O que-hora.com utiliza informação técnica necessária para mostrar a hora atual, dados relacionados com a localização e o clima.
      </p>
      <p>
        Se aceitar cookies, este site pode utilizar Google Analytics para analisar visitas de forma anónima e melhorar o serviço.
      </p>
      <p>
        Para questões de privacidade, contacte-nos através de <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a>.
      </p>
    </section>
  );
}
