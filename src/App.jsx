import {Route, Routes} from 'react-router-dom'
import { ColorModeContext, useMode } from "./theme/theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from './pages/Login/Login.jsx';
import Dashboard from "./pages/Dashboard/Dashboard"
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AccessDenied from './components/access-denied.jsx';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
              <Routes>
                <Route path="/" element = {<Login/>}/>
                <Route>
                    <Route path="/dashboard" element = 
                    {                        
                      <ProtectedRoute>
                            <Dashboard />
                      </ProtectedRoute>
                    }/>
                </Route>
                <Route>
                    <Route path="/access-denied" element = 
                    {                        
                      <ProtectedRoute>
                            <AccessDenied />
                      </ProtectedRoute>
                    }/>
                </Route>
              </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
