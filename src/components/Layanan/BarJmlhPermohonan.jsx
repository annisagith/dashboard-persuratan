import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import CircularProgress from '@mui/material/CircularProgress';

// URL untuk komponen Perbandingan Jumlah Permohonan Berdasarkan Status Permohonan Untuk Tiap Kategori
const URL = "api/LayananDashboard/kategori/status";

const BarJmlhPermohonan = () => {
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
        <BarChart
            dataset={chartData}
            xAxis={[{ 
                scaleType: 'band',  
                dataKey: 'kategori', 
                tickLabelStyle: {
                angle: 10,
                textAnchor: 'start',
                fontSize: 10,
            },}]}
            series={[
                {
                    dataKey: 'diajukan', // Key untuk data seri pertama
                    label: 'Diajukan',
                },
                {
                    dataKey: 'diproses', // Key untuk data seri kedua
                    label: 'Diproses',
                },
                {
                    dataKey: 'ditolak', // Key untuk data seri ketiga
                    label: 'Ditolak',
                },
                {
                    dataKey: 'selesai', // Key untuk data seri ketiga
                    label: 'Selesai',
                },
                {
                    dataKey: 'sop', // Key untuk data seri ketiga
                    label: 'Melebihi SOP',
                }
            ]}
            width={1000}
            height={300}
            />
      );
}

export default BarJmlhPermohonan;