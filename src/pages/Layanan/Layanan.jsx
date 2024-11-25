import { Box, Typography, Button, useTheme } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import { tokens } from "../../theme/theme";
import DownloadIcon from '@mui/icons-material/Download';
import PieJumlahPermohonan from "../../components/Layanan/PieJumlahPermohonan.jsx";
import TrendPermohonanLayanan from "../../components/Layanan/TrendPermohonanLayanan.jsx";
import BarJmlhPermohonan from "../../components/Layanan/BarJmlhPermohonan.jsx";
import DaftarLayanan from "../../components/Layanan/DaftarLayanan.jsx";

const Layanan = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

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
                            Layanan
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
                    <Box>
                        <Box
                            sx = {{ 
                                display: "grid",
                                gridTemplateColumns: "repeat(12, 1fr)",
                                gap: "20px",
                                paddingTop: "20px"
                             }}>
                            {/* Permohonan/Kategori Layanan */}
                            <Box
                                sx ={{ 
                                    backgroundColor: colors.white.main,
                                    padding: "20px",
                                    borderRadius: "20px",
                                    gridColumn: "span 4"
                                 }}>
                                <Typography>
                                    Permohonan/Kategori Layanan
                                </Typography>
                                <PieJumlahPermohonan/>
                            </Box>
                            {/* Tren Rata-rata Waktu Pemrosesan Layanan/Kategori (hari) */}
                            <Box
                                sx = {{ 
                                    backgroundColor: colors.white.main,
                                    padding: "20px",
                                    borderRadius: "20px",
                                    gridColumn: "span 8"
                                 }}>
                                <TrendPermohonanLayanan/>   
                            </Box>
                        </Box>
                        {/* Perbandingan Jumlah Permohonan Berdasarkan Status Permohonan  */}
                        <Box
                            sx = {{ 
                                backgroundColor: colors.white.main,
                                padding: "20px",
                                borderRadius: "20px",
                                mt: "20px",
                                width: "100%"
                             }}>
                            <Typography>
                                Perbandingan Jumlah Permohonan Berdasarkan Status Permohonan 
                            </Typography>
                            <BarJmlhPermohonan/>
                        </Box>
                        {/* DAFTAR LAYANAN */}
                        <Box
                            sx = {{ 
                                backgroundColor: colors.white.main,
                                padding: "20px",
                                borderRadius: "20px",
                                mt: "20px"
                             }}>
                                <DaftarLayanan/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Layanan;