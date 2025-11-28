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

  const [location, setLocation] = useState<{
    city: string;
    country: string;
    timezone: string;
    lat: number;
    lon: number;
  } | null>(null);

  const [weather, setWeather] = useState<{
    temp: number;
    desc: string;
    icon: string;
  } | null>(null);

  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  /* MONTADO */
  useEffect(() => setMounted(true), []);

  /* RELOJ */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* TEMA */
  useEffect(() => {
    if (!mounted) return;
    document.body.classList.remove("theme-light", "theme-dark", "theme-gray");
    document.body.classList.add(`theme-${theme}`);
  }, [theme, mounted]);

  /* UBICACIÓN REAL */
  useEffect(() => {
    async function loadLocation() {
      try {
        const res = await fetch("/api/location");
        const data = await res.json();
        if (data.city) {
          setLocation({
            city: data.city,
            country: data.country,
            timezone: data.timezone,
            lat: data.lat,
            lon: data.lon,
          });
        }
      } catch (err) {
        console.error("Error cargando ubicación:", err);
      }
    }
    loadLocation();
  }, []);

  /* CLIMA REAL */
  useEffect(() => {
    if (!location) return;

    async function loadWeather() {
      try {
        const res = await fetch(`/api/weather?lat=${location!.lat}&lon=${location!.lon}`);
        const data = await res.json();

        if (data.temp) {
          setWeather({
            temp: data.temp,
            desc: data.desc,
            icon: data.icon,
          });
        }
      } catch (err) {
        console.error("Error cargando clima:", err);
      }
    }

    loadWeather();
  }, [location]);

  if (!mounted) return null;

  /* HORA */
  const timezone = location?.timezone || "Europe/Madrid";

  const rawTime = now.toLocaleTimeString(isEnglish ? "en-US" : "es-ES", {
    hour12: use12h,
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [timePart] = rawTime.split(" ");
  const [hours, minutes, seconds] = timePart.split(":");

  /* FECHA */
  const weekday = now.toLocaleDateString(isEnglish ? "en-US" : "es-ES", {
    weekday: "long",
    timeZone: timezone,
  });

  const dayMonth = now.toLocaleDateString(isEnglish ? "en-US" : "es-ES", {
    day: "2-digit",
    month: "long",
    timeZone: timezone,
  });
  const dayMonthFormatted = dayMonth.charAt(0).toUpperCase() + dayMonth.slice(1);

  const year = now.toLocaleDateString(isEnglish ? "en-US" : "es-ES", {
    year: "numeric",
    timeZone: timezone,
  });

  /* NÚMERO DE SEMANA */
  const weekNumber = Math.ceil(
    ((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000 +
      new Date(now.getFullYear(), 0, 1).getDay() +
      1) /
    7
  );
  const weekLabel = isEnglish ? "Week" : "Semana";

  /* CLIMA / TIEMPO */
  const spanishCountries = [
    "Spain", "España", "Argentina", "Bolivia", "Chile", "Colombia",
    "Costa Rica", "Cuba", "Ecuador", "El Salvador", "Guatemala",
    "Honduras", "México", "Nicaragua", "Panamá", "Paraguay",
    "Perú", "República Dominicana", "Uruguay", "Venezuela"
  ];

  const hourLabel = isEnglish ? "Time in" : "Hora en";
  let weatherLabel = isEnglish ? "Weather" : "Clima";

  if (!isEnglish && location) {
    if (location.country === "Spain" || location.country === "España") {
      weatherLabel = "Tiempo";
    } else if (spanishCountries.includes(location.country)) {
      weatherLabel = "Clima";
    }
  }

  /* ✅ TRADUCCIÓN DEL PAÍS */
  const countryDisplay =
    !isEnglish && location?.country === "Spain"
      ? "España"
      : location?.country || "";

  /* TEMAS */
  const themes = {
    light: "bg-gradient-to-b from-gray-100 to-white text-black",
    dark: "bg-gradient-to-b from-gray-900 to-black text-yellow-400",
    gray: "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100",
  };

  const baseBtn =
    "text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300";
  const activeBtn = "bg-white text-black dark:bg-gray-100 dark:text-gray-900 shadow-md";
  const inactiveBtn = "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-100 opacity-80 hover:opacity-100";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${themes[theme]}`}>
      {/* CABECERA */}
      <div className="absolute top-3 sm:top-6 left-0 right-0 flex justify-between items-center px-6 sm:px-10">
        <h1 className="text-lg sm:text-xl font-semibold lowercase cursor-pointer">
          <a href="/">que-hora.com</a>
        </h1>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex gap-3">
            {(["light", "dark", "gray"] as const).map((t) => {
              const isActive = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}
                >
                  {t === "light"
                    ? isEnglish ? "Light" : "Claro"
                    : t === "dark"
                      ? isEnglish ? "Dark" : "Oscuro"
                      : isEnglish ? "Gray" : "Gris"}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
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

        {/* Mobile */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-200/20"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* =========================== */}
      {/* 📱 RESPONSIVE (solo móvil) */}
      {/* =========================== */}
      <div className="sm:hidden w-full max-w-6xl px-6 grid grid-cols-2 gap-6 mt-20">
        {/* HORAS + MINUTOS */}
        <div className="flex flex-col items-start justify-center">
          <span className="text-[30vw] leading-none font-[Space_Mono]">{hours}</span>
          <span className="text-[30vw] leading-none font-[Space_Mono] mt-[-5vw]">{minutes}</span>
        </div>

        {/* CARD — TIME IN + SECONDS */}
        <div className="flex flex-col justify-center items-center bg-gray-100/10 dark:bg-white/5 
              p-6 rounded-2xl text-center backdrop-blur-sm">
          <span className="text-xl font-semibold opacity-90">{hourLabel}</span>
          <span className="text-2xl font-semibold opacity-90 mt-1">
            {location?.city || "…"}
          </span>
          <span className="text-lg opacity-70 mt-1 capitalize">
            {countryDisplay}
          </span>
          <span className="text-[20vw] font-[Space_Mono] opacity-70 leading-none mt-4">
            {seconds}
          </span>
        </div>

        {/* CARD — WEATHER */}
        <div className="bg-gray-100/10 dark:bg-white/5 p-6 rounded-2xl text-center 
              backdrop-blur-sm flex flex-col items-center">
          <span className="text-xl font-semibold opacity-90">{weatherLabel}</span>
          {weather ? (
            <>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.desc}
                className="w-16 h-16 mt-2"
              />
              <span className="text-3xl font-semibold mt-2">{weather.temp}°C</span>
              <span className="text-lg opacity-80 mt-1 capitalize">
                {weather.desc}
              </span>
            </>
          ) : (
            <span className="text-lg opacity-80 mt-2">
              {isEnglish ? "Loading…" : "Cargando…"}
            </span>
          )}
        </div>

        {/* CARD — DATE */}
        <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5
              rounded-2xl p-6 text-center backdrop-blur-sm">
          <span className="text-2xl font-semibold opacity-90 capitalize">
            {weekday}
          </span>
          <span className="text-lg opacity-80 mt-1 capitalize">
            {dayMonthFormatted}
          </span>
          <span className="text-lg opacity-70 mt-1">{year}</span>
          <span className="text-sm opacity-60 mt-2">
            {weekLabel} {weekNumber}
          </span>
        </div>
      </div>

      {/* =============================== */}
      {/* 🖥 DESKTOP VERSION */}
      {/* =============================== */}
      <div className="hidden sm:block w-full">
        <div className="flex items-baseline justify-center mt-20 leading-none text-center">
          <h1 className="text-[10rem] md:text-[16rem] lg:text-[20rem] font-[Space_Mono] leading-none">
            {hours}:{minutes}
          </h1>
          <span className="ml-4 text-6xl md:text-7xl lg:text-8xl opacity-70 font-[Space_Mono]">
            {seconds}
          </span>
        </div>

        <div className="mt-20 w-full flex justify-center border-t border-gray-400/30 dark:border-gray-100/20 pt-14">
          <div className="w-full max-w-6xl grid grid-cols-3 gap-8 px-6">
            {/* CARD — TIME IN */}
            <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 
                    rounded-2xl p-10 text-center backdrop-blur-sm">
              <span className="text-3xl font-semibold opacity-90">{hourLabel}</span>
              <span className="text-4xl opacity-90 mt-2">{location?.city || "…"}</span>
              <span className="text-xl opacity-70 mt-2">{countryDisplay}</span>
            </div>

            {/* CARD — WEATHER */}
            <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 
                    rounded-2xl p-10 text-center backdrop-blur-sm capitalize">
              <span className="text-3xl font-semibold opacity-90">{weatherLabel}</span>
              {weather ? (
                <>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.desc}
                    className="w-20 h-20 mt-4"
                  />
                  <span className="text-5xl font-semibold mt-4">{weather.temp}°C</span>
                  <span className="text-xl opacity-80 mt-2">{weather.desc}</span>
                </>
              ) : (
                <span className="text-xl opacity-80 mt-2">
                  {isEnglish ? "Loading…" : "Cargando…"}
                </span>
              )}
            </div>

            {/* CARD — DATE */}
            <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 
                    rounded-2xl p-10 text-center backdrop-blur-sm capitalize">
              <span className="text-5xl font-semibold opacity-90">{weekday}</span>
              <span className="text-3xl opacity-90 mt-2">{dayMonthFormatted}</span>
              <span className="text-3xl opacity-70 mt-2">{year}</span>
              <span className="text-xl opacity-70 mt-2">
                {weekLabel} {weekNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}