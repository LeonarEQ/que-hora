import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log(">>> /api/location ejecutado");

    // 1. Obtener IP REAL del usuario
    let ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    // Si es localhost o privada, usa fallback
    if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      ip = "8.8.8.8"; // IP pública válida
    }

    console.log("IP final:", ip);

    // 2. Consultar ipwho.is con la IP del usuario
    const res = await fetch(`https://ipwho.is/${ip}`); // ← sin espacio
    const data = await res.json();

    console.log("ipwho.is response:", data);

    if (!data || data.success === false) {
      return NextResponse.json(
        { error: "No se pudo obtener la ubicación del usuario." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      city: data.city,
      country: data.country,
      timezone: data.timezone?.id || "Europe/Madrid",
      lat: data.latitude,
      lon: data.longitude,
    });
  } catch (error) {
    console.error("Error en /api/location:", error);
    return NextResponse.json(
      { error: "Error interno obteniendo la ubicación." },
      { status: 500 }
    );
  }
}