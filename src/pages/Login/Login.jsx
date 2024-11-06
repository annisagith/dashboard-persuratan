import { Box, Typography, Button, TextField, useTheme, IconButton, Alert } from "@mui/material";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ColorModeContext, tokens } from "../../theme/theme";
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

// URL untuk endpoint login
const LOGIN_URL = "api/AuthAdmin/login";

const Login = () => {
    // Mengambil `setAuth` dari konteks autentikasi
    const { setAuth } = useAuth();
    const { auth } = useAuth();
    
    // Menampilkan status auth saat aplikasi dimulai dan ketika auth berubah
    useEffect(() => {
        console.log("Auth status on app start:", auth);
    }, [auth]);

    // Menggunakan tema untuk mode terang/gelap
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); // Mengambil warna tema berdasarkan mode (terang atau gelap)
    const colorMode = useContext(ColorModeContext); // Konteks untuk mengubah mode terang/gelap

    const location = useLocation(); // Untuk mengambil state dari navigate
    // Untuk navigasi ke halaman lain setelah login berhasil
    const navigate = useNavigate();

    // Mengambil message dari state (jika ada)
    const message = location.state?.message || ''; 
    useEffect(() => {
        // Jika ada pesan dari state, tampilkan alert
        if (message) {
            setErrMsg(message); // Set pesan error ke state errMsg
        }
    }, [message]);
    

    // State untuk menyimpan input username dan password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(''); // Menyimpan pesan error jika login gagal

    // Fungsi yang menangani submit form login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman
        console.log("Form submitted with username:", username, "and password:", password);
        try {
            console.log("Sending login request");
            // Mengirim permintaan login ke server
            const response = await axios.post(LOGIN_URL, { username, password }, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log("Response received:", response.data['data']);

            // Mengambil token dan informasi admin dari response
            const token = response.data['data']['token'];
            const decoded = jwtDecode(token);
            const role = decoded.role; // Extract the role from the decoded token
            const username_akun = response.data['data']['admin']['username'];
            const nama_admin = response.data['data']['admin']['nama'];
            
            // Menyimpan token dan info admin ke dalam konteks autentikasi
            setAuth({ username_akun, token, nama_admin, role });
            
            // Mengosongkan input setelah login berhasil
            setUsername('');
            setPassword('');
            
            // Mengarahkan ke halaman dashboard
            navigate('/dashboard');
        } catch (err) {
            console.log("Error occurred during login:", err); 
            // Menangani pesan error tergantung pada jenis kesalahan
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

    // Menampilkan log jika pesan error diperbarui
    useEffect(() => {
        console.log("Updated errMsg:", errMsg);
    }, [errMsg]);

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" sx={{ height: "100vh" }}>
            {/* Kolom kiri: Form login */}
            <Box sx={{ justifyContent: 'center', alignItems: 'center' }} gridColumn={'span 5'}>
                <Box m="20px">
                    {/* Header logo dan nama instansi */}
                    <Box sx={{ display: "flex", alignItems:"center", gap: "10px" }}>
                        <Box>
                            <img src="/logoatrbpn.png" alt="Logo" style={{ width: "100px", height: "auto" }} />
                        </Box>
                        <Box width="200px">
                            <Typography variant="h6">
                                Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h3">
                            DASHBOARD MONITORING SISTEM PEMBERKASAN ATR/BPN
                        </Typography>
                    </Box>
                    
                    {/* Box untuk form login */}
                    <Box sx={{ backgroundColor: colors.white.main, borderRadius: "20px" }}>
                        <Box m="30px" p="20px">
                            {/* Menampilkan pesan error jika ada */}
                            {errMsg && (
                                <Alert severity="error" onClose={() => setErrMsg('')}
                                tabIndex="-1"
                                role="alert">
                                    {errMsg}
                                </Alert>
                            )}  
                            <Typography variant="h4" gutterBottom>Login</Typography>
                            <form onSubmit={handleSubmit}>
                                {/* Input username */}
                                <TextField 
                                    label="Username" 
                                    value={username}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    fullWidth 
                                    sx={{ marginBottom: 2 }} 
                                />
                                {/* Input password */}
                                <TextField 
                                    label="Password" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    fullWidth 
                                    sx={{ marginBottom: 2 }} 
                                />
                                {/* Tombol submit untuk login */}
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    type="submit"
                                    fullWidth 
                                    sx={{ marginBottom: 3 }}
                                >
                                    Login
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Kolom kanan: Background image dan tombol mode terang/gelap */}
            <Box
                sx={{ 
                    backgroundImage: 'url(/animasiatrbpn.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}
                gridColumn={'span 7'}
            >
                {/* Tombol untuk toggle mode terang/gelap */}
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
