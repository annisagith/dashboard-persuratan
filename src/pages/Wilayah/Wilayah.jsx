import { Box, Typography, useTheme } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import { tokens } from "../../theme/theme";
import SummaryWilayah from "../../components/Wilayah/SummaryWilayah";
import TrendPermohonan from "../../components/Wilayah/TrendPermohonan";
import PerformaKantor from "../../components/Wilayah/PerformaKantor";
import InformasiKantor from "../../components/Wilayah/InformasiKantor";

const Wilayah = () => {
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
                            Wilayah
                        </Typography>
                    </Box>
                    {/* GRID AND CHARTS */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap="20px"
                        paddingTop= "20px"
                        >
                        <Box gridColumn="span 12">
                            <SummaryWilayah/>
                        </Box>
                        {/* ROW 2 */}
                        {/* Trend Jumlah Permohonan Wilayah Pusat */}
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <TrendPermohonan/>
                        </Box>
                        {/* Analisis Performa Kantor Pusat */}
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <PerformaKantor/>
                        </Box>
                        <Box
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <InformasiKantor/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Wilayah;