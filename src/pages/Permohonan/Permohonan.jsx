import { Box, Typography, useTheme } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import { tokens } from "../../theme/theme";
import TrendPermohonan from "../../components/Permohonan/TrendPermohonan";
import DataPermohonan from "../../components/Permohonan/DataPermohonan";

const Permohonan = () => {
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
                            Permohonan
                        </Typography>
                    </Box>
                    {/* GRID AND CHARTS */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap="20px"
                        paddingTop= "20px"
                        >
                        {/* Trend Jumlah Permohonan */}
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                Trend Jumlah Permohonan
                            </Typography>
                            <TrendPermohonan/>
                        </Box>
                        {/* Data Permohonan */}
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                Data Permohonan
                            </Typography>
                            <DataPermohonan/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Permohonan;