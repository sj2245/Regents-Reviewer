export default function Document({ children }: { children: React.ReactNode; }) {
    return (
        <html lang={`en`}>
            <body>
                {children}
            </body>
        </html>
    )
}