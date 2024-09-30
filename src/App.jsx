import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/Topbar"; // Mengimpor komponen Topbar
import Topdashboard from "./components/Topdashboard";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
            <Topdashboard />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
