import { Bebas_Neue, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const publicSans = Public_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata = {
  title: "La Riposte — Actu esport français",
  description:
    "Fil d'actu esport français agrégé : titres, résumés et liens vers les rédactions sources, calendrier LFL/LEC/Valorant/CS2 et classements en direct."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${publicSans.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
