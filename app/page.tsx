import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function HomePage() {
  const headersList = await headers();        
  const acceptLanguage = headersList.get("accept-language") || "";
  const prefersSpanish = acceptLanguage.startsWith("es");
  const prefersChinese = acceptLanguage.startsWith("zh");
  const prefersDutch = acceptLanguage.startsWith("nl");
  const prefersPortuguese = acceptLanguage.startsWith("pt");

  const target = prefersPortuguese
    ? "/pt"
    : prefersDutch
    ? "/nl"
    : prefersChinese
      ? "/zh"
      : prefersSpanish
        ? "/es"
        : "/en";

  redirect(target);
}
