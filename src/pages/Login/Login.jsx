import { Box, Typography, Button, TextField, useTheme, IconButton, Alert } from "@mui/material";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ColorModeContext, tokens } from "../../theme/theme";
import { useContext, useEffect, useState } from 
'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth"

const LOGIN_URL ="api/AuthAdmin/login";

const Login = () => {
    // menampilkan informasi auth 
    const {setAuth} = useAuth();
    const {auth} = useAuth();
    useEffect(() => {
        console.log("Auth status on app start:", auth);
    }, [auth]); // Menjalankan efek ini setiap kali `auth` berubah

    // menggunakan tema dark || light
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with username:", username, "and password:", password);
        try {
            console.log("Sending login request");
            const response = await axios.post(LOGIN_URL,{username, password},
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log("Response received:", response.data['data']);
            // const{token, admin} = response.data;
            const token = response.data['data']['token'];
            const username_akun = response.data['data']['admin']['username']
            const nama_admin = response.data['data']['admin']['nama']
            // setAuth({ ...admin, token });
            setAuth({ username_akun, token, nama_admin });
            setUsername('');
            setPassword('');
            navigate('/dashboard');
        } catch (err) {
            console.log("Error occurred during login:", err); 
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    useEffect(() => {
        console.log("Updated errMsg:", errMsg);
    }, [errMsg]);
    

    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            sx={{ 
                height: "100vh", 
                }}
        >
            <Box   
                sx={{ justifyContent: 'center', alignItems: 'center'}}
                gridColumn={'span 5'}
            >
                <Box m="20px">
                    <Box sx = {{ display: "flex", alignItems:"center", gap: "10px"}}>
                        <Box>
                            <img src="/logoatrbpn.png" alt="Logo" style={{ width: "100px", height: "auto" }} />
                        </Box>
                        <Box width="200px">
                            <Typography variant= "h6">
                                Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant = "h3">
                            DASHBOAR MONITORING SISTEM PEMBERKASAN ATR/BPN
                        </Typography>
                    </Box>
                    
                    <Box sx={{ backgroundColor: colors.white.main, borderRadius: "20px"}}>
                        <Box m="30px" p="20px">
                            {errMsg && (
                            <Alert severity="error" onClose={() => setErrMsg('')}
                            tabIndex="-1"
                            role="alert">
                                {errMsg}
                            </Alert>
                            )}  
                            <Typography variant="h4" gutterBottom>Login</Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField label="Username" 
                                value={username}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                fullWidth 
                                 sx={{ marginBottom: 2 }} />
                                <TextField label="Password" type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth 
                                sx={{ marginBottom: 2 }} />
                                <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                fullWidth 
                                sx={{ marginBottom: 3 }}>Login</Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{ 
                    backgroundImage: 'url(/animasiatrbpn.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                    }}
                gridColumn={'span 7'}
            >
                <IconButton 
                    onClick={colorMode.toggleColorMode} 
                    sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
                >
                    {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                </IconButton>
            </Box>
        </Box>
    );
}

export default Login;
