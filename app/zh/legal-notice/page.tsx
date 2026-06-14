export const metadata = {
  title: "法律声明 - que-hora.com",
  description: "que-hora.com 的法律声明和使用条款。",
  alternates: {
    languages: {
      es: "https://que-hora.com/es/aviso-legal",
      en: "https://que-hora.com/en/legal-notice",
      zh: "https://que-hora.com/zh/legal-notice",
    },
  },
};

export default function LegalNotice() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 text-justify">
      <h1 className="text-3xl font-semibold mb-6">法律声明</h1>
      <p><strong>最后更新：</strong>2025 年 11 月 10 日</p>
      <p>
        网站 <strong>https://que-hora.com</strong> 由 <strong>Sunvalis</strong> 拥有。
        你可以通过 <a href="mailto:info@que-hora.com" className="text-blue-600">info@que-hora.com</a> 联系网站负责人。
      </p>
      <p>
        本网站用于提供当前时间和天气信息，仅供参考。
      </p>
      <p>
        本网站的设计和内容归 Sunvalis 所有。未经书面许可，不得复制或传播。
      </p>
      <p>
        Sunvalis 不对错误、中断或第三方链接内容承担责任。
      </p>
    </section>
  );
}
