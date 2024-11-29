import { useState, useEffect } from "react";
import { Box, CircularProgress, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme/theme";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { alpha } from "@mui/material";
import React from "react";

const URL = 'api/PetugasDashboard/admin/count';


const Card = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(URL, {
                    headers: { 
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Configuration map for icons and colors
    const configMap = {
        "Total Admin Kantah": {
            icon: <AdminPanelSettingsIcon />,
            iconBackground: alpha(colors.purple.main, 0.34)
        },
        "Total Admin Pusat": {
            icon: <BusinessIcon />,
            iconBackground: alpha(colors.green.main, 0.34)
        },
        "Total Penanggung Jawab": {
            icon: <AssignmentIndIcon />,
            iconBackground: alpha(colors.blue.main, 0.34)
        }
    };

    // Function to determine the color and icon for the keterangan text based on comparison with yesterday's data
    const getKeteranganIcon = (today, yesterday) => {
        if (today > yesterday) {
            return { icon: <TrendingUpIcon sx={{ color: colors.green.main }} /> }; // Green if the value has increased
        } else if (today < yesterday) {
            return { icon: <TrendingDownIcon sx={{ color: colors.red.main }} /> }; // Red if the value has decreased
        }
        return { icon: null }; // Black if no change
    };

    // Map API data to card details
    const cardDetails = data.map((item) => {
        const config = configMap[item.title] || {
            icon: <AdminPanelSettingsIcon />, // Default icon
            iconBackground: alpha(colors.purple.main, 0.34), // Default color
            };
        const today = item.today;
        const yesterday = item.yesterday;

        const { icon } = getKeteranganIcon(today, yesterday);

        return {
            title: item.title,
            count: item.today,
            icon: config.icon,
            iconBackground: config.iconBackground,
            keterangan: item.keterangan,
            keteranganIcon: icon,            
        };
    })

    return (
        <Box 
            sx={{
                flexWrap: 'nowrap', // Pastikan grid tetap dalam satu baris
                gap: 2,
                justifyContent: 'flex-start',   
                display:"grid",
                gridTemplateColumns:"repeat(12, 1fr)",
                overflowX: 'auto', // Aktifkan scroll horizontal
                '&::-webkit-scrollbar': { display: 'none' }, // Menyembunyikan scrollbar di Webkit browsers
                msOverflowStyle: 'none',  // Menyembunyikan scrollbar di Internet Explorer dan Edge
                scrollbarWidth: 'none',   // Menyembunyikan scrollbar di Firefox
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap', // Pastikan grid tetap dalam satu baris
                        gap: 2,
                        justifyContent: 'flex-start'
                    }}>
                    {cardDetails.map(({ title, count, icon, iconBackground, keterangan, keteranganIcon }) => (
                        <Box
                            key={title}
                            sx = 
                            {{ 
                                flex: '0 0 auto', // Menjaga lebar tetap otomatis
                                width: 370, // Tentukan lebar agar konten tetap terkontrol
                                backgroundColor: alpha(colors.white.main, 0.34),
                                borderRadius: 5,
                                padding: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}>
                            {/* Title */}
                            <Typography variant="h5" sx={{ color: colors.primary.main }}>
                                {title}
                            </Typography>

                            {/* Count and Icon */}
                            <Box sx={{ display: "flex", alignItems: "center", mt: 2, mx: 2 }}>
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{ color: colors.primary.main, flex: 1 }}
                                >
                                    {count}
                                </Typography>
                                <Box
                                    sx={{
                                        backgroundColor: iconBackground,
                                        borderRadius: "20%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: 60,
                                        height: 60,
                                    }}
                                >
                                    {React.cloneElement(icon, { sx: { fontSize: 40, color: colors.primary.main } })}
                                </Box>
                            </Box>

                            {/* Subtitle with keterangan and dynamic icon */}
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                {keteranganIcon && (
                                    <Box sx={{ ml: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {keteranganIcon}
                                    </Box>
                                )}
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 1, ml: 1 }}  // Tambahkan margin-left di sini jika perlu jarak
                                >
                                    {keterangan}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </Box>
    );

}

export default Card;