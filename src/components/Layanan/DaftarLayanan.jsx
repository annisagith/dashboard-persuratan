import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography} from "@mui/material";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

// URL untuk komponen Daftar Layanan
const URL = "api/LayananDashboard/daftar";

const DaftarLayanan = () => {
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

    // Mengambil data kantor berdasarkan wilayah yang dipilih
    const chartData = data.map(item => ({
        layanan: item.namaLayanan,           // Nama kantor sebagai x-axis
        kategori: item.namaKategori,
        permohonan: item.jumlahPermohonan,
        waktu: item.rerataLayanan,
        prosedur: item.prosedurTerlama
    }));

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" mr={2}>
                    Daaftar Layanan
                </Typography>
            </Box>
            <Box>
                <TableContainer component={Paper} sx={{ maxHeight: 300, borderRadius: "15px" }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Layanan</TableCell>
                            <TableCell>Kategori</TableCell>
                            <TableCell>Jumlah Permohonan</TableCell>
                            <TableCell>Rerata Waktu Proses (hari)</TableCell>
                            <TableCell>Prosedur Terlama</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chartData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.layanan}</TableCell>
                            <TableCell>{item.kategori}</TableCell>
                            <TableCell>{item.permohonan}</TableCell>
                            <TableCell>{item.waktu}</TableCell>
                            <TableCell>{item.prosedur}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )

}

export default DaftarLayanan;