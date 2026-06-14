export const metadata = {
  title: "隐私政策 - que-hora.com",
  description: "que-hora.com 的隐私政策。",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/politica-privacidad",
      en: "https://que-hora.com/en/privacy-policy",
      zh: "https://que-hora.com/zh/privacy-policy",
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">隐私政策</h1>
      <p><strong>最后更新：</strong>2025 年 11 月 10 日</p>
      <p>
        que-hora.com 会使用必要的技术信息来显示当前时间、位置相关信息和天气数据。
      </p>
      <p>
        如果你接受 Cookie，本网站可能会使用 Google Analytics 以匿名方式分析访问量并改进服务。
      </p>
      <p>
        你可以通过 <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a> 联系我们，咨询隐私相关问题。
      </p>
    </section>
  );
}
