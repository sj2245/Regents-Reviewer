'use client';

import "./shared/styles.scss";

import SharedData from "./shared/shared";
import Theme from "./components/theme/theme";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return <>
    <SharedData>
      <html lang={`en`}>
        <Theme>
          {children}
        </Theme>
      </html>
    </SharedData>
  </>
}