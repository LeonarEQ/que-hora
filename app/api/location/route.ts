import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    if (!data || data.success === false) {
      return NextResponse.json(
        { error: "No se pudo obtener la ubicación del usuario." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      city: data.city,               // Vigo
      country: data.country,         // España
      timezone: data.timezone?.id,   // Europe/Madrid
      lat: data.latitude,
      lon: data.longitude,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno obteniendo la ubicación." },
      { status: 500 }
    );
  }
}
