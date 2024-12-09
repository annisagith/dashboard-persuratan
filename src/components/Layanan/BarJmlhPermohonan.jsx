import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";
import {Box, useTheme} from '@mui/material';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import CircularProgress from '@mui/material/CircularProgress';
import { tokens } from "../../theme/theme";


// URL untuk komponen Perbandingan Jumlah Permohonan Berdasarkan Status Permohonan Untuk Tiap Kategori
const URL = "api/LayananDashboard/kategori/status";

const BarJmlhPermohonan = () => {
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
                console.log(response); // Log respons dari API untuk memeriksa datanya
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []); // [] membuat efek hanya dipanggil sekali saat komponen dimuat
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        ); // Menampilkan CircularProgress saat loading
    }

    const chartData = data.map(item => ({
        kategori: item.namaKategori,
        diajukan: item.totalDiajukan,
        diproses: item.totalDiproses, 
        ditolak: item.totalDitolak,
        selesai: item.totalSelesai,
        sop: item.totalMelebihiSOP,
    }));

    return (
        <Box width="100%" height={400}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{bottom: 20}}>
                    {/* Sumbu X */}
                    <XAxis 
                        dataKey="kategori" 
                        angle={0} 
                        textAnchor="middle" 
                        tick={{ fontSize: 12, fill: colors.primary.main, width: 150}}
                        interval={0} // Menampilkan semua label
                    />
                    
                    {/* Sumbu Y */}
                    <YAxis />
                    
                    {/* Tooltip */}
                    <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px", color: "#fff" }} // Warna latar tooltip
                        itemStyle={{ color: "#fff" }} // Warna teks item tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // Warna saat kursor hover di batang
                    />
                    {/* Legenda */}
                    <Legend verticalAlign="top" height={36} />

                    {/* Bar untuk setiap seri */}
                    <Bar dataKey="diajukan" fill="#02B2AF" name="Diajukan" />
                    <Bar dataKey="diproses" fill="#72CCFF" name="Diproses" />
                    <Bar dataKey="ditolak" fill="#DA00FF" name="Ditolak" />
                    <Bar dataKey="selesai" fill="#9001CB" name="Selesai" />
                    <Bar dataKey="sop" fill="#2E96FF" name="Melebihi SOP" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default BarJmlhPermohonan;

