'use client';

import "./shared/styles.scss";

import { useContext } from "react";
import Theme from "./components/theme/theme";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";
import Document from "./components/document/document";
import SharedData, { SharedDatabase } from "./shared/shared";

export default function RootLayout({ children }: { children: React.ReactNode; }) {

  let { darkMode, isSidebarOpen, isMobileSidebarOpen, setMobileSidebarOpen } = useContext<any>(SharedDatabase);

  return <>
    <SharedData>
      <Document>
        <Theme>
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          />
          <Header />
          {children}
          <Footer />
        </Theme>
      </Document>
    </SharedData>
  </>
}