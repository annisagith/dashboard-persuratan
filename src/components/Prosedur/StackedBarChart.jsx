import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie";

// URL untuk komponen Perbandingan Jumlah Permohonan Berdasarkan Status Prosedur 
const STATUSES_URL = "api/ProsedurDashboard/statuses";

const StackedBarChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(STATUSES_URL, {
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

    const chartData = data.map(item => ({
        x: item.namaProsedur,
        antrian: item.totalAntrian,
        diproses: item.totalDiproses, 
        selesai: item.totalSelesai 
    }));

    return (
        <BarChart
        dataset={chartData}
        xAxis={[{ 
            scaleType: 'band', 
            dataKey: 'x', 
            tickPlacement: 'middle',
            tickLabelStyle: {
              angle: -15    ,
              textAnchor: 'end',
              fontSize: 10,
          },
          }]}
          series={[
            {
                dataKey: 'antrian', // Key untuk data seri pertama
                label: 'Antrian',
                stack: 'stack1',
            },
            {
                dataKey: 'diproses', // Key untuk data seri kedua
                label: 'Diproses',
                stack: 'stack1',
            },
            {
                dataKey: 'selesai', // Key untuk data seri ketiga
                label: 'Selesai',
                stack: 'stack1',
            }
        ]}
        width={1000}
        height={400}
        margin={{ bottom: 100 }}
        />
    )
}

export default StackedBarChart;