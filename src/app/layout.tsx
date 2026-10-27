import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex, Noto_Sans_Devanagari, Yatra_One } from "next/font/google";
import { EVENT } from "@/data/event";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TabBar } from "@/components/layout/TabBar";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

/* One family for everything: Google Sans Flex, with Noto Sans Devanagari for Hindi. */
const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans",
  display: "swap",
  adjustFontFallback: false,
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-devanagari",
  display: "swap",
});

/* Yatra One: only the hero headline */
const yatra = Yatra_One({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-yatra",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${EVENT.name} ${EVENT.city} · ${EVENT.dateLabel} · ${EVENT.nameHi}`,
    template: `%s · ${EVENT.name}`,
  },
  description: `A festival alive with books. Kitab Utsav ${EVENT.city}, ${EVENT.dateLabel}, at ${EVENT.venueShort}: author meets, book launches, poetry readings, panel talks, workshops and a book exhibition, by ${EVENT.hostGroup}.`,
  openGraph: {
    title: `${EVENT.name} ${EVENT.city} · ${EVENT.nameHi}`,
    description: `${EVENT.dateLabel} · ${EVENT.hours} · ${EVENT.venueShort}`,
    type: "website",
    locale: "hi_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf1e4" },
    { media: "(prefers-color-scheme: dark)", color: "#201510" },
  ],
};

// Applies the saved theme before first paint so the page never flashes.
const themeScript = `try{var t=localStorage.getItem("rk-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hi"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${googleSans.variable} ${devanagari.variable} ${yatra.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="pb-[calc(84px+env(safe-area-inset-bottom))] xl:pb-0">
        <a
          href="#main"
          className="absolute left-4 top-[-60px] z-[100] rounded-pill bg-accent-fill px-4 py-2.5 font-semibold text-on-accent no-underline focus:top-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main"><PageTransition>{children}</PageTransition></main>
        <Footer />
        <TabBar />
      </body>
    </html>
  );
}
