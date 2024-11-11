
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

// URL untuk komponen Informasi Prosedur
const STATUSES_URL = "api/ProsedurDashboard/informasi";

const TableInformasiProsedur = () => {
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

    return (
        <Box>
            <TableContainer component={Paper} sx={{ maxHeight: 300, borderRadius: "15px" }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    <TableCell>Nama Prosedur</TableCell>
                    <TableCell>Nama Penanggung Jawab</TableCell>
                    <TableCell>Jumlah Layanan</TableCell>
                    <TableCell>Rerata Waktu Eksekusi</TableCell>
                    <TableCell>Jumlah Permohonan Diproses</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.namaProsedur}</TableCell>
                        <TableCell>{item.namaPenanggungJawab}</TableCell>
                        <TableCell>{item.jumlahLayanan}</TableCell>
                        <TableCell>{item.rerata}</TableCell>
                        <TableCell>{item.jumlahPermohonan}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TableInformasiProsedur;