"use client";
import { useState, useEffect, useRef } from "react";

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState<"light" | "dark" | "gray">("gray");
  const [use12h, setUse12h] = useState(false);
  const [city, setCity] = useState<string>("Vigo");
  const [country, setCountry] = useState<string>("España");
  const [weather, setWeather] = useState({
    temp: 15,
    wind: 6,
    desc: "Lluvia de gran intensidad",
    icon: "10n",
  });
  const [showControls, setShowControls] = useState(true);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const API_KEY =
    process.env.NEXT_PUBLIC_WEATHER_API_KEY ||
    "378dcc9ea2ed3f9940b88d1bed67e558";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

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
            desc: data.weather[0].description.toLowerCase(),
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
        const countryName =
          data.country_name === "Spain" ? "España" : data.country_name || "";
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
  const [timePart] = rawTime.split(" ");
  const [hours, minutes, seconds] = timePart.split(":");

  const date = now
    .toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: timezone,
    })
    .replaceAll(" de", "");

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
      onMouseMove={handleMouseMove}
    >
      {/* CABECERA */}
      <div
        className={`absolute top-3 sm:top-6 left-0 right-0 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between px-6 sm:px-10 items-center transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight lowercase">
          que-hora.com
        </h1>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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

      {/* HORA PRINCIPAL — DOS LÍNEAS GIGANTES */}
      <div className="flex flex-col items-center justify-center mt-16 sm:mt-20 leading-none">
        <h1
          className="text-[35vw] sm:text-[20rem] md:text-[26rem] lg:text-[30rem] font-[Space_Mono] font-bold tracking-tight select-none leading-[0.9]"
          style={{
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum"',
          }}
        >
          {hours}
        </h1>
        <div className="relative flex items-end justify-center -mt-[4vw] sm:-mt-10">
          <h1
            className="text-[35vw] sm:text-[20rem] md:text-[26rem] lg:text-[30rem] font-[Space_Mono] font-bold tracking-tight select-none leading-[0.9]"
            style={{
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum"',
            }}
          >
            {minutes}
          </h1>
          <span className="absolute right-[-10vw] sm:right-[-6rem] text-[8vw] sm:text-[4rem] font-light opacity-60 translate-y-8">
            {seconds}
          </span>
        </div>
      </div>

      {/* BLOQUE INFERIOR */}
      <div className="mt-14 sm:mt-20 w-full flex justify-center border-t border-gray-400/30 dark:border-gray-100/20 pt-10 sm:pt-14">
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6">
          {/* CARD CLIMA */}
          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.desc}
              className="w-16 h-16 sm:w-20 sm:h-20 mb-3"
            />
            <span className="text-4xl sm:text-5xl md:text-6xl font-semibold">
              {weather.temp}°C
            </span>
            <span className="text-lg sm:text-xl md:text-2xl mt-1 opacity-90 whitespace-nowrap">
              {weather.desc} · {weather.wind} km/h
            </span>
          </div>

          {/* CARD FECHA */}
          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium opacity-90 capitalize">
              {date}
            </span>
          </div>

          {/* CARD CIUDAD */}
          <div className="flex flex-col items-center justify-center bg-gray-100/10 dark:bg-white/5 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold capitalize">
              {city}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl opacity-80">
              {country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
