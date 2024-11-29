import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";

// URL untuk komponen Analisis Performa Kantor 
const URL = "api/WilayahDashboard/performa";

const PerformaKantor = () => {
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
                console.log(response); // Log respons dari API untuk memeriksa datanya
                setData(response.data.data); // Akses ke 'data' dari respons API
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

    // Mengambil data kantor berdasarkan wilayah yang dipilih
    const selectedWilayahData = data.find(item => item.namaWilayah === selectedWilayah);
    const chartData = selectedWilayahData ? selectedWilayahData.kantors.map(kantor => ({
        nama: kantor.nama,           // Nama kantor sebagai x-axis
        diajukan: kantor.diajukan,
        diproses: kantor.diproses,
        selesai: kantor.selesai,
        melebihiSOP: kantor.melebihiSOP,
        ditolak: kantor.ditolak,
    })) : [];

    // Pilihan wilayah untuk Autocomplete
    const wilayahOptions = data.map(item => item.namaWilayah);

    return (
        <Box>
            {/* Autocomplete untuk memilih wilayah */}
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" mr={2}>
                    Analisis Performa Kantor {selectedWilayah}
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
            
            {/* BarChart untuk menampilkan data kantor */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20}}>
                    <XAxis 
                        dataKey="nama" 
                        textAnchor="middle" 
                        tick={{ 
                            fontSize: 12,
                            fill: '#ffffff', 
                            }}
                    />
                    <YAxis />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px", color: "#fff" }} // Warna latar tooltip
                        itemStyle={{ color: "#fff" }} // Warna teks item tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // Warna saat kursor hover di batang
                    />
                    <Legend />
                    <Bar dataKey="diajukan" fill="#02B2AF" name="Diajukan" stackId="a"/>
                    <Bar dataKey="diproses" fill="#72CCFF" name="Diproses" stackId="a"/>
                    <Bar dataKey="selesai" fill="#DA00FF" name="Selesai" stackId="a"/>
                    <Bar dataKey="melebihiSOP" fill="#9001CB" name="Melebihi SOP" stackId="a"/>
                    <Bar dataKey="ditolak" fill="#2E96FF" name="Ditolak" stackId="a"/>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default PerformaKantor;
