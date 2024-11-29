import { BarChart } from "@mui/x-charts/BarChart";
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
        x: kantor.nama,           // Nama kantor sebagai x-axis
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
                    sx={{ width: 300, ml: 'auto'  }}
                    renderInput={(params) => <TextField {...params} label="Wilayah" />}
                />
            </Box>
            
            {/* BarChart untuk menampilkan data kantor */}
            <BarChart
                dataset={chartData}
                xAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'x', 
                    tickPlacement: "middle",
                    tickLabelStyle: {
                        angle: -10,
                        textAnchor: 'end',
                        fontSize: 10,
                    },
                }]}
                series={[
                    {
                        dataKey: 'diajukan',
                        label: 'Diajukan',
                        stack: 'stack1',
                    },
                    {
                        dataKey: 'diproses',
                        label: 'Diproses',
                        stack: 'stack1',
                    },
                    {
                        dataKey: 'selesai',
                        label: 'Selesai',
                        stack: 'stack1',
                    },
                    {
                        dataKey: 'melebihiSOP',
                        label: 'Melebihi SOP',
                        stack: 'stack1',
                    },
                    {
                        dataKey: 'ditolak',
                        label: 'Ditolak',
                        stack: 'stack1',
                    }
                ]}
                width={1000}
                height={300}
                margin={{ bottom: 80 }}
                />
        </Box>
    );
}

export default PerformaKantor;
