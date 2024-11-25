import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme/theme";
import { alpha } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
// import StatBox from "../../components/Overview/StatBox";
import CardData from "../../components/Overview/CardData";
import GeographyChart from "../../components/Overview/GeographyChart";
import AppSummary from "../../components/Overview/AppSummary";
import PerformaPj from "../../components/Permohonan/PerformaPj";
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

    const handleButtonClick = (label) => {
        switch(label) {
            case "Download Reports":
                console.log("Downloading reports...");
                // Logika download di sini
                break;
            default:
                console.log("Unknown action");
        }
    };    

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
                <Box display="flex">
                    {["Download Reports"].map((label, index) => (
                    <Box key={index}>
                        <Button 
                            onClick={() => handleButtonClick(label)}
                            sx={{
                                fontSize: "10px",
                                fontWeight: "lighter",
                                borderRadius: "20px",
                                border: "1px solid",
                                borderColor: colors.primary.main,
                                margin: "0 3px"
                            }}
                        >
                            {label.includes("Download") && <DownloadIcon sx={{ mr: "10px" }} />}
                            {label}
                        </Button>
                    </Box>
                    ))}
                </Box>
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
                     gridColumn="span 6"
                     backgroundColor={colors.white.main}
                     borderRadius="20px"
                     >
                    <Box>
                        <GeographyChart/>
                    </Box> 
                </Box>
                {/* SUMMARY */}
                <Box
                    gridColumn="span 6"
                    backgroundColor= {alpha(colors.white.main, 0.60)}
                    borderRadius="20px"
                    p={2}
                    >
                    <Box sx ={{ display:"flex", justifyContent:"space-between", alignItems: "center" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                            Ringkasan Permohonan Dalam Penanganan
                        </Typography>
                    </Box>
                    <AppSummary/>
                </Box>
                {/* ROW 3 */}
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.white.main}
                    padding= "15px" >
                        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.primary.main }}>
                        Performa Penanggung Jawab
                        </Typography>
                        <PerformaPj/>
                    </Box>
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.white.main} 
                    padding= "15px">
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
