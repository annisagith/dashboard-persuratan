import { BarChart } from '@mui/x-charts/BarChart';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";
import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

// URL untuk komponen Jumlah Prosedur Per Penanggung Jawab
const URL = 'api/PetugasDashboard/penanggung-jawab/jumlah-prosedur'

const ProsedurPj = () => {
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
                setData(response.data);
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
        jmlh_prosedur: item.jumlahProsedur
    }));
    return (
        <Box sx={{ padding: 3 }}>
            <BarChart
                dataset={dataset}
                yAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'nama', 
                }]} // Sumbu Y sebagai kategori
                series={[{ dataKey: 'jmlh_prosedur', label: 'Jumlah Prosedur'}]} // Data seri
                layout="horizontal" // Orientasi horizontal
                width={1000}
                height={400}
                margin={{ left: 400 }}
                />
        </Box>
      );
}
export default ProsedurPj;
