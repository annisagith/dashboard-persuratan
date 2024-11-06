import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme/theme";
import { alpha } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group'; // untuk jumlah user
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // untuk jumlah admin
import DescriptionIcon from '@mui/icons-material/Description'; //jumlah permohonan
import PendingActionsIcon from '@mui/icons-material/PendingActions'; // permohonan sedang diproses
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // permohonan selesai
import Topbar from "../../components/Topbar";
// import Sidebar from "../../components/Sidebar";
import StatBox from "../../components/StatBox";
import GeographyChart from "../../components/GeographyChart";
import AppSummary from "../../components/AppSummary";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { auth } = useAuth();
    const navigate = useNavigate(); // Hook untuk navigasi
    // Mengecek apakah role bukan "Pusat"
    useEffect(() => {
        if (auth.role !== "Pusat") {
            // Jika bukan role "Pusat", arahkan ke halaman akses ditolak atau login
            navigate('/access-denied'); // Ganti dengan rute yang sesuai
        }
    }, [auth.role, navigate]); // Pengecekan dilakukan setiap kali role berubah

    if (!auth.role) {
        return <div>Loading...</div>; // Menunggu data auth tersedia
    }

    // Data untuk kartu, termasuk icon dan background
    const cardData = [
        {
            title: "Total Applications",
            count: "1,500", //ambil count dari database
            icon: <DescriptionIcon />,
            increase: "8.5%", //menghitung perubahan data dari kemaren
            subtitle: "Up from yesterday", //conditional berdasarkan increase
            iconBackground: alpha(colors.purple.main, 0.34),
        },
        {
            title: "Completed Application",
            count: "2,300",
            icon: <CheckCircleIcon />,
            increase: "12%",
            subtitle: "Up from yesterday",
            iconBackground: alpha(colors.green.main, 0.34),
        },
        {
            title: "Application In Progress",
            count: "1,200",
            icon: <PendingActionsIcon />,
            increase: "5%",
            subtitle: "Stable from yesterday",
            iconBackground: alpha(colors.yellow.main, 0.34),
        },
        {
            title: "Number Of Users",
            count: "3,000",
            icon: <GroupIcon />,
            increase: "15%",
            subtitle: "Up from yesterday",
            iconBackground: alpha(colors.red.main, 0.34),
        },
        {
            title: "Number Of Admins",
            count: "200",
            icon: <AdminPanelSettingsIcon />,
            increase: "10%",
            subtitle: "Up from yesterday",
            iconBackground: alpha(colors.blue.main, 0.34),
        },
    ];

    const handleButtonClick = (label) => {
        switch(label) {
            case "Download Reports":
                console.log("Downloading reports...");
                // Logika download di sini
                break;
            case "Filter by office":
                console.log("Filtering by office...");
                // Logika filter by office di sini
                break;
            case "Filter by date":
                console.log("Filtering by date...");
                // Logika filter by date di sini
                break;
            default:
                console.log("Unknown action");
        }
    };    

    return (
        <Box display="flex">
        {/* SIDEBAR KOMPONEN
        <Sidebar/> */}
        <Box>
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
                    {["Download Reports", "Filter by office", "Filter by date"].map((label, index) => (
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
                            {label.includes("Filter by office") && <FilterListIcon sx={{ mr: "10px" }} />}
                            {label.includes("Filter by date") && <CalendarTodayIcon sx={{ mr: "10px" }} />}
                            {label}
                        </Button>
                    </Box>
                    ))}
                </Box>
            </Box>
            {/* GRID AND CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(15, 1fr)"
                gridTemplateRows="140px 240px 240px"
                gap="20px"
                paddingTop= "20px"
            >
                {/* ROW 1 => 5 CARD TILES*/}
                {cardData.map((card, index) => (
                    <Box 
                        key = {index}
                        gridColumn={`span 3`}
                        sx = {{ 
                            borderRadius: "20px", 
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px",
                            backgroundColor: alpha(colors.white.main, 0.40),
                         }}
                        >
                          <StatBox
                            title={card.title} // Menampilkan judul dari data kartu
                            count={card.count} // Menampilkan count dari data kartu
                            icon={card.icon} // Menampilkan ikon dari data kartu
                            increase={card.increase} // Menampilkan peningkatan dari data kartu
                            subtitle={card.subtitle} // Menampilkan subtitle dari data kartu
                            iconBackground={card.iconBackground} // Menampilkan warna background ikon dari data kartu
                            />
                        </Box>
                ))}
                {/* ROW 2 */}
                {/* PETA */}
                <Box
                     gridColumn="span 8"
                     backgroundColor={colors.white.main}
                     borderRadius="20px"
                     >
                    <Box>
                        <GeographyChart/>
                    </Box> 
                </Box>
                {/* SUMMARY */}
                <Box
                    gridColumn="span 7"
                    backgroundColor= {alpha(colors.white.main, 0.60)}
                    padding= "15px"
                    borderRadius="20px"
                    >
                    <Box sx ={{ display:"flex", justifyContent:"space-between", alignItems: "center" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                            APPLICATION SUMMARY
                        </Typography>
                    </Box>
                        <AppSummary/>
                </Box>
                {/* ROW 3 */}
                <Box
                    gridColumn="span 5"
                    backgroundColor={colors.white.main} 
                    padding= "15px" >
                        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                            APPLICATION TREND
                        </Typography>
                        <Box width="100%">
                            {/* <LineChartComponent/> */}
                        </Box>
                    </Box>
                <Box
                    gridColumn="span 5"
                    backgroundColor={colors.white.main}
                    padding= "15px" >
                        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                            USERS AND APPLICATION
                        </Typography>
                    </Box>
                <Box
                    gridColumn="span 5"
                    backgroundColor={colors.white.main} 
                    padding= "15px">
                        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: "15px", color: colors.primary.main }}>
                            APPLICATION STATUS
                        </Typography>
                    </Box>
            </Box>
        </Box>
        </Box>
        </Box>
    );
}

export default Dashboard;
