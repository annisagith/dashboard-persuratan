import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from "recharts";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";
import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const URL = 'api/PetugasDashboard/penanggung-jawab/jumlah-prosedur';

const ProsedurPj = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Menggunakan tema untuk responsivitas
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Deteksi layar kecil
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Layar sedang

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
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

    const dataset = data.map(item => ({
        nama: item.namaPenanggungJawab,
        jmlh_prosedur: item.jumlahProsedur,
    }));

    // Mengatur margin berdasarkan ukuran layar
    const dynamicMargin = isSmallScreen
        ? { left: 50, right: 10 }
        : isMediumScreen
        ? { left: 200, right: 20 }
        : { left: 400, right: 20 };

    return (
        <Box>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dataset} layout="vertical" margin={dynamicMargin}>
                    <XAxis type="number" />
                    <YAxis
                        type="category"
                        dataKey="nama"
                        tick={{
                            angle: 0,
                            fontSize: 12,
                            textAnchor: "end",
                            width: isSmallScreen ? 300 : 600, // Lebar label responsif
                            fill: '#ffffff',
                        }}
                        interval={0}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px", color: "#fff" }} // Warna latar tooltip
                        itemStyle={{ color: "#fff" }} // Warna teks item tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // Warna saat kursor hover di batang
                    />
                    <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="rect"
                        formatter={() => 'Rerata Hari Pengerjaan Prosedur'}
                    />
                    <Bar dataKey="jmlh_prosedur" fill="#02b2af" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ProsedurPj;
