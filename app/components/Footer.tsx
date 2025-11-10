"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const homePath = isEnglish ? "/en" : "/es";

  // Estado para el color del texto
  const [textColor, setTextColor] = useState("text-white");

  // Detectar cambios de tema global
  useEffect(() => {
    const updateTheme = () => {
      const body = document.body;
      if (body.classList.contains("theme-light")) {
        setTextColor("text-black");
      } else {
        setTextColor("text-white");
      }
    };

    updateTheme(); // Inicial
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`w-full bg-transparent ${textColor} text-sm py-8 mt-0 transition-colors duration-500`}
    >
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-center sm:text-left font-semibold tracking-wide drop-shadow">
          © {new Date().getFullYear()}{" "}
          <Link
            href={homePath}
            className="hover:underline hover:text-blue-400 transition-all"
          >
            que-hora.com
          </Link>
        </p>

        <div className="flex flex-wrap justify-center gap-4 font-medium">
          {isEnglish ? (
            <>
              <Link
                href="/en/legal-notice"
                className="hover:text-blue-400 transition-colors"
              >
                Legal Notice
              </Link>
              <Link
                href="/en/privacy-policy"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/en/cookies-policy"
                className="hover:text-blue-400 transition-colors"
              >
                Cookies Policy
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/es/aviso-legal"
                className="hover:text-blue-400 transition-colors"
              >
                Aviso Legal
              </Link>
              <Link
                href="/es/politica-privacidad"
                className="hover:text-blue-400 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/es/politica-cookies"
                className="hover:text-blue-400 transition-colors"
              >
                Cookies
              </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
