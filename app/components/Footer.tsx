"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const footerLinks = {
  es: [
    { href: "/es/aviso-legal", label: "Aviso Legal" },
    { href: "/es/politica-privacidad", label: "Privacidad" },
    { href: "/es/politica-cookies", label: "Cookies" },
  ],
  en: [
    { href: "/en/legal-notice", label: "Legal Notice" },
    { href: "/en/privacy-policy", label: "Privacy Policy" },
    { href: "/en/cookies-policy", label: "Cookies Policy" },
  ],
  zh: [
    { href: "/zh/legal-notice", label: "法律声明" },
    { href: "/zh/privacy-policy", label: "隐私政策" },
    { href: "/zh/cookies-policy", label: "Cookie 政策" },
  ],
  nl: [
    { href: "/nl/legal-notice", label: "Juridische kennisgeving" },
    { href: "/nl/privacy-policy", label: "Privacybeleid" },
    { href: "/nl/cookies-policy", label: "Cookiebeleid" },
  ],
  pt: [
    { href: "/pt/legal-notice", label: "Aviso Legal" },
    { href: "/pt/privacy-policy", label: "Privacidade" },
    { href: "/pt/cookies-policy", label: "Cookies" },
  ],
} as const;

type FooterLocale = keyof typeof footerLinks;

function getFooterLocale(pathname: string): FooterLocale {
  const segment = pathname.split("/")[1] as FooterLocale;
  return segment in footerLinks ? segment : "es";
}

export function Footer() {
  const pathname = usePathname();
  const locale = getFooterLocale(pathname);
  const [textColor, setTextColor] = useState("text-white");

  useEffect(() => {
    const updateTheme = () => {
      setTextColor(
        document.body.classList.contains("theme-light") ? "text-black" : "text-white",
      );
    };

    updateTheme();
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
            href={`/${locale}`}
            className="hover:underline hover:text-blue-400 transition-all"
          >
            que-hora.com
          </Link>
        </p>

        <div className="flex flex-wrap justify-center gap-4 font-medium">
          {footerLinks[locale].map((link) => (
            <Link
              href={link.href}
              className="hover:text-blue-400 transition-colors"
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
