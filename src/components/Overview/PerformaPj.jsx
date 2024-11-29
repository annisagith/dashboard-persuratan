// import { BarChart } from '@mui/x-charts/BarChart';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip} from "recharts";
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
        <Box>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                    data={dataset}
                    layout="vertical"
                    margin={{ left: 160, right: 20 }}
                    >
                    <XAxis type="number" />
                    <YAxis
                        type="category" // Sumbu Y berupa kategori
                        dataKey="nama"
                        tick={{
                        angle: 0, // Rotasi label
                        fontSize: 10, // Ukuran font
                        textAnchor: "end",
                        width:300,
                        fill: '#ffffff', 
                        }}
                        interval={0} // Menampilkan semua label
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px", color: "#fff" }} // Warna latar tooltip
                        itemStyle={{ color: "#fff" }} // Warna teks item tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // Warna saat kursor hover di batang
                    />
                    <Legend 
                        verticalAlign="top" 
                        height={36}
                        iconType="rect"
                        formatter={() => 'Rerata Hari Pengerjaan Prosedur'}
                        />
                    <Bar dataKey="rerata" fill="#02b2af" label={{ position: "right" }} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )

}

export default PerformaPj;