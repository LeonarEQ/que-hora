import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function HomePage() {
  const headersList = await headers();        
  const acceptLanguage = headersList.get("accept-language") || "";
  const prefersSpanish = acceptLanguage.startsWith("es");

  const target = prefersSpanish ? "/es" : "/en";

  redirect(target);
}