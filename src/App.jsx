import {Route, Routes} from 'react-router-dom'
import { ColorModeContext, useMode } from "./theme/theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login/Login.jsx';
import Overview from './pages/Overview/Overview.jsx';
import Admin from './pages/Admin_Petugas/Admin.jsx';
import Layanan from './pages/Layanan/Layanan.jsx';
import Permohonan from './pages/Permohonan/Permohonan.jsx';
import Prosedur from './pages/Prosedur/Prosedur.jsx';
import Wilayah from './pages/Wilayah/Wilayah.jsx';


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
                    <Route path="/overview" element = 
                    {                        
                      <ProtectedRoute>
                            <Overview />
                      </ProtectedRoute>
                    }/>
                </Route>
                <Route>
                    <Route path="/admin" element = 
                    {                        
                      <ProtectedRoute>
                            <Admin />
                      </ProtectedRoute>
                    }/>
                </Route>
                <Route>
                    <Route path="/layanan" element = 
                    {                        
                      <ProtectedRoute>
                            <Layanan />
                      </ProtectedRoute>
                    }/>
                </Route>
                <Route>
                    <Route path="/permohonan" element = 
                    {                        
                      <ProtectedRoute>
                            <Permohonan />
                      </ProtectedRoute>
                    }/>
                </Route>
                <Route>
                    <Route path="/prosedur" element = 
                    {                        
                      <ProtectedRoute>
                            <Prosedur />
                      </ProtectedRoute>
                    }/>
                </Route>
                <Route>
                    <Route path="/wilayah" element = 
                    {                        
                      <ProtectedRoute>
                            <Wilayah />
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
