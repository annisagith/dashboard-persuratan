import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const URL = 'api/PermohonanDashboard/trend';

const TrendPermohonan = () => {
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
                setData(response.data.data);
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

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //  ubah bulan menjadi nama bulan
    const chartData = data
        .map(item => ({
            ...item,
            bulan: monthNames[item.bulan - 1], // Ubah angka bulan ke nama bulan
        }));
    
    // Ambil tahun unik dari data yang sudah difilter
    const uniqueYears = Array.from(new Set(chartData.map(item => item.tahun)));
    
    // Membuat struktur data yang terhubung untuk semua bulan yang muncul
    const months = monthNames.map(month => ({ bulan: month }));

    // Contoh dengan lima warna
    const colors = ["#6FD195", "#FFAE4C", "#7086FD", "#C3A5F3", "#FF6B6B"]; 

    // Tambahkan data permohonan per tahun ke objek bulan, jika data ada untuk bulan tersebut
    uniqueYears.forEach(year => {
        months.forEach(monthObj => {
            const foundItem = chartData.find(item => item.bulan === monthObj.bulan && item.tahun === year);
            monthObj[`permohonan_${year}`] = foundItem ? foundItem.jumlahPermohonan : 0; // 0 jika tidak ada data
        });
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Buat Line untuk setiap tahun unik dengan data yang terpisah */}
                {uniqueYears.map((year, index) => (
                    <Line 
                        key={year}
                        type="monotone" 
                        dataKey={`permohonan_${year}`} // dataKey yang unik per tahun
                        stroke={colors[index % colors.length]} // Pilih warna berdasarkan index dan jumlah warna
                        name={`Permohonan ${year}`} // Nama sesuai tahun di legend
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    )

}
export default TrendPermohonan;