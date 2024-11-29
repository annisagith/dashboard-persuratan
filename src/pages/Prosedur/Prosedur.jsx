import { Box, Typography, useTheme } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import { tokens } from "../../theme/theme";
import StackedBarChart from "../../components/Prosedur/StackedBarChart";
import TableInformasiProsedur from "../../components/Prosedur/TableInformasiProsedur";


const Prosedur = () => {
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
                            Prosedur
                        </Typography>
                    </Box>
                    {/* GRID AND CHARTS */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap="20px"
                        paddingTop= "20px"
                        >
                        {/* Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur  */}
                        <Box 
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            borderRadius="20px"
                            padding="20px"
                            >
                            <Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                    Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur                                 
                                </Typography>
                                    <StackedBarChart/>
                            </Box>
                        </Box>
                        {/* Informasi Prosedur */}
                        <Box 
                            gridColumn="span 12"
                            backgroundColor={colors.white.main}
                            padding="20px"
                            borderRadius="20px">
                            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                Informasi Prosedur
                            </Typography>
                            <TableInformasiProsedur/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Prosedur;
