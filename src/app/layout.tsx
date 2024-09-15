import React from "react";
import "./shared/styles.scss";
import SharedData from "./shared/shared";
import Document from "./components/document/document";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return <>
    <SharedData>
      <Document>
        {children}
      </Document>
    </SharedData>
  </>
}