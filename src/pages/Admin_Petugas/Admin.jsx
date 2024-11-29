// IMPORT TEMA TAMPILAN
import { tokens } from "../../theme/theme";
// IMPORT KOMPONEN MATERIAL UI (LIBRARY KOMPONEN) UNTUK TAMPILAN 
import { Box, Typography, useTheme } from "@mui/material";
// IMPORT KOMPONEN GLOBAL (TOPBAR DAN SIDEBAR)
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
// IMPORT KOMPONEN HALAMAN MONITORING ADMIN PETUGAS
import Card from "../../components/Admin_Petugas/Card";
import ProsedurPj from "../../components/Admin_Petugas/ProsedurPj";
import DaftarPj from "../../components/Admin_Petugas/DaftarPj";

const Admin = () => {
    // MENGIMPOR DAN MENDEFINISIKAN TEMA UNTUK TAMPILAN (DARK/LIGHT) + COLOR KOMPONEN
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
                            Admin/Petugas
                        </Typography>
                    </Box>
                    {/* GRID AND CHARTS */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap="20px"
                        paddingTop= "20px"
                        >
                        {/* Card */}
                        <Box gridColumn="span 12">
                            <Card/>
                        </Box>
                        {/* Jumlah Prosedur Per Penanggung Jawab */}
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            padding="15px"
                            borderRadius="20px">
                            <Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                    Jumlah Prosedur Per Penanggung Jawab
                                </Typography>
                            </Box>
                            <ProsedurPj/>    
                        </Box>                        
                        {/* Daftar Penanggung Jawab */}
                        <Box 
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            padding="15px"
                            borderRadius="20px">
                            <Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                    Informasi Prosedur
                                </Typography>
                            </Box>
                            <DaftarPj/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Admin;