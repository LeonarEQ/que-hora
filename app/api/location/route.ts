import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // 1. Obtener IP REAL del usuario desde Vercel
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "8.8.8.8"; // fallback temporal

    // 2. Consultar ipwho.is con la IP del usuario
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();

    if (!data || data.success === false) {
      return NextResponse.json(
        { error: "No se pudo obtener la ubicación del usuario." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      city: data.city,
      country: data.country,
      timezone: data.timezone?.id,
      lat: data.latitude,
      lon: data.longitude,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error interno obteniendo la ubicación." },
      { status: 500 }
    );
  }
}
