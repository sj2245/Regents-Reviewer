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
        <body className={`flex`}>
          <Theme>
            <Sidebar style={{ maxWidth: 250 }} />
            <main className={`main w100 flex column gap5 spaceBetween alignCenter`}>
              <Header />
              {children}
              <Footer />
            </main>
          </Theme>
        </body>
      </html>
    </SharedData>
  </>
}