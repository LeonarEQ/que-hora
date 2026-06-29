"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { localeLabels } from "../seo";

const languages = [
  { code: "es", label: localeLabels.es },
  { code: "en", label: localeLabels.en },
  { code: "zh", label: localeLabels.zh },
  { code: "nl", label: localeLabels.nl },
  { code: "pt", label: localeLabels.pt },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

export function LanguageToggle() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark" | "gray">("gray");
  const currentLanguage =
    languages.find((language) => pathname.startsWith(`/${language.code}`))?.code ||
    "es";

  useEffect(() => {
    const detectTheme = () => {
      const bodyClass = document.body.className;
      if (bodyClass.includes("theme-light")) setTheme("light");
      else if (bodyClass.includes("theme-dark")) setTheme("dark");
      else setTheme("gray");
    };

    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!toggleRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const changeLanguage = (lang: LanguageCode) => {
    const newPath = pathname.match(/^\/(en|es|zh|nl|pt)(\/|$)/)
      ? pathname.replace(/^\/(en|es|zh|nl|pt)/, `/${lang}`)
      : `/${lang}`;

    router.push(newPath);
    setMenuOpen(false);
  };

  return (
    <div className="relative" ref={toggleRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`p-2 rounded-full transition-all flex items-center justify-center ${
          theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-800 hover:bg-gray-700"
        }`}
        aria-label="Cambiar idioma"
      >
        <Globe
          className={`w-5 h-5 transition-colors ${
            theme === "light" ? "text-black" : "text-white"
          }`}
          strokeWidth={2}
        />
      </button>

      {menuOpen && (
        <div
          className={`absolute right-0 mt-2 shadow-lg rounded-lg py-2 text-sm z-20 ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`block px-4 py-2 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white w-full text-left whitespace-nowrap ${
                currentLanguage === language.code ? "font-semibold" : ""
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
