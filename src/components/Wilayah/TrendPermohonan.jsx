import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Box, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const URL = "api/WilayahDashboard/trend";

const TrendPermohonan = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedWilayah, setSelectedWilayah] = useState("Pusat"); 

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
    
    // Filter data berdasarkan wilayah yang dipilih dan ubah bulan menjadi nama bulan
    const chartData = data
        .filter(item => item.namaWilayah === selectedWilayah && item.bulan !== null)
        .map(item => ({
            ...item,
            bulan: monthNames[item.bulan - 1], // Ubah angka bulan ke nama bulan
        }));

    const wilayahOptions = Array.from(new Set(data.map(item => item.namaWilayah)));

    // Ambil tahun unik dari data yang sudah difilter
    const uniqueYears = Array.from(new Set(chartData.map(item => item.tahun)));

    // Membuat struktur data yang terhubung untuk semua bulan yang muncul
    const months = monthNames.map(month => ({ bulan: month }));
    
    // Contoh dengan lima warna
    const colors = ['#FFAE4C', '#6FD195', '#7086FD', '#1F94FF','#988AFC', '#07DBFA', '#FF9066', "#C3A5F3", "#FF6B6B"];

    // Tambahkan data permohonan per tahun ke objek bulan, jika data ada untuk bulan tersebut
    uniqueYears.forEach(year => {
        months.forEach(monthObj => {
            const foundItem = chartData.find(item => item.bulan === monthObj.bulan && item.tahun === year);
            monthObj[`permohonan_${year}`] = foundItem ? foundItem.jumlahPermohonan : 0; // 0 jika tidak ada data
        });
    });

    return (
        <Box>
            <Box sx = {{ display: "flex", alignItems: "center"}}>
                <Typography>
                    Trend Jumlah Permohonan Wilayah {selectedWilayah}
                </Typography>
                <Autocomplete
                    disablePortal
                    options={wilayahOptions}
                    value={selectedWilayah}
                    onChange={(event, newValue) => setSelectedWilayah(newValue)}
                    sx={{ width: 300, ml: 'auto' }}
                    renderInput={(params) => <TextField {...params} label="Wilayah" />}
                />
            </Box>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={months}>
                    <defs>
                        {/* Tambahkan linearGradient untuk setiap tahun */}
                        {uniqueYears.map((year, index) => (
                        <linearGradient
                            key={`colorGradient_${year}`}
                            id={`colorGradient_${year}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                            offset="5%"
                            stopColor={colors[index % colors.length]}
                            stopOpacity={0.8}
                            />
                            <stop
                            offset="95%"
                            stopColor={colors[index % colors.length]}
                            stopOpacity={0}
                            />
                        </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px", color: "#fff" }} // Warna latar tooltip
                        itemStyle={{ color: "#fff" }} // Warna teks item tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // Warna saat kursor hover di batang
                    />
                    <Legend />
                    {/* Buat Line untuk setiap tahun unik dengan data yang terpisah */}
                    {uniqueYears.map((year, index) => (
                        <Area 
                            key={year}
                            type="monotone" 
                            dataKey={`permohonan_${year}`} // dataKey yang unik per tahun
                            stroke={colors[index % colors.length]} // Pilih warna berdasarkan index dan jumlah warna
                            name={`Permohonan ${year}`} // Nama sesuai tahun di legend
                            fillOpacity={1} 
                            fill={`url(#colorGradient_${year})`} // Isi dengan gradient yang sesuai
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default TrendPermohonan;
