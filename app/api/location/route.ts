import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    let ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    if (
      !ip ||
      ip === "::1" ||
      ip.startsWith("127.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.")
    ) {
      ip = "8.8.8.8";
    }

    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();

    if (!data || data.status !== "success") {
      return NextResponse.json(
        { error: "No se pudo obtener la ubicación del usuario." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      city: data.city,
      country: data.country,
      timezone: data.timezone || "Europe/Madrid",
      lat: data.lat,
      lon: data.lon,
    });
  } catch (error) {
    console.error("Error en /api/location:", error);
    return NextResponse.json(
      { error: "Error interno obteniendo la ubicación." },
      { status: 500 },
    );
  }
}
