import { Box, Typography, useTheme } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import { tokens } from "../../theme/theme";
import PieJumlahPermohonan from "../../components/Layanan/PieJumlahPermohonan.jsx";
import TrendPermohonanLayanan from "../../components/Layanan/TrendPermohonanLayanan.jsx";
import BarJmlhPermohonan from "../../components/Layanan/BarJmlhPermohonan.jsx";
import DaftarLayanan from "../../components/Layanan/DaftarLayanan.jsx";

const Layanan = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);   

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
                    </Box>
                    {/* GRID AND CHARTS */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap="20px"
                        paddingTop= "20px"
                        >
                        {/* Permohonan/Kategori Layanan */}
                        <Box
                            gridColumn={{ xs: 'span 12', sm: 'span 12', md: 'span 4', lg: 'span 4', xl: 'span 4' }}
                            backgroundColor={colors.white.main}
                            padding="20px"
                            borderRadius="20px"
                            >
                            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                Permohonan/Kategori Layanan
                            </Typography>
                            <PieJumlahPermohonan/>
                        </Box>
                        {/* Tren Rata-rata Waktu Pemrosesan Layanan/Kategori (hari) */}
                        <Box
                            gridColumn={{ xs: 'span 12', sm: 'span 12', md: 'span 8', lg: 'span 8', xl: 'span 8' }}
                            backgroundColor={colors.white.main}
                            padding="20px"
                            borderRadius="20px"
                            >
                            <TrendPermohonanLayanan/>   
                        </Box>
                        {/* Perbandingan Jumlah Permohonan Berdasarkan Status Permohonan  */}
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                Perbandingan Jumlah Permohonan Berdasarkan Status Permohonan 
                            </Typography>
                            <BarJmlhPermohonan/>
                        </Box>
                        {/* DAFTAR LAYANAN */}
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                Daftar Layanan
                            </Typography>
                            <DaftarLayanan/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Layanan;