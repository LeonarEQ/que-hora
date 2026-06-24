import type { Metadata } from "next";

export const siteUrl = "https://que-hora.com";
export const siteName = "que-hora.com";

export const locales = ["es", "en", "zh", "nl", "pt"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
  zh: "中文",
  nl: "Nederlands",
  pt: "Português",
};

export const localeHtmlLang: Record<Locale, string> = {
  es: "es",
  en: "en",
  zh: "zh-CN",
  nl: "nl",
  pt: "pt",
};

export const homeCopy: Record<
  Locale,
  { title: string; description: string; heading: string; intro: string }
> = {
  es: {
    title: "Qué hora es ahora - que-hora.com",
    description: "Consulta la hora actual y el clima en tu ciudad con Sunvalis.",
    heading: "Qué hora es ahora",
    intro:
      "Consulta la hora actual, la fecha y el clima local en tiempo real desde que-hora.com.",
  },
  en: {
    title: "Current time now - que-hora.com",
    description:
      "Check the current time and weather in your city with Sunvalis. Accurate, fast and updated every second.",
    heading: "Current time now",
    intro:
      "Check the current time, date and local weather in real time from que-hora.com.",
  },
  zh: {
    title: "现在几点 - que-hora.com",
    description: "查看你所在城市的当前时间和天气。快速、准确，并每秒更新。",
    heading: "现在几点",
    intro: "在 que-hora.com 查看当前时间、日期和本地天气。",
  },
  nl: {
    title: "Hoe laat is het nu - que-hora.com",
    description:
      "Bekijk de actuele tijd en het weer in je stad. Snel, nauwkeurig en elke seconde bijgewerkt.",
    heading: "Hoe laat is het nu",
    intro:
      "Bekijk de actuele tijd, datum en het lokale weer in realtime op que-hora.com.",
  },
  pt: {
    title: "Que horas são agora - que-hora.com",
    description:
      "Veja a hora atual e o clima na sua cidade. Rápido, preciso e atualizado a cada segundo.",
    heading: "Que horas são agora",
    intro:
      "Veja a hora atual, a data e o clima local em tempo real no que-hora.com.",
  },
};

export const legalPages = {
  legal: {
    paths: {
      es: "/es/aviso-legal",
      en: "/en/legal-notice",
      zh: "/zh/legal-notice",
      nl: "/nl/legal-notice",
      pt: "/pt/legal-notice",
    },
    metadata: {
      es: {
        title: "Aviso Legal - que-hora.com",
        description:
          "Aviso legal y condiciones de uso del sitio que-hora.com operado por Sunvalis.",
      },
      en: {
        title: "Legal Notice - que-hora.com",
        description:
          "Legal notice and site terms for que-hora.com operated by Sunvalis.",
      },
      zh: {
        title: "法律声明 - que-hora.com",
        description: "que-hora.com 的法律声明和使用条款。",
      },
      nl: {
        title: "Juridische kennisgeving - que-hora.com",
        description:
          "Juridische kennisgeving en gebruiksvoorwaarden van que-hora.com.",
      },
      pt: {
        title: "Aviso Legal - que-hora.com",
        description: "Aviso legal e condições de utilização de que-hora.com.",
      },
    },
  },
  privacy: {
    paths: {
      es: "/es/politica-privacidad",
      en: "/en/privacy-policy",
      zh: "/zh/privacy-policy",
      nl: "/nl/privacy-policy",
      pt: "/pt/privacy-policy",
    },
    metadata: {
      es: {
        title: "Política de Privacidad - que-hora.com",
        description:
          "Consulta cómo Sunvalis gestiona los datos y la información del usuario en que-hora.com.",
      },
      en: {
        title: "Privacy Policy - que-hora.com",
        description:
          "Learn how Sunvalis handles user information and cookies on que-hora.com.",
      },
      zh: {
        title: "隐私政策 - que-hora.com",
        description: "que-hora.com 的隐私政策。",
      },
      nl: {
        title: "Privacybeleid - que-hora.com",
        description: "Privacybeleid van que-hora.com.",
      },
      pt: {
        title: "Política de Privacidade - que-hora.com",
        description: "Política de privacidade de que-hora.com.",
      },
    },
  },
  cookies: {
    paths: {
      es: "/es/politica-cookies",
      en: "/en/cookies-policy",
      zh: "/zh/cookies-policy",
      nl: "/nl/cookies-policy",
      pt: "/pt/cookies-policy",
    },
    metadata: {
      es: {
        title: "Política de Cookies - que-hora.com",
        description:
          "Información sobre el uso de cookies y tecnologías similares en que-hora.com.",
      },
      en: {
        title: "Cookies Policy - que-hora.com",
        description:
          "Information about the use of cookies and similar technologies on que-hora.com.",
      },
      zh: {
        title: "Cookie 政策 - que-hora.com",
        description: "que-hora.com 的 Cookie 使用说明。",
      },
      nl: {
        title: "Cookiebeleid - que-hora.com",
        description: "Cookiebeleid van que-hora.com.",
      },
      pt: {
        title: "Política de Cookies - que-hora.com",
        description: "Política de cookies de que-hora.com.",
      },
    },
  },
} as const;

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export function homePath(locale: Locale) {
  return `/${locale}`;
}

export function homeAlternates() {
  return {
    "x-default": absoluteUrl("/en"),
    ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(homePath(locale))])),
  };
}

export function legalAlternates(page: keyof typeof legalPages) {
  return {
    "x-default": absoluteUrl(legalPages[page].paths.en),
    ...Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(legalPages[page].paths[locale])]),
    ),
  };
}

export function getHomeMetadata(locale: Locale): Metadata {
  const copy = homeCopy[locale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(homePath(locale)),
      languages: homeAlternates(),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(homePath(locale)),
      siteName,
      locale: localeHtmlLang[locale],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: copy.title,
      description: copy.description,
    },
  };
}

export function getLegalMetadata(
  page: keyof typeof legalPages,
  locale: Locale,
): Metadata {
  const copy = legalPages[page].metadata[locale];
  const path = legalPages[page].paths[locale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: legalAlternates(page),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absoluteUrl(path),
      siteName,
      locale: localeHtmlLang[locale],
      type: "article",
    },
    twitter: {
      card: "summary",
      title: copy.title,
      description: copy.description,
    },
  };
}
