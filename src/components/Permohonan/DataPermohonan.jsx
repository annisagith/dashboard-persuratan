
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

// URL untuk komponen Data Permohonan
const URL = "api/PermohonanDashboard";

const DataPermohonan = () => {
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

    return (
        <Box>
            <TableContainer component={Paper} sx={{ maxHeight: 300, borderRadius: "15px" }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    <TableCell>No.Permohonan</TableCell>
                    <TableCell>Layanan</TableCell>
                    <TableCell>Kantor</TableCell>
                    <TableCell>Telp. Pemohon</TableCell>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Estimasi</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Posisi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.noPermohonan}</TableCell>
                        <TableCell>{item.namaLayanan}</TableCell>
                        <TableCell>{item.namaKantor}</TableCell>
                        <TableCell>{item.telpPemohon}</TableCell>
                        <TableCell>{item.tglPermohonan}</TableCell>
                        <TableCell>{item.estimasiWaktu}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.stateSaatIni}</TableCell>
                        <TableCell>{item.pjSaatIni}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}
export default DataPermohonan;