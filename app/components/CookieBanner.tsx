"use client";
import { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Si no hay consentimiento previo, mostramos el banner
      setVisible(true);
    } else if (consent === "accepted") {
      // Si ya aceptó antes, cargamos Google Analytics directamente
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

  const loadAnalytics = () => {
    if (typeof window === "undefined") return;
    if ((window as any).gtag) return; // Evita cargar GA dos veces

    // Cargar el script de Google Analytics 4
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-QL5JYXYJ8D";
    script.async = true;
    document.head.appendChild(script);

    // Inicializar GA4
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag("js", new Date());
    gtag("config", "G-QL5JYXYJ8D", { anonymize_ip: true });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-sm py-4 px-6 flex flex-col sm:flex-row justify-center items-center gap-3 z-50 shadow-lg">
      <p className="text-center sm:text-left">
        Este sitio utiliza cookies para mejorar la experiencia y analizar el tráfico.{" "}
        <a href="/es/politica-cookies" className="text-blue-400 underline">
          Más información
        </a>
      </p>
      <div className="flex gap-3">
        <button
          onClick={acceptCookies}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white transition"
        >
          Aceptar
        </button>
        <button
          onClick={rejectCookies}
          className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded text-white transition"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
