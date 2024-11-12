import { Box, Typography, Button, useTheme } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";
import { tokens } from "../../theme/theme";
import DownloadIcon from '@mui/icons-material/Download';
import SummaryWilayah from "../../components/Wilayah/SummaryWilayah";
import TrendPermohonan from "../../components/Wilayah/TrendPermohonan";
import PerformaKantor from "../../components/Wilayah/PerformaKantor";
import InformasiKantor from "../../components/Wilayah/InformasiKantor";

const Wilayah = () => {
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
        <Box minHeight= "100vh" display="flex">
            {/* SIDEBAR KOMPONEN */}
            <Sidebar/>
            <Box  sx ={{flexGrow: 1,  width: "100%", overflowX: "auto"}}>
                {/* TOPBAR KOMPONEN */}
                <Topbar/>
                {/* BODY */}
                <Box m="20px">
                    {/* HEADER */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant="h4" sx={{ color: colors.primary.main }}>
                            Wilayah
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
                        <Box>
                            <SummaryWilayah/>
                        </Box>
                        <Box
                            sx = {{ 
                                backgroundColor: colors.white.main,
                                padding: "20px",
                                borderRadius: "20px"
                             }}
                            >
                            <TrendPermohonan/>
                        </Box>
                        <Box
                            sx = {{ 
                                backgroundColor: colors.white.main,
                                padding: "20px",
                                borderRadius: "20px",
                                mt: "20px"
                             }}
                            >
                            <PerformaKantor/>
                        </Box>
                        <Box
                            sx = {{ 
                                backgroundColor: colors.white.main,
                                padding: "20px",
                                borderRadius: "20px",
                                mt: "20px"
                             }}
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