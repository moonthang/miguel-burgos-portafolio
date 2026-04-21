import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import DevPortfolio from '@/components/dev-portfolio';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const siteConfig = {
  name: "Miguel Burgos | Full-Stack Developer & Freelance Expert",
  description: "Desarrollador Web Full-Stack especializado en crear aplicaciones de alto rendimiento con Next.js y React. Soluciones digitales escalables para negocios, optimización SEO y diseño UI/UX profesional.",
  url: "https://miguel-burgos-portafolio.vercel.app/",
  ogImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmo8wrwjdcxut07n18r2w1cvq",
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "Desarrollador Web Full-Stack",
    "Freelance Web Developer Colombia",
    "Next.js Expert",
    "React Developer Freelance",
    "Desarrollo de Software a medida",
    "Miguel Burgos Portfolio",
    "Ingeniero de Software",
    "SEO Optimization",
    "UI/UX Design"
  ],
  authors: [{ name: "Miguel Burgos" }],
  creator: "Miguel Burgos",
  verification: {
    google: "EAAv2jokMUnEltYwEjiOLrg_F2gDqbyJYbm3iu5Er8k",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Miguel Burgos - Full-Stack Developer Portfolio",
      },
    ],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DevPortfolio>
            {children}
          </DevPortfolio>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
