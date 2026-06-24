import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("cookies", "pt");

export default function CookiesPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Política de Cookies</h1>
      <p>
        <strong>Última atualização:</strong> 10 de novembro de 2025
      </p>
      <p>
        que-hora.com utiliza cookies técnicas necessárias ao funcionamento do
        site e cookies analíticas anónimas para medir a utilização do serviço.
      </p>
      <p>
        Pode configurar ou rejeitar cookies não essenciais a partir do banner de
        cookies do site.
      </p>
    </section>
  );
}
