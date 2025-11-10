"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { Menu, X } from "lucide-react";

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState<"light" | "dark" | "gray">("gray");
  const [use12h, setUse12h] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    body.classList.remove("theme-light", "theme-dark", "theme-gray");
    body.classList.add(`theme-${theme}`);
  }, [theme, mounted]);

  if (!mounted) return null;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeZoneOffset = -new Date().getTimezoneOffset() / 60;
  const utcOffset =
    (timeZoneOffset >= 0 ? "UTC+" : "UTC") + Math.abs(timeZoneOffset);

  const rawTime = now.toLocaleTimeString(isEnglish ? "en-US" : "es-ES", {
    hour12: use12h,
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [timePart] = rawTime.split(" ");
  const [hours, minutes, seconds] = timePart.split(":");

  const weekday = now.toLocaleDateString(isEnglish ? "en-US" : "es-ES", {
    weekday: "long",
    timeZone: timezone,
  });

  const dateWithoutDay = now.toLocaleDateString(isEnglish ? "en-US" : "es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: timezone,
  });

  const themes = {
    light: "bg-gradient-to-b from-gray-100 to-white text-black",
    dark: "bg-gradient-to-b from-gray-900 to-black text-yellow-400",
    gray: "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100",
  };

  const baseBtn =
    "text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 focus:outline-none";
  const activeBtn =
    "bg-white text-black dark:bg-gray-100 dark:text-gray-900 shadow-md";
  const inactiveBtn =
    "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-100 opacity-80 hover:opacity-100";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${themes[theme]}`}
    >
      {/* CABECERA */}
      <div className="absolute top-3 sm:top-6 left-0 right-0 flex justify-between items-center px-6 sm:px-10">
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight lowercase cursor-pointer">
          <a href="/">que-hora.com</a>
        </h1>

        {/* 🌐 Menú desktop */}
        <div className="hidden sm:flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          <div className="flex gap-2 sm:gap-3 mr-3 sm:mr-6">
            {(["light", "dark", "gray"] as const).map((t) => {
              const isActive = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}
                >
                  {t === "light"
                    ? isEnglish
                      ? "Light"
                      : "Claro"
                    : t === "dark"
                      ? isEnglish
                        ? "Dark"
                        : "Oscuro"
                      : isEnglish
                        ? "Gray"
                        : "Gris"}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 sm:gap-3 mr-3 sm:mr-6">
            {["12h", "24h"].map((mode) => {
              const isActive =
                (mode === "12h" && use12h) || (mode === "24h" && !use12h);
              return (
                <button
                  key={mode}
                  onClick={() => setUse12h(mode === "12h")}
                  className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}
                >
                  {mode}
                </button>
              );
            })}
          </div>

          <LanguageToggle />
        </div>

        {/* 🍔 Menú móvil */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-200/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🌙 Menú móvil */}
      {menuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-gray-900/95 dark:bg-gray-800/90 text-white flex flex-col items-center py-6 gap-4 z-50 border-t border-gray-700 shadow-lg sm:hidden animate-fade-in-down">
          <div className="flex flex-col items-center gap-4">
            {(["light", "dark", "gray"] as const).map((t) => {
              const isActive = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setMenuOpen(false);
                  }}
                  className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn
                    } w-40 text-center`}
                >
                  {t === "light"
                    ? isEnglish
                      ? "Light"
                      : "Claro"
                    : t === "dark"
                      ? isEnglish
                        ? "Dark"
                        : "Oscuro"
                      : isEnglish
                        ? "Gray"
                        : "Gris"}
                </button>
              );
            })}

            {["12h", "24h"].map((mode) => {
              const isActive =
                (mode === "12h" && use12h) || (mode === "24h" && !use12h);
              return (
                <button
                  key={mode}
                  onClick={() => {
                    setUse12h(mode === "12h");
                    setMenuOpen(false);
                  }}
                  className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn
                    } w-40 text-center`}
                >
                  {mode}
                </button>
              );
            })}

            <LanguageToggle />
          </div>
        </div>
      )}

      {/* HORA PRINCIPAL */}
      <div className="flex items-baseline justify-center mt-4 sm:mt-14 leading-none text-center">
        <h1 className="text-[22vw] sm:text-[10rem] md:text-[16rem] lg:text-[20rem] font-[Space_Mono] leading-none select-none tracking-tight">
          {hours}:{minutes}
        </h1>
        <span className="ml-2 text-[6vw] sm:text-4xl md:text-6xl lg:text-7xl opacity-70 font-[Space_Mono] select-none">
          {seconds}
        </span>
      </div>

      {/* BLOQUE INFERIOR */}
      <div className="mt-8 sm:mt-10 w-full flex justify-center border-t border-gray-400/30 dark:border-gray-100/20 pt-10 sm:pt-14">
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold opacity-90">
              {isEnglish ? "Time Zone" : "Zona horaria"}
            </span>
            <span className="text-lg sm:text-xl md:text-2xl opacity-90 mt-2">
              {timezone}
            </span>
            <span className="text-sm sm:text-base opacity-70">{utcOffset}</span>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm capitalize">
            <span className="text-3xl sm:text-5xl md:text-6xl font-semibold opacity-90">
              {weekday}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm capitalize">
            <span className="text-3xl sm:text-5xl md:text-6xl font-semibold opacity-90">
              {dateWithoutDay}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
