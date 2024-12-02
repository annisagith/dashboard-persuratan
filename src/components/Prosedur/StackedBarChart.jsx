import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";

// URL untuk komponen Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur 
const STATUSES_URL = "api/ProsedurDashboard/statuses";

const StackedBarChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(STATUSES_URL, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response); // Log respons dari API untuk memeriksa datanya
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

    // Transformasi data untuk Recharts
    const chartData = data.map(item => ({
        namaProsedur: item.namaProsedur,
        antrian: item.totalAntrian,
        diproses: item.totalDiproses,
        selesai: item.totalSelesai
    }));

    return (
        <Box>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ bottom: 30}}>
                    {/* Sumbu X */}
                    <XAxis 
                        dataKey="namaProsedur"
                        tick={{ fontSize: 12, fill: '#ffffff', width:100}}
                        textAnchor="middle" 
                        interval={0}
                    />
                    {/* Sumbu Y */}
                    <YAxis />
                    {/* Tooltip */}
                    <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px", color: "#fff" }} // Warna latar tooltip
                        itemStyle={{ color: "#fff" }} // Warna teks item tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // Warna saat kursor hover di batang
                    />
                    {/* Legend */}
                    <Legend 
                        verticalAlign="top" 
                        height={10}
                        iconType="rect"
                        />
                    {/* Grafik batang bertumpuk */}
                    <Bar dataKey="antrian" stackId="a" fill="#02B2AF" name="Antrian" />
                    <Bar dataKey="diproses" stackId="a" fill="#72CCFF" name="Diproses" />
                    <Bar dataKey="selesai" stackId="a" fill="#DA00FF" name="Selesai" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default StackedBarChart;
