import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const API_KEY = process.env.OPENWEATHER_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Falta la API key de OpenWeather" },
      { status: 500 }
    );
  }

  // Detectar idioma del cliente (por parámetro o fallback)
  const lang = searchParams.get("lang") === "en" ? "en" : "es";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data.weather) {
      return NextResponse.json(
        { error: "No se pudo cargar el clima" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      temp: Math.round(data.main.temp),
      desc: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    console.error("Error en /api/weather:", err);
    return NextResponse.json(
      { error: "Error interno obteniendo el clima" },
      { status: 500 }
    );
  }
}