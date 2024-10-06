'use client';

import Footer from "../footer/footer";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { brandName, logoURL, description } from "@/app/shared/shared";

export class PageProps {
    children: any;
    title: string = `Home`;
    desc?: string = description;
}

export default function Page({ title, desc = description, children }: PageProps) {
  return (
    <body className={`regentsReviewerBody dark flex`}>
        {/* Page Head */}
        <HelmetProvider>
            <Helmet>
                <title>{title} | {brandName}</title>
                <link rel={`manifest`} href={`/manifest.json`} />
                <meta name={`theme-color`} content={`#000000`} />
                <meta name={`description`} content={description} />
                <link rel={`icon`} href={logoURL} type={`image/x-icon`} />
                <link rel={`apple-touch-icon`} href={`/icons/icon-192x192.png`} />
                <meta name={`viewport`} content={`width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`} />
                <link rel={`stylesheet`} href={`https://use.fontawesome.com/releases/v5.8.1/css/all.css`} integrity={`sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf`} crossOrigin={`anonymous`} />
            </Helmet>
        </HelmetProvider>
        {/* Page Content */}
        <Sidebar style={{ maxWidth: 250 }} />
        <main className={`main w100 flex column gap5 spaceBetween alignCenter`}>
            <Header />
            {children}
            <Footer />
        </main>
    </body>
  )
}