import type {Metadata} from 'next';
import { Inter, Playfair_Display, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Locky - Hello World',
  description: 'A beautifully designed simple single-page Hello World for Locky.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn(playfair.variable, "font-sans", geist.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="font-sans antialiased bg-base text-primary selection:bg-brand selection:text-base animate-fade-in" suppressHydrationWarning>
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: 'var(--accent-primary)',
              colorBackground: 'var(--bg-surface)',
              colorForeground: 'var(--text-primary)',
              colorMutedForeground: 'var(--text-secondary)',
              colorInput: 'var(--bg-base)',
              colorInputForeground: 'var(--text-primary)',
              colorBorder: 'var(--border-default)',
              fontFamily: 'var(--font-sans)',
            }
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
