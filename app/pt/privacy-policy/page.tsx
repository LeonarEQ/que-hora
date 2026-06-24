import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("privacy", "pt");

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Política de Privacidade</h1>
      <p>
        <strong>Última atualização:</strong> 10 de novembro de 2025
      </p>
      <p>
        Este site não recolhe dados pessoais diretamente dos utilizadores. O
        Google Analytics é utilizado em modo anónimo para obter estatísticas de
        tráfego e melhorar o serviço.
      </p>
      <p>
        O responsável pelo tratamento é <strong>Sunvalis</strong>, contactável
        através de{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        .
      </p>
    </section>
  );
}
