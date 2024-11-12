import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Autocomplete, TextField} from "@mui/material";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

// URL untuk komponen Informasi Kantor
const URL = "api/WilayahDashboard/kantor";

const InformasiKantor = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWilayah, setSelectedWilayah] = useState("Pusat");

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
    const selectedWilayahData = data.find(item => item.namaWilayah === selectedWilayah);
    const chartData = selectedWilayahData ? selectedWilayahData.kantors.map(kantor => ({
        kantor: kantor.nama,           // Nama kantor sebagai x-axis
        email: kantor.email,
        telpon: kantor.telp,
        permohonan: kantor.jumlahPermohonan,
        waktu: kantor.rerataKantor,
        layanan: kantor.namaLayanan,
        admin: kantor.jumlahAdmin,
    })) : [];

    // Pilihan wilayah untuk Autocomplete
    const wilayahOptions = data.map(item => item.namaWilayah);

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" mr={2}>
                    Analisis Performa Kantor Wilayah: {selectedWilayah}
                </Typography>
                {/* Autocomplete untuk memilih wilayah */}
                <Autocomplete
                    disablePortal
                    options={wilayahOptions}
                    value={selectedWilayah}
                    onChange={(event, newValue) => setSelectedWilayah(newValue)}
                    sx={{ width: 300, ml: 'auto'  }}
                    renderInput={(params) => <TextField {...params} label="Wilayah" />}
                />
            </Box>
            <Box>
                <TableContainer component={Paper} sx={{ maxHeight: 300, borderRadius: "15px" }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Nama Kantor</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Telpon Kantor</TableCell>
                        <TableCell>Jumlah Permohonan</TableCell>
                        <TableCell>Waktu Eksekusi Rata-Rata</TableCell>
                        <TableCell>Jumlah Admin</TableCell>
                        <TableCell>Layanan Terpopuler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chartData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.kantor}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.telp}</TableCell>
                            <TableCell>{item.permohonan}</TableCell>
                            <TableCell>{item.admin}</TableCell>
                            <TableCell>{item.layanan}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )

}
export default InformasiKantor;