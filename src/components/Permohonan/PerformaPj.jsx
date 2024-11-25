import { BarChart } from '@mui/x-charts/BarChart';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";
import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

// URL untuk komponen Jumlah Prosedur Per Penanggung Jawab
const URL = 'api/Overview/performa-penanggung-jawab'

const PerformaPj = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(URL, {
                    headers: { 
                        'Authorization': `Bearer ${token}`, // Use backticks for template literal
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

    const dataset = data.map(item => ({
        nama: item.namaPenanggungJawab,
        rerata: item.rerata
    }));

    return(
        <Box >
            <BarChart
                dataset={dataset}
                yAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'nama',
                    label: false
                    }]} // Sumbu Y sebagai kategori
                series={[{ dataKey: 'rerata', label: 'Rata rata waktu proses'}]} // Data seri
                layout="horizontal" // Orientasi horizontal
                width={500}
                height={300}
                margin={{ left: 150 }}
            />
        </Box>
    )

}

export default PerformaPj;