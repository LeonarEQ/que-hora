import { getLegalMetadata } from "../../seo";

export const metadata = getLegalMetadata("cookies", "zh");

export default function CookiesPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">Cookie 政策</h1>
      <p>
        <strong>最后更新：</strong>2025 年 11 月 10 日
      </p>
      <p>
        que-hora.com 使用网站运行所必需的技术 Cookie，并使用匿名分析 Cookie 来衡量服务使用情况。
      </p>
      <p>你可以通过网站的 Cookie 横幅设置或拒绝非必要 Cookie。</p>
    </section>
  );
}
