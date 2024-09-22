import React from "react";
import Theme from "../theme/theme";


export default function Document({ children }: { children: React.ReactNode; }) {
    return (
        <html lang={`en`} className={`quizListHTML`}>
            <body>
                <Theme>
                    {children}
                </Theme>
            </body>
        </html>
    )
}