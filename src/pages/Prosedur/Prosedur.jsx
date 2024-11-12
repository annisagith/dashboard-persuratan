import { Box, Typography, Button, useTheme } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import { tokens } from "../../theme/theme";
import { alpha } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import StackedBarChart from "../../components/Prosedur/StackedBarChart";
import TableInformasiProsedur from "../../components/Prosedur/TableInformasiProsedur";


const Prosedur = () => {
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
                            Prosedur
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
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(1, 1fr)"
                        gap="20px"
                        paddingTop= "20px">
                        {/* Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur  */}
                        <Box 
                            gridColumn="span 1"
                            backgroundColor={colors.white.main}
                            borderRadius="20px">
                            <Box
                                backgroundColor= {alpha(colors.white.main, 0.60)}
                                padding= "15px"
                                borderRadius="20px"
                                >
                                <Box sx ={{ display:"flex", justifyContent:"space-between", alignItems: "center" }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                        Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur                                 
                                    </Typography>
                                </Box>
                                    <StackedBarChart/>
                                </Box>
                        </Box>
                        {/* Informasi Prosedur */}
                        <Box 
                            gridColumn="span 1"
                            backgroundColor={colors.white.main}
                            padding="15px"
                            borderRadius="20px">
                            <Box sx ={{ display:"flex", justifyContent:"space-between", alignItems: "center" }}>
                                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                                    Informasi Prosedur
                                </Typography>
                            </Box>
                            <TableInformasiProsedur/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Prosedur;
