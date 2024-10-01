import { Box, useTheme, Typography, Button } from "@mui/material";
import { tokens } from "../theme"
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group'; // untuk jumlah user
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // untuk jumlah admin
import DescriptionIcon from '@mui/icons-material/Description'; //jumlah permohonan
import PendingActionsIcon from '@mui/icons-material/PendingActions'; // permohonan sedang diproses
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // permohonan selesai
import { alpha } from "@mui/material/styles";
import StatBox from "../components/StatBox";
// import GeographyChart from "../components/GeographyChart";


const Topdashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);    

    return (
            <Box>
                {/* HEADER  */}
                <Box className="topdashboard-preference" sx={{ alignItems: 'center', padding: '25px 20px', height: '40px', margin: '0 ' }}>
                    <Typography variant="h4" color={colors.primary.main}>
                        Overview
                    </Typography>
                    <Box display="flex">
                        <Box>
                            <Button
                                sx={{
                                    fontSize:"10px",
                                    fontWeight:"lighter",
                                    borderRadius:"20px",
                                    border: "1px solid",
                                    borderColor: colors.primary.main,
                                    margin: "0 3px"
                                }}
                            >
                                <DownloadIcon sx={{ mr: "10px" }} />
                                    Download Reports
                            </Button>
                        </Box>

                        <Box>
                            <Button
                                sx={{
                                    fontSize:"10px",
                                    fontWeight:"lighter",
                                    borderRadius:"20px",
                                    border: "1px solid",
                                    borderColor: colors.primary.main,
                                    margin: "0 3px"
                                }}
                            >
                                <FilterListIcon sx={{ mr: "10px" }} />
                                Filter by office
                            </Button>
                        </Box>

                        <Box>
                            <Button
                                sx={{
                                    fontSize:"10px",
                                    fontWeight:"lighter",
                                    borderRadius:"20px",
                                    border: "1px solid",
                                    borderColor: colors.primary.main,
                                    margin: "0 3px"
                                }}
                            >
                                <CalendarTodayIcon sx={{ mr: "10px" }} />
                                Filter by date
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* ROW 1 */}
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",  // Pada layar kecil (xs), 2 kolom
                        sm: "repeat(3, 1fr)",  // Pada layar sedang (sm), 3 kolom
                        md: "repeat(5, 1fr)",  // Pada layar lebih besar (md dan seterusnya), 5 kolom
                      }, // 5 kolom, masing-masing akan mengambil 1 bagian yang sama
                    gap: "10px", // Jarak antara tile
                    padding: " 10px 20px", // Jarak dari tepi dashboard
                    width: "100%", // Menyesuaikan lebar dashboard
                    justifyContent: "center",
                    }}>
                    
                    <Box sx= {{ backgroundColor: alpha(colors.white.main, 0.50), padding: "20px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                    >
                    <StatBox
                        title="Total Application"
                        count="1,500"
                        icon={ 
                            <DescriptionIcon/>
                        }
                        icrease="8.5%"
                        subtitle="Up from yesterday"
                        progress="0.75"
                        increase="+14%"
                        iconBackground={alpha(colors.purple.main, 0.34)} 
                    />
                    </Box>
                    <Box sx= {{ backgroundColor: alpha(colors.white.main, 0.50), padding: "20px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                    >
                    <StatBox
                        title="Completed Application"
                        count="1,500"
                        icon={
                            <CheckCircleIcon/>
                        }
                        icrease="8.5%"
                        subtitle="Up from yesterday"
                        progress="0.75"
                        increase="+14%"
                        iconBackground={alpha(colors.green.main, 0.34)} 
                    />
                    </Box>
                    <Box sx= {{ backgroundColor: alpha(colors.white.main, 0.50), padding: "20px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                    >
                    <StatBox
                        title="Application In Progress"
                        count="1,500"
                        icon={
                            <PendingActionsIcon/>
                        }
                        icrease="8.5%"
                        subtitle="Up from yesterday"
                        progress="0.75"
                        increase="+14%"
                        iconBackground={alpha(colors.yellow.main, 0.34)} 
                    />
                    </Box>
                    <Box sx= {{ backgroundColor: alpha(colors.white.main, 0.50), padding: "20px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                    >
                    <StatBox
                        title="Number Of Users"
                        count="1,500"
                        icon={
                            <GroupIcon/>
                        }
                        icrease="8.5%"
                        subtitle="Up from yesterday"
                        progress="0.75"
                        increase="+14%"
                        iconBackground={alpha(colors.red.main, 0.34)} 
                    />
                    </Box>

                    <Box sx= {{ backgroundColor: alpha(colors.white.main, 0.50), padding: "20px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                    >
                    <StatBox
                        title="Number Of Admins"
                        count="1,500"
                        icon={
                            <AdminPanelSettingsIcon/>
                        }
                        icrease="8.5%"
                        subtitle="Up from yesterday"
                        progress="0.75"
                        increase="+14%"
                        iconBackground={alpha(colors.blue.main, 0.34)} 
                    />
                    </Box>
                </Box>

                {/* ROW 2 */}
                <Box >

                </Box>

            </Box>
    );
};

export default Topdashboard;
