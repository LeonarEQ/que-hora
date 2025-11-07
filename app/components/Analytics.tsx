"use client";

import Script from "next/script";

export default function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QL5JYXYJ8D"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QL5JYXYJ8D');
        `}
      </Script>
    </>
  );
}
