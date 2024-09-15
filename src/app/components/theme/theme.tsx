import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { baselightTheme } from '@/utils/theme/DefaultColors';

export default function Theme({ children }: { children: React.ReactNode; }) {
    return (
        <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}