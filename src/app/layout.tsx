'use client';

import "./shared/styles.scss";

import SharedData from "./shared/shared";
import Theme from "./components/theme/theme";

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