"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const isEnglish = pathname.startsWith("/en");
  const isDutch = pathname.startsWith("/nl");
  const isPortuguese = pathname.startsWith("/pt");
  const copy = isPortuguese
    ? {
        text: "Este site utiliza cookies para melhorar a experiência e analisar o tráfego.",
        more: "Mais informações",
        accept: "Aceitar",
        reject: "Rejeitar",
        href: "/pt/cookies-policy",
      }
    : isDutch
    ? {
        text: "Deze site gebruikt cookies om de ervaring te verbeteren en verkeer te analyseren.",
        more: "Meer informatie",
        accept: "Accepteren",
        reject: "Weigeren",
        href: "/nl/cookies-policy",
      }
    : isChinese
    ? {
        text: "本网站使用 Cookie 来改善体验并分析访问量。",
        more: "了解更多",
        accept: "接受",
        reject: "拒绝",
        href: "/zh/cookies-policy",
      }
    : isEnglish
      ? {
          text: "This site uses cookies to improve the experience and analyze traffic.",
          more: "More information",
          accept: "Accept",
          reject: "Reject",
          href: "/en/cookies-policy",
        }
      : {
          text: "Este sitio utiliza cookies para mejorar la experiencia y analizar el tráfico.",
          more: "Más información",
          accept: "Aceptar",
          reject: "Rechazar",
          href: "/es/politica-cookies",
        };

  function loadAnalytics() {
    if (typeof window === "undefined") return;
    const analyticsWindow = window as AnalyticsWindow;
    if (analyticsWindow.gtag) return;

    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-QL5JYXYJ8D";
    script.async = true;
    document.head.appendChild(script);

    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    function gtag(...args: unknown[]) {
      analyticsWindow.dataLayer?.push(args);
    }
    analyticsWindow.gtag = gtag;

    gtag("js", new Date());
    gtag("config", "G-QL5JYXYJ8D", { anonymize_ip: true });
  }

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    } else if (consent === "accepted") {
      loadAnalytics();
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    loadAnalytics();
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-sm py-4 px-6 flex flex-col sm:flex-row justify-center items-center gap-3 z-50 shadow-lg">
      <p className="text-center sm:text-left">
        {copy.text}{" "}
        <a href={copy.href} className="text-blue-400 underline">
          {copy.more}
        </a>
      </p>
      <div className="flex gap-3">
        <button
          onClick={acceptCookies}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white transition"
        >
          {copy.accept}
        </button>
        <button
          onClick={rejectCookies}
          className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded text-white transition"
        >
          {copy.reject}
        </button>
      </div>
    </div>
  );
}
