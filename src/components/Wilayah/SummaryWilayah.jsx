import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import { tokens } from "../../theme/theme";
import { alpha } from "@mui/material";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';

const URL = "api/WilayahDashboard/Card";

const SummaryWilayah = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response); // Log respons dari API untuk memeriksa datanya
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{
            py: 2,
            maxWidth: '100%',  // Pastikan kontainer tidak melampaui lebar layar
            width: '100%', // Pastikan kontainer mengisi seluruh lebar
            overflowX: 'auto', // Aktifkan scroll horizontal
            '&::-webkit-scrollbar': { display: 'none' }, // Menyembunyikan scrollbar di Webkit browsers
            msOverflowStyle: 'none',  // Menyembunyikan scrollbar di Internet Explorer dan Edge
            scrollbarWidth: 'none',   // Menyembunyikan scrollbar di Firefox
        }}>
            <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap', // Pastikan grid tetap dalam satu baris
                gap: 2,
                justifyContent: 'flex-start'
            }}>
                {data.map((wilayah, index) => (
                    <Box 
                        key={index}
                        sx={{
                            flex: '0 0 auto', // Menjaga lebar tetap otomatis
                            width: 250, // Tentukan lebar agar konten tetap terkontrol
                            backgroundColor: alpha(colors.white.main, 0.34),
                            borderRadius: 2,
                            boxShadow: 3,
                            padding: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            {wilayah.namaWilayah}
                        </Typography>
                        <Box padding="5px 0 0 20px">
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <ContactMailIcon />
                                <Typography variant="h6" color={colors.lightGrey.main}>
                                    {wilayah.totalPermohonan} Total Permohonan
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <SupportAgentIcon />
                                <Typography variant="h6" color={colors.lightGrey.main}>
                                    {wilayah.totalAdmin} Total Admin
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <BusinessIcon />
                                <Typography variant="h6" color={colors.lightGrey.main}>
                                    {wilayah.totalKantor} Total Kantor
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <PeopleAltIcon />
                                <Typography variant="h6" color={colors.lightGrey.main}>
                                    {wilayah.totalPemohon} Total Pemohon
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default SummaryWilayah;
