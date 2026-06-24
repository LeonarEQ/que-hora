import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("legal", "pt");

export default function LegalNotice() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Aviso Legal</h1>
      <p>
        <strong>Última atualização:</strong> 10 de novembro de 2025
      </p>
      <p>
        O site <strong>https://que-hora.com</strong> pertence à{" "}
        <strong>Sunvalis</strong>. Pode contactar o responsável através de{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        .
      </p>
      <p>
        Este site fornece informações de hora atual e meteorologia para fins
        informativos.
      </p>
      <p>
        Todo o design e conteúdo são propriedade da Sunvalis. A reprodução sem
        autorização escrita é proibida.
      </p>
      <p>
        A Sunvalis não se responsabiliza por erros, interrupções ou conteúdo de
        terceiros ligado a partir deste site.
      </p>
    </section>
  );
}
