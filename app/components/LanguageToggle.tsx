"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isEnglish = pathname.startsWith("/en");
  const [theme, setTheme] = useState<"light" | "dark" | "gray">("gray");

  // Detecta tema del body dinámicamente
  useEffect(() => {
    const detectTheme = () => {
      const bodyClass = document.body.className;
      if (bodyClass.includes("theme-light")) setTheme("light");
      else if (bodyClass.includes("theme-dark")) setTheme("dark");
      else setTheme("gray");
    };
    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = (lang: "en" | "es") => {
    const newPath = pathname.replace(/^\/(en|es)/, `/${lang}`);
    router.push(newPath);
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Botón principal del globo */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`
          p-2 rounded-full transition-all flex items-center justify-center
          ${theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-800 hover:bg-gray-700"}
        `}
        aria-label="Cambiar idioma"
      >
        <Globe
          className={`
            w-5 h-5 transition-colors
            ${theme === "light" ? "text-black" : "text-white"}
          `}
          strokeWidth={2}
        />
      </button>

      {/* Menú de selección de idioma */}
      {menuOpen && (
        <div
          className={`
            absolute right-0 mt-2 shadow-lg rounded-lg py-2 text-sm
            ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}
          `}
        >
          {!isEnglish ? (
            <button
              onClick={() => toggleLanguage("en")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
            >
              English
            </button>
          ) : (
            <button
              onClick={() => toggleLanguage("es")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
            >
              Español
            </button>
          )}
        </div>
      )}
    </div>
  );
}
