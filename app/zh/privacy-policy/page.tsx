import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("privacy", "zh");

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">隐私政策</h1>
      <p>
        <strong>最后更新：</strong>2025 年 11 月 10 日
      </p>
      <p>
        本网站不会直接收集用户个人数据。Google Analytics 以匿名模式用于统计访问量并改进服务。
      </p>
      <p>
        数据负责人为 <strong>Sunvalis</strong>，联系方式为{" "}
        <a href="mailto:info@que-hora.com" className="text-blue-600">
          info@que-hora.com
        </a>
        。
      </p>
    </section>
  );
}
