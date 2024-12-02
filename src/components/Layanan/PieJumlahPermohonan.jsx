import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import CircularProgress from '@mui/material/CircularProgress';

// URL untuk komponen Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur 
const URL = "api/LayananDashboard/kategori/jumlah-permohonan";

const PieJumlahPermohonan = () => {
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

    // Format the chart data
    const colors = ['#1F94FF', '#07DBFA', '#6FD195', '#7086FD', '#988AFC', '#FFAE4C', '#FF9066'];

    const chartData = data.map((item, index) => ({
        value: item.jumlahPermohonan,  // Mengambil 'jumlahPermohonan' dari API
        label: item.namaKategori,     // Mengambil 'namaKategori' dari API
        color: colors[index % colors.length], // Warna diambil berdasarkan indeks
    }));
    
    return (
        <Box>
            <PieChart
                series={[{ 
                    data: chartData,
                    innerRadius: 50,
                 }]}
                width={400}
                height={300}
                slotProps={{ legend: { hidden: true } }} // Hides the legend
            />
        </Box>
    );
}

export default PieJumlahPermohonan;
