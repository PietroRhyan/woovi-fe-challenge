import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Woovi | Método de Pagamento",
  description: "Code Challenge da Woovi para o cargo de Frontend Júnior ",
  authors: {
    name: "Pietro Rhyan"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-white text-black`}>
      <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  );
}
