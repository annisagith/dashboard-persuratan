import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from "../../theme/theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { auth, setAuth } = useAuth(); // Mengambil data auth dari hook useAuth
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus semua cookie yang berhubungan dengan sesi login
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('username_akun');
    Cookies.remove('nama_admin');

    setAuth({}); // Menghapus data otentikasi
    navigate('/'); // Arahkan pengguna ke halaman login
  };

  return (
    <Box className="topbar-component" sx={{ alignItems: 'center', padding: '0 20px', height: '40px' }}>
      <Typography variant="h4" color={colors.primary.main} fontWeight="bold">DASHBOARD</Typography>
      <Box display="flex" alignItems="center">
          <Typography variant="h5 ">Welcome, {auth.nama_admin}</Typography>
          <IconButton onClick={colorMode.toggleColorMode}>
          {
              theme.palette.mode == "dark" ? (
              <LightModeOutlinedIcon/>
              ) : (
              <DarkModeOutlinedIcon/>
              )
          }
          </IconButton>
          <IconButton onClick={handleLogout}>
              <LogoutIcon/>
          </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
