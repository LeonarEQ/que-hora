"use client";
import { useState, useEffect, useRef } from "react";

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState<"light" | "dark" | "gray">("gray");
  const [use12h, setUse12h] = useState(false);
  const [city, setCity] = useState<string>("Vigo");
  const [country, setCountry] = useState<string>("España");
  const [weather, setWeather] = useState<any>({
    temp: 15,
    wind: 6,
    desc: "Lluvia de gran intensidad",
    icon: "10n",
  });
  const [showControls, setShowControls] = useState(true);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const API_KEY = "378dcc9ea2ed3f9940b88d1bed67e558";

  useEffect(() => setMounted(true), []);

  // Actualiza la hora cada segundo
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Oculta los botones tras 3s sin mover el mouse
  const handleMouseMove = () => {
    setShowControls(true);
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    inactivityTimer.current = setTimeout(() => setShowControls(false), 3000);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Obtener ubicación y clima
  useEffect(() => {
    const getWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
        );
        const data = await res.json();
        if (data && data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            wind: Math.round(data.wind.speed),
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
          });
          if (data.name) setCity(data.name);
          if (data.sys?.country === "ES") setCountry("España");
          else if (data.sys?.country) setCountry(data.sys.country);
        }
      } catch (err) {
        console.error("Error al obtener el clima:", err);
      }
    };

    const getLocation = async () => {
      if (window.location.hostname === "localhost") {
        // Modo local → datos falsos (evita CORS)
        setCity("Vigo");
        setCountry("España");
        setWeather({
          temp: 21,
          wind: 12,
          desc: "Poco nublado",
          icon: "02d",
        });
        return;
      }

      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const lat = data.latitude;
        const lon = data.longitude;
        const countryName = data.country_name === "Spain" ? "España" : data.country_name || "";
        if (data.city) setCity(data.city);
        if (countryName) setCountry(countryName);
        if (lat && lon) await getWeather(lat, lon);
      } catch (err) {
        console.error("No se pudo obtener ubicación:", err);
      }
    };

    getLocation();
  }, []);

  if (!mounted) return null;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const rawTime = now.toLocaleTimeString("en-US", {
    hour12: use12h,
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [cleanTime, meridiem] = use12h ? rawTime.split(" ") : [rawTime, ""];

  const date = now
    .toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: timezone,
    })
    .replaceAll(" de", "");

  const themes = {
    light: "bg-[#f5f5f5] text-black",
    dark: "bg-black text-yellow-400",
    gray: "bg-gray-900 text-gray-100",
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
      onMouseMove={handleMouseMove}
    >
      {/* CABECERA SUPERIOR */}
      <div
        className={`absolute top-5 left-0 right-0 flex justify-between px-10 items-center transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h1 className="text-xl font-semibold tracking-tight lowercase">
          que-hora.com
        </h1>

        <div className="flex gap-3">
          {(["light", "dark", "gray"] as const).map((t) => {
            const isActive = theme === t;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}
              >
                {t === "light" ? "Claro" : t === "dark" ? "Oscuro" : "Gris"}
              </button>
            );
          })}

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
      </div>

      {/* HORA PRINCIPAL */}
      <div className="flex items-baseline justify-center mt-10">
        <h1
          className="text-[9rem] md:text-[14rem] font-[Space_Mono] leading-none select-none"
          style={{
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum"',
          }}
        >
          {cleanTime}
        </h1>
        {use12h && (
          <span className="ml-4 text-3xl md:text-4xl opacity-70 font-[Space_Mono] select-none">
            {meridiem}
          </span>
        )}
      </div>

      {/* BLOQUE INFERIOR */}
      <div className="mt-12 w-full flex justify-center border-t border-gray-400/30 dark:border-gray-100/20 pt-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {/* CARD Clima */}
          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 text-center backdrop-blur-sm">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.desc}
              className="w-16 h-16 mb-2"
            />
            <span className="text-2xl md:text-3xl font-semibold">
              {weather.temp}°C
            </span>
            <span className="text-lg md:text-xl mt-1 opacity-90 whitespace-nowrap">
              {weather.desc} · {weather.wind} km/h
            </span>
          </div>

          {/* CARD Fecha */}
          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 text-center backdrop-blur-sm">
            <span className="text-lg md:text-xl font-medium opacity-90 capitalize">
              {date}
            </span>
          </div>

          {/* CARD Ciudad */}
          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 text-center backdrop-blur-sm">
            <span className="text-2xl md:text-3xl font-semibold capitalize">
              {city}
            </span>
            <span className="text-lg md:text-xl opacity-80">{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
