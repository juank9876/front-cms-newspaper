import { Onest, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/juankui/header";
import { Footer } from "@/components/juankui/footer";
import { fetchSiteSettings } from "@/api-fetcher/fetcher";
import { ViewTransitions } from 'next-view-transitions'
import { hexToOklch } from "@/utils/hex-to-oklch";
import { Providers } from "./providers";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400", // o ["400", "700"], según necesites
  subsets: ["latin"],
  variable: "--font-poppins"
});


export default async function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await fetchSiteSettings()
  //cambiar el valor para distinta tonalidad
  //const primaryLightColor = hexToOklch(settings.primary_color, 0.9)
  const primaryLightColor = "#ffffff"
  const secondaryLightColor = hexToOklch(settings.secondary_color, 0.80);
  const accentLightColor = hexToOklch(settings.accent_color, 0.80);

  const primarySemiDarkColor = hexToOklch(settings.primary_color, 0.3, 'darker')
  const primaryDarkColor = hexToOklch(settings.primary_color, 0.4, 'darker')

  const secondaryDarkColor = hexToOklch(settings.secondary_color, 0.2, 'darker');
  const accentDarkColor = hexToOklch(settings.accent_color, 0.2, 'darker');

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className={`${onest.variable} ${poppins.variable}`}>
        <head>
          <title>{settings.meta_title}</title>
          <meta name="description" content={settings.meta_description} />
          {/* puedes usar settings.favicon, site_logo, etc */}
          <link rel="icon" href={settings.favicon || "/vercel.svg"} />
        </head>
        <body
          style={{
            '--color-primary': settings.primary_color,
            '--color-secondary': settings.secondary_color,
            '--color-accent': settings.accent_color,

            '--color-primary-light': primaryLightColor,
            '--color-secondary-light': secondaryLightColor,
            '--color-accent-light': accentLightColor,

            '--color-primary-semi-dark': primarySemiDarkColor,
            '--color-primary-dark': primaryDarkColor,
            '--color-secondary-dark': secondaryDarkColor,
            '--color-accent-dark': accentDarkColor,

          } as React.CSSProperties
          }
          className={`max-w-screen bg-white antialiased`}
          suppressHydrationWarning
        >
          <Providers>
            <div className="flex min-h-[100dvh] flex-col">
              <Header />
              {children}
              <Footer settings={settings} />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
