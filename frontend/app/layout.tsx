import type { Metadata } from "next";
import { ViewTransition } from 'react'
// import { DM_Serif_Text } from "next/font/google";
import "./css/globals.css";
import UserProvider from "../context/UserContext/User-provider";
import ThemeProvider from "../context/ThemeContext/Theme-provider";
import SwitchThemes from "@/components/switchThemes/switchThemes";



//agregar otra fuente mas amigable visualmente
// const DST = DM_Serif_Text({
//   subsets: ["latin"], weight: "400"
// });


export const metadata: Metadata = {
  title: "ToDo",
  description: "Gestión de tareas personales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        // className={`${DST.className} antialiased`}
      >
        <ViewTransition>
          <ThemeProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </ThemeProvider>
        </ViewTransition>
      </body>
    </html>
  );
}

