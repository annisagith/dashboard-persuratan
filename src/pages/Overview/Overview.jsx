import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme/theme";
import { alpha } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import CardData from "../../components/Overview/CardData";
import GeographyChart from "../../components/Overview/GeographyChart";
import AppSummary from "../../components/Overview/AppSummary";
import PerformaPj from "../../components/Overview/PerformaPj";
import StatusPermohonan from "../../components/Overview/StatusPermohonan";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Overview = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { auth } = useAuth();
    const navigate = useNavigate(); // Hook untuk navigasi
    // Mengecek apakah role bukan "Pusat"
    useEffect(() => {
        if (auth.role !== "Pusat") {
            // Jika bukan role "Pusat", arahkan ke halaman akses ditolak atau login
            navigate('/', { state: { message: 'Access Denied: You are not authorized to view this page.' } }); // Ganti dengan rute yang sesuai
        }
    }, [auth.role, navigate]); // Pengecekan dilakukan setiap kali role berubah

    if (!auth.role) {
        return <div>Loading...</div>; // Menunggu data auth tersedia
    }   

    return (
        <Box display="flex">
        {/* SIDEBAR KOMPONEN */}
        <Sidebar/>
        <Box width="100%">
            {/* TOPBAR KOMPONEN */}
            <Topbar/>
            {/* BODY */}
            <Box m="20px">
                {/* HEADER */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography variant="h4" sx={{ color: colors.primary.main }}>
                        Overview
                    </Typography>
                </Box>
                {/* GRID AND CHARTS */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                    paddingTop= "20px"
                    >
                    {/* ROW 1 => 5 CARD TILES*/}
                    <Box gridColumn={`span 12`}>
                        <CardData/>
                    </Box>
                    {/* ROW 2 */}
                    {/* PETA */}
                    <Box
                        gridColumn={{ xs: 'span 12', sm: 'span 12', md: 'span 6', lg: 'span 6', xl: 'span 6' }}
                        backgroundColor={colors.white.main}
                        borderRadius="20px"
                        >
                        <Box>
                            <GeographyChart/>
                        </Box> 
                    </Box>
                    {/* SUMMARY */}
                    <Box
                        gridColumn={{ xs: 'span 12', sm: 'span 12', md: 'span 6', lg: 'span 6', xl: 'span 6' }}
                        backgroundColor= {alpha(colors.white.main, 0.60)}
                        borderRadius="20px"
                        p={2}
                        >
                        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                            Ringkasan Permohonan Dalam Penanganan
                        </Typography>
                        <AppSummary/>
                    </Box>
                    {/* ROW 3 */}
                    <Box
                        gridColumn={{ xs: 'span 12', sm: 'span 12', md: 'span 7', lg: 'span 7', xl: 'span 7' }}
                        backgroundColor={colors.white.main}
                        padding= "15px" 
                        borderRadius="20px">
                        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.primary.main }}>
                            Performa Penanggung Jawab
                        </Typography>
                        <PerformaPj/>
                    </Box>
                    <Box
                        gridColumn={{ xs: 'span 12', sm: 'span 12', md: 'span 5', lg: 'span 5', xl: 'span 5' }}
                        backgroundColor={colors.white.main} 
                        padding= "15px"
                        borderRadius="20px">
                        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                            Status Permohonan
                        </Typography>
                        <StatusPermohonan/>
                        </Box>
                </Box>
            </Box>
        </Box>
        </Box>
    );
}

export default Overview;
