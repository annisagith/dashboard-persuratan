import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import CircularProgress from '@mui/material/CircularProgress';

// URL untuk komponen Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur 
const URL = "api/Overview/status-permohonan";

const StatusPermohonan = () => {
    const [data, setData] = useState({});
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
                setData(response.data.data); // Assuming the response structure has a `data` object
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

    const colors = ['#07DBFA', '#6FD195', '#FFAE4C', '#988AFC', '#7086FD'];

    // Format the chart data
    const chartData = data.map((item, index) => ({
        id: item.namaStatus,
        value: item.jumlahPermohonan,  // Use the 'jumlahPermohonan' from API response
        label: item.namaStatus,     // Use the 'namaKategori' from API response
        color: colors[index % colors.length] // Warna diambil berdasarkan indeks
    }));

    return (
        <Box
            display="flex" 
            justifyContent="center" 
       
            height="100%" // Mengatur tinggi Box agar mengambil seluruh tinggi tampilan
        >
            <PieChart
                slotProps={{
                    legend: {
                    direction: 'column',
                    position: { vertical: 'middle   ', horizontal: 'right' },
                    itemMarkWidth: 10,
                    itemMarkHeight: 5,
                    markGap: 5,
                    itemGap: 10,
                },
                }}
                series={[
                    {
                    data: chartData,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    }
                ]}
                height={250}
            />
        </Box>
    );
};

export default StatusPermohonan;
