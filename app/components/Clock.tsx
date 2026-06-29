"use client";
import { useCallback, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./LanguageToggle";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Timer,
} from "lucide-react";
import Link from "next/link";

const LOCATION_UPDATE_HIDDEN_UNTIL_KEY = "locationUpdateHiddenUntil";
const LOCATION_UPDATE_HIDE_DAYS = 7;
const LOCATION_UPDATE_HIDE_MS = LOCATION_UPDATE_HIDE_DAYS * 24 * 60 * 60 * 1000;

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState<"light" | "dark" | "gray">("gray");
  const [use12h, setUse12h] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [stopwatchOpen, setStopwatchOpen] = useState(false);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [stopwatchElapsed, setStopwatchElapsed] = useState(0);
  const [stopwatchMode, setStopwatchMode] = useState<"up" | "down">("up");
  const [stopwatchDuration, setStopwatchDuration] = useState(0);
  const stopwatchElapsedRef = useRef(0);
  const stopwatchDurationRef = useRef(0);
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [location, setLocation] = useState<{
    city: string;
    country: string;
    timezone: string;
    lat: number;
    lon: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationUpdateHidden, setLocationUpdateHidden] = useState(false);

  const [weather, setWeather] = useState<{
    temp: number;
    desc: string;
    icon: string;
  } | null>(null);

  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const isChinese = pathname.startsWith("/zh");
  const isDutch = pathname.startsWith("/nl");
  const isPortuguese = pathname.startsWith("/pt");
  const locale = isPortuguese
    ? "pt-PT"
    : isDutch
    ? "nl-NL"
    : isChinese
      ? "zh-CN"
      : isEnglish
        ? "en-US"
        : "es-ES";

  /* MONTADO */
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const hiddenUntil = Number(
      localStorage.getItem(LOCATION_UPDATE_HIDDEN_UNTIL_KEY),
    );

    if (hiddenUntil > Date.now()) {
      setLocationUpdateHidden(true);
      return;
    }

    localStorage.removeItem(LOCATION_UPDATE_HIDDEN_UNTIL_KEY);
    setLocationUpdateHidden(false);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setCalendarOpen(localStorage.getItem("calendarOpen") === "true");
      setStopwatchOpen(localStorage.getItem("stopwatchOpen") === "true");
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  /* RELOJ */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* CRONOMETRO */
  useEffect(() => {
    stopwatchElapsedRef.current = stopwatchElapsed;
  }, [stopwatchElapsed]);

  useEffect(() => {
    stopwatchDurationRef.current = stopwatchDuration;
  }, [stopwatchDuration]);

  useEffect(() => {
    if (!stopwatchRunning) return;

    const startedAt =
      stopwatchMode === "down"
        ? Date.now() - (stopwatchDurationRef.current - stopwatchElapsedRef.current)
        : Date.now() - stopwatchElapsedRef.current;
    const t = setInterval(() => {
      if (stopwatchMode === "down") {
        const nextRemaining = Math.max(
          stopwatchDurationRef.current - (Date.now() - startedAt),
          0,
        );
        setStopwatchElapsed(nextRemaining);

        if (nextRemaining === 0) {
          setStopwatchRunning(false);
        }
        return;
      }

      setStopwatchElapsed(Date.now() - startedAt);
    }, 50);

    return () => clearInterval(t);
  }, [stopwatchMode, stopwatchRunning]);

  /* TEMA */
  useEffect(() => {
    if (!mounted) return;
    document.body.classList.remove("theme-light", "theme-dark", "theme-gray");
    document.body.classList.add(`theme-${theme}`);
  }, [theme, mounted]);

  const loadLocation = useCallback(async () => {
    setLocationLoading(true);
    try {
      const res = await fetch("/api/location", { cache: "no-store" });
      const data = await res.json();
      if (data.city) {
        setLocation({
          city: data.city,
          country: data.country,
          timezone: data.timezone,
          lat: data.lat,
          lon: data.lon,
        });
        setWeather(null);
      }
    } catch (err) {
      console.error("Error cargando ubicación:", err);
    } finally {
      setLocationLoading(false);
    }
  }, []);

  /* UBICACIÓN REAL */
  useEffect(() => {
    loadLocation();
  }, [loadLocation]);

  /* CLIMA REAL */
  useEffect(() => {
    if (!location) return;

    async function loadWeather() {
      try {
        const res = await fetch(
          `/api/weather?lat=${location!.lat}&lon=${location!.lon}`,
        );
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

  const rawTime = now.toLocaleTimeString(locale, {
    hour12: use12h,
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [timePart] = rawTime.split(" ");
  const [hours, minutes, seconds] = timePart.split(":");

  /* FECHA */
  const weekday = now.toLocaleDateString(locale, {
    weekday: "long",
    timeZone: timezone,
  });

  const dayMonth = now.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    timeZone: timezone,
  });
  const dayMonthFormatted =
    dayMonth.charAt(0).toUpperCase() + dayMonth.slice(1);

  const year = now.toLocaleDateString(locale, {
    year: "numeric",
    timeZone: timezone,
  });

  /* NÚMERO DE SEMANA */
  const weekNumber = Math.ceil(
    ((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000 +
      new Date(now.getFullYear(), 0, 1).getDay() +
      1) /
      7,
  );
  const weekLabel = isChinese
    ? "第"
    : isPortuguese
      ? "Semana"
    : isDutch
      ? "Week"
      : isEnglish
        ? "Week"
        : "Semana";

  /* CLIMA / TIEMPO */
  const spanishCountries = [
    "Spain",
    "España",
    "Argentina",
    "Bolivia",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "Guatemala",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
  ];

  const hourLabel = isChinese
    ? "当地时间"
    : isPortuguese
      ? "Hora em"
    : isDutch
      ? "Tijd in"
      : isEnglish
        ? "Time in"
        : "Hora en";
  let weatherLabel = isChinese
    ? "天气"
    : isPortuguese
      ? "Clima"
    : isDutch
      ? "Weer"
      : isEnglish
        ? "Weather"
        : "Clima";

  if (!isEnglish && !isChinese && !isDutch && !isPortuguese && location) {
    if (location.country === "Spain" || location.country === "España") {
      weatherLabel = "Tiempo";
    } else if (spanishCountries.includes(location.country)) {
      weatherLabel = "Clima";
    }
  }

  /* ✅ TRADUCCIÓN DEL PAÍS */
  const countryDisplay =
    !isEnglish && !isChinese && !isDutch && !isPortuguese && location?.country === "Spain"
      ? "España"
      : isChinese && location?.country === "Spain"
        ? "西班牙"
        : isDutch && location?.country === "Spain"
          ? "Spanje"
          : isPortuguese && location?.country === "Spain"
            ? "Espanha"
            : location?.country || "";

  /* TEMAS */
  const themes = {
    light: "bg-gradient-to-b from-gray-100 to-white text-black",
    dark: "bg-gradient-to-b from-gray-900 to-black text-yellow-400",
    gray: "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100",
  };
  const panelSurface =
    theme === "light"
      ? ""
      : "bg-gray-100/10 dark:bg-white/5";

  const baseBtn =
    "whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300";
  const activeBtn =
    "bg-white text-black dark:bg-gray-100 dark:text-gray-900 shadow-md";
  const inactiveBtn =
    "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-100 opacity-80 hover:opacity-100";
  const calendarLabel = isChinese
    ? "日历"
    : isPortuguese
      ? "Calendário"
      : isDutch
        ? "Kalender"
        : isEnglish
          ? "Calendar"
          : "Calendario";
  const clockLabel = isChinese
    ? "时钟"
    : isPortuguese
      ? "Relógio"
      : isDutch
        ? "Klok"
        : isEnglish
          ? "Clock"
          : "Reloj";
  const stopwatchLabel = isChinese
    ? "秒表"
    : isPortuguese
      ? "Cronómetro"
      : isDutch
        ? "Stopwatch"
        : isEnglish
          ? "Stopwatch"
          : "Cronómetro";
  const stopwatchStartLabel = isChinese
    ? "开始"
    : isPortuguese
      ? "Iniciar"
      : isDutch
        ? "Start"
        : isEnglish
          ? "Start"
          : "Iniciar";
  const stopwatchPauseLabel = isChinese
    ? "暂停"
    : isPortuguese
      ? "Pausar"
      : isDutch
        ? "Pauze"
        : isEnglish
          ? "Pause"
          : "Pausar";
  const stopwatchResetLabel = isChinese
    ? "重置"
    : isPortuguese
      ? "Reiniciar"
      : isDutch
        ? "Reset"
        : isEnglish
          ? "Reset"
          : "Reiniciar";
  const updateLocationLabel = isChinese
    ? "更新位置"
    : isPortuguese
      ? "Atualizar localização"
      : isDutch
        ? "Locatie bijwerken"
        : isEnglish
          ? "Update location"
          : "Actualizar ubicación";
  const selectedMonthLabel = calendarMonth.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
  const weekDayLabels = Array.from({ length: 7 }, (_, index) =>
    new Date(2024, 0, index + 1).toLocaleDateString(locale, {
      weekday: "short",
    }),
  );
  const firstDayOfMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1,
  );
  const daysInCalendarMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0,
  ).getDate();
  const calendarStartOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const calendarCellCount =
    Math.ceil((calendarStartOffset + daysInCalendarMonth) / 7) * 7;
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const calendarDays = Array.from({ length: calendarCellCount }, (_, index) => {
    const date = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      index - calendarStartOffset + 1,
    );
    const dateStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ).getTime();

    return {
      date,
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === calendarMonth.getMonth(),
      isPast: dateStart < todayStart,
      isFuture: dateStart > todayStart,
      isToday:
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate(),
    };
  });

  const changeCalendarMonth = (months: number) => {
    setCalendarMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + months,
          1,
        ),
    );
  };

  const toggleCalendar = () => {
    setCalendarOpen((open) => {
      const nextOpen = !open;
      localStorage.setItem("calendarOpen", String(nextOpen));
      if (nextOpen) {
        setStopwatchOpen(false);
        localStorage.setItem("stopwatchOpen", "false");
      }
      return nextOpen;
    });
  };

  const showClock = () => {
    setCalendarOpen(false);
    setStopwatchOpen(false);
    localStorage.setItem("calendarOpen", "false");
    localStorage.setItem("stopwatchOpen", "false");
  };

  const toggleStopwatch = () => {
    setStopwatchOpen((open) => {
      const nextOpen = !open;
      localStorage.setItem("stopwatchOpen", String(nextOpen));
      if (nextOpen) {
        setCalendarOpen(false);
        localStorage.setItem("calendarOpen", "false");
      }
      return nextOpen;
    });
  };

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchElapsed(0);
  };

  const startCountdown = (minutes: number) => {
    const duration = minutes * 60000;
    setStopwatchMode("down");
    setStopwatchDuration(duration);
    setStopwatchElapsed(duration);
    setStopwatchRunning(true);
  };

  const startStopwatch = () => {
    if (stopwatchMode === "down" && stopwatchElapsed === 0) {
      setStopwatchElapsed(stopwatchDuration);
    }
    setStopwatchRunning((running) => !running);
  };

  const updateLocation = () => {
    localStorage.setItem(
      LOCATION_UPDATE_HIDDEN_UNTIL_KEY,
      String(Date.now() + LOCATION_UPDATE_HIDE_MS),
    );
    setLocationUpdateHidden(true);
    loadLocation();
  };

  const stopwatchMinutes = Math.floor(stopwatchElapsed / 60000);
  const stopwatchSeconds = Math.floor((stopwatchElapsed % 60000) / 1000);
  const stopwatchCentiseconds = Math.floor((stopwatchElapsed % 1000) / 10);
  const stopwatchDisplay = `${String(stopwatchMinutes).padStart(2, "0")}:${String(
    stopwatchSeconds,
  ).padStart(2, "0")}.${String(stopwatchCentiseconds).padStart(2, "0")}`;
  const stopwatchMinuteDisplay = String(stopwatchMinutes).padStart(2, "0");
  const stopwatchSecondDisplay = String(stopwatchSeconds).padStart(2, "0");
  const stopwatchCentisecondDisplay = String(stopwatchCentiseconds).padStart(2, "0");
  const toolPanelOpen = calendarOpen || stopwatchOpen;
  const countdownPresets = [5, 10, 15, 30];
  const updateLocationButton = locationUpdateHidden ? null : (
    <button
      aria-label={updateLocationLabel}
      className="mt-5 inline-flex items-center justify-center gap-1.5 text-xs font-medium opacity-45 transition hover:opacity-80 disabled:cursor-wait disabled:opacity-35"
      disabled={locationLoading}
      onClick={updateLocation}
      type="button"
    >
      <RefreshCw
        aria-hidden="true"
        className={locationLoading ? "animate-spin" : ""}
        size={16}
      />
      {updateLocationLabel}
    </button>
  );

  const calendarPanel = (
    <aside className={`w-full rounded-2xl p-9 backdrop-blur-sm sm:p-12 ${panelSurface}`}>
      <div className="flex items-center justify-between gap-3">
        <button
          aria-label="Mes anterior"
          className="rounded-full bg-gray-300 p-3 text-gray-800 opacity-90 transition hover:opacity-100 dark:bg-gray-800 dark:text-gray-100"
          onClick={() => changeCalendarMonth(-1)}
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="flex-1 text-center text-2xl font-semibold capitalize sm:text-3xl">
          {selectedMonthLabel}
        </h2>
        <button
          aria-label="Mes siguiente"
          className="rounded-full bg-gray-300 p-3 text-gray-800 opacity-90 transition hover:opacity-100 dark:bg-gray-800 dark:text-gray-100"
          onClick={() => changeCalendarMonth(1)}
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase opacity-60 sm:gap-3 sm:text-sm">
        {weekDayLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 sm:gap-3">
        {calendarDays.map((calendarDay) => (
          <div
            key={calendarDay.date.toISOString()}
            className={`flex aspect-square items-center justify-center text-lg font-semibold transition sm:text-xl ${
              !calendarDay.inCurrentMonth
                ? "invisible"
                : calendarDay.isToday
                ? "rounded-full bg-white text-black shadow-md"
                : calendarDay.isPast
                  ? "text-current opacity-45"
                  : calendarDay.isFuture
                    ? "rounded-full bg-gray-100/10 text-current"
                    : "text-current opacity-30"
            }`}
          >
            {calendarDay.inCurrentMonth ? calendarDay.day : ""}
          </div>
        ))}
      </div>
    </aside>
  );

  const stopwatchPanel = (
    <aside className="w-full text-center">
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        <div className="flex flex-col items-start justify-center">
          <span className="font-[Space_Mono] text-[30vw] leading-none">
            {stopwatchMinuteDisplay}
          </span>
          <span className="mt-[-5vw] font-[Space_Mono] text-[30vw] leading-none">
            {stopwatchSecondDisplay}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-100/10 p-6 text-center backdrop-blur-sm dark:bg-white/5">
          <span className="font-[Space_Mono] text-[20vw] leading-none opacity-70">
            {stopwatchCentisecondDisplay}
          </span>
        </div>
      </div>

      <div className="hidden font-[Space_Mono] leading-none sm:block sm:text-[7rem] md:text-[10rem] lg:text-[13rem]">
        {stopwatchDisplay}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-12">
        <button
          className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-black shadow-md transition hover:opacity-90"
          onClick={startStopwatch}
          type="button"
        >
          {stopwatchRunning ? <Pause size={18} /> : <Play size={18} />}
          {stopwatchRunning ? stopwatchPauseLabel : stopwatchStartLabel}
        </button>
        <button
          className="flex items-center gap-2 rounded-full bg-gray-300 px-6 py-3 text-base font-semibold text-gray-800 opacity-90 transition hover:opacity-100 dark:bg-gray-800 dark:text-gray-100"
          onClick={resetStopwatch}
          type="button"
        >
          <RotateCcw size={18} />
          {stopwatchResetLabel}
        </button>
        {countdownPresets.map((minutes) => {
          const isActive =
            stopwatchMode === "down" && stopwatchDuration === minutes * 60000;

          return (
            <button
              className={`rounded-full px-5 py-3 text-base font-semibold transition ${
                isActive
                  ? "bg-white text-black shadow-md"
                  : "bg-gray-300 text-gray-800 opacity-90 hover:opacity-100 dark:bg-gray-800 dark:text-gray-100"
              }`}
              key={minutes}
              onClick={() => startCountdown(minutes)}
              type="button"
            >
              {minutes} min
            </button>
          );
        })}
      </div>
    </aside>
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-0 transition-colors duration-700 ${themes[theme]}`}
    >
      {/* CABECERA */}
      <div className="absolute top-3 sm:top-6 left-0 right-0 flex justify-between items-center px-6 sm:px-10">
        <h1 className="text-lg sm:text-xl font-semibold lowercase cursor-pointer">
          <Link href="/">que-hora.com</Link>
        </h1>

        <div className="absolute left-1/2 top-12 z-20 hidden -translate-x-1/2 gap-3 sm:flex xl:top-0">
          <button
            onClick={showClock}
            className={`flex items-center gap-2 ${
              !toolPanelOpen ? activeBtn : inactiveBtn
            } ${baseBtn}`}
            type="button"
          >
            <Clock3 size={16} />
            {clockLabel}
          </button>
          <button
            onClick={toggleCalendar}
            className={`flex items-center gap-2 ${
              calendarOpen ? activeBtn : inactiveBtn
            } ${baseBtn}`}
            type="button"
          >
            <CalendarDays size={16} />
            {calendarLabel}
          </button>
          <button
            onClick={toggleStopwatch}
            className={`flex items-center gap-2 ${
              stopwatchOpen ? activeBtn : inactiveBtn
            } ${baseBtn}`}
            type="button"
          >
            <Timer size={16} />
            {stopwatchLabel}
          </button>
        </div>

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
                    ? isChinese
                      ? "浅色"
                      : isPortuguese
                        ? "Claro"
                      : isDutch
                        ? "Licht"
                      : isEnglish
                      ? "Light"
                      : "Claro"
                    : t === "dark"
                      ? isChinese
                        ? "深色"
                        : isPortuguese
                          ? "Escuro"
                        : isDutch
                          ? "Donker"
                        : isEnglish
                        ? "Dark"
                        : "Oscuro"
                      : isChinese
                        ? "灰色"
                        : isPortuguese
                          ? "Cinzento"
                        : isDutch
                          ? "Grijs"
                        : isEnglish
                        ? "Gray"
                        : "Gris"}
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
        <div className="fixed right-4 top-3 z-30 sm:hidden">
          <LanguageToggle />
        </div>
        <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 sm:hidden">
          <button
            aria-label={clockLabel}
            onClick={showClock}
            className={`rounded-full p-2 transition ${
              !toolPanelOpen
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            type="button"
          >
            <Clock3 size={20} />
          </button>
          <button
            aria-label={calendarLabel}
            onClick={toggleCalendar}
            className={`rounded-full p-2 transition ${
              calendarOpen
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            type="button"
          >
            <CalendarDays size={20} />
          </button>
          <button
            aria-label={stopwatchLabel}
            onClick={toggleStopwatch}
            className={`rounded-full p-2 transition ${
              stopwatchOpen
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            type="button"
          >
            <Timer size={20} />
          </button>
        </div>
      </div>

      {/* =========================== */}
      {/* 📱 RESPONSIVE (solo móvil) */}
      {/* =========================== */}
      {calendarOpen && (
        <div className="sm:hidden w-full max-w-md px-6">
          {calendarPanel}
        </div>
      )}
      {stopwatchOpen && (
        <div
          className="w-full px-6 sm:hidden"
        >
          {stopwatchPanel}
        </div>
      )}
      {!stopwatchOpen && !calendarOpen && (
      <div className="sm:hidden w-full max-w-6xl px-6 grid grid-cols-2 gap-4">
        {/* HORAS + MINUTOS */}
        <div className="flex flex-col items-start justify-center">
          <span className="text-[30vw] leading-none font-[Space_Mono]">
            {hours}
          </span>
          <span className="text-[30vw] leading-none font-[Space_Mono] mt-[-5vw]">
            {minutes}
          </span>
        </div>

        {/* CARD — TIME IN + SECONDS */}
        <div
          className={`flex flex-col justify-center items-center p-6 rounded-2xl text-center backdrop-blur-sm ${panelSurface}`}
        >
          <span className="text-xl font-semibold opacity-90">{hourLabel}</span>
          <span className="text-2xl font-semibold opacity-90 mt-1">
            {location?.city || "…"}
          </span>
          <span className="text-lg opacity-70 mt-1 capitalize">
            {countryDisplay}
          </span>
          {updateLocationButton}
          <span className="text-[20vw] font-[Space_Mono] opacity-70 leading-none mt-4">
            {seconds}
          </span>
        </div>

        {/* CARD — WEATHER */}
        <div
          className={`p-6 rounded-2xl text-center backdrop-blur-sm flex flex-col items-center ${panelSurface}`}
        >
          <span className="text-xl font-semibold opacity-90">
            {weatherLabel}
          </span>
          {weather ? (
            <>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.desc}
                className="w-16 h-16 mt-2"
              />
              <span className="text-3xl font-semibold mt-2">
                {weather.temp}°C
              </span>
              <span className="text-lg opacity-80 mt-1 capitalize">
                {weather.desc}
              </span>
            </>
          ) : (
            <span className="text-lg opacity-80 mt-2">
              {isChinese
                ? "加载中..."
                : isPortuguese
                  ? "A carregar..."
                : isDutch
                  ? "Laden..."
                  : isEnglish
                    ? "Loading…"
                    : "Cargando…"}
            </span>
          )}
        </div>

        {/* CARD — DATE */}
        <div
          className={`flex flex-col items-center justify-center rounded-2xl p-6 text-center backdrop-blur-sm ${panelSurface}`}
        >
          <span className="text-2xl font-semibold opacity-90 capitalize">
            {weekday}
          </span>
          <span className="text-lg opacity-80 mt-1 capitalize">
            {dayMonthFormatted}
          </span>
          <span className="text-lg opacity-70 mt-1">{year}</span>
          <span className="text-sm opacity-60 mt-2">
            {isChinese ? `${weekLabel}${weekNumber}周` : `${weekLabel} ${weekNumber}`}
          </span>
        </div>
      </div>
      )}

      {/* =============================== */}
      {/* 🖥 DESKTOP VERSION */}
      {/* =============================== */}
      {calendarOpen && (
        <div className="hidden w-full max-w-3xl px-6 pt-28 sm:block">
          {calendarPanel}
        </div>
      )}
      {stopwatchOpen && (
        <div className="hidden w-full max-w-5xl px-6 pt-28 sm:block">
          {stopwatchPanel}
        </div>
      )}
      {!stopwatchOpen && !calendarOpen && (
      <div
        className={`hidden w-full items-end gap-8 px-6 pt-28 transition-all sm:grid ${
          toolPanelOpen
            ? "max-w-[102rem] grid-cols-[minmax(540px,660px)_minmax(0,1fr)]"
            : "max-w-none grid-cols-1"
        }`}
      >
        {toolPanelOpen && (
          <div className="flex w-full flex-col gap-8">
            {calendarOpen && calendarPanel}
            {stopwatchOpen && stopwatchPanel}
          </div>
        )}
        <div className="w-full">
        <div className="flex items-baseline justify-center mt-20 leading-none text-center">
          <h1
            className={`font-[Space_Mono] leading-none ${
              toolPanelOpen
                ? "text-[7rem] md:text-[10rem] lg:text-[13rem]"
                : "text-[10rem] md:text-[16rem] lg:text-[20rem]"
            }`}
          >
            {hours}:{minutes}
          </h1>
          <span className="ml-4 text-6xl md:text-7xl lg:text-8xl opacity-70 font-[Space_Mono]">
            {seconds}
          </span>
        </div>

        <div className="mt-20 w-full flex justify-center pt-14">
          <div
            className={`w-full grid gap-8 px-6 ${
              toolPanelOpen
                ? "max-w-4xl grid-cols-1 xl:grid-cols-3"
                : "max-w-6xl grid-cols-3"
            }`}
          >
            {/* CARD — TIME IN */}
            <div
              className={`flex flex-col items-center justify-center rounded-2xl p-10 text-center backdrop-blur-sm ${panelSurface}`}
            >
              <span className="text-3xl font-semibold opacity-90">
                {hourLabel}
              </span>
              <span className="text-4xl opacity-90 mt-2">
                {location?.city || "…"}
              </span>
              <span className="text-xl opacity-70 mt-2">{countryDisplay}</span>
              {updateLocationButton}
            </div>

            {/* CARD — WEATHER */}
            <div
              className={`flex flex-col items-center justify-center rounded-2xl p-10 text-center backdrop-blur-sm capitalize ${panelSurface}`}
            >
              <span className="text-3xl font-semibold opacity-90">
                {weatherLabel}
              </span>
              {weather ? (
                <>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.desc}
                    className="w-20 h-20 mt-4"
                  />
                  <span className="text-5xl font-semibold mt-4">
                    {weather.temp}°C
                  </span>
                  <span className="text-xl opacity-80 mt-2">
                    {weather.desc}
                  </span>
                </>
              ) : (
                <span className="text-xl opacity-80 mt-2">
                  {isChinese
                    ? "加载中..."
                    : isPortuguese
                      ? "A carregar..."
                    : isDutch
                      ? "Laden..."
                      : isEnglish
                        ? "Loading…"
                        : "Cargando…"}
                </span>
              )}
            </div>

            {/* CARD — DATE */}
            <div
              className={`flex flex-col items-center justify-center rounded-2xl p-10 text-center backdrop-blur-sm capitalize ${panelSurface}`}
            >
              <span className="text-5xl font-semibold opacity-90">
                {weekday}
              </span>
              <span className="text-3xl opacity-90 mt-2">
                {dayMonthFormatted}
              </span>
              <span className="text-3xl opacity-70 mt-2">{year}</span>
              <span className="text-xl opacity-70 mt-2">
                {isChinese ? `${weekLabel}${weekNumber}周` : `${weekLabel} ${weekNumber}`}
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
}
