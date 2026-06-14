export const metadata = {
  title: "Aviso Legal - que-hora.com",
  description: "Aviso legal e condições de utilização de que-hora.com.",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/aviso-legal",
      en: "https://que-hora.com/en/legal-notice",
      zh: "https://que-hora.com/zh/legal-notice",
      nl: "https://que-hora.com/nl/legal-notice",
      pt: "https://que-hora.com/pt/legal-notice",
    },
  },
};

export default function LegalNotice() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Aviso Legal</h1>
      <p><strong>Última atualização:</strong> 10 de novembro de 2025</p>
      <p>
        O site <strong>https://que-hora.com</strong> pertence à <strong>Sunvalis</strong>.
        Pode contactar o responsável através de <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a>.
      </p>
      <p>
        Este site apresenta a hora atual e informações meteorológicas em diferentes locais do mundo, apenas para fins informativos.
      </p>
      <p>
        Todo o conteúdo e design do site pertencem à Sunvalis. É proibida a sua reprodução sem autorização prévia.
      </p>
      <p>
        A Sunvalis não se responsabiliza por erros, interrupções ou conteúdos de terceiros ligados a partir deste site.
      </p>
    </section>
  );
}
