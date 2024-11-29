
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Table, Box, TableContainer, TableHead, TableBody, TableRow, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";

// URL untuk komponen Informasi Prosedur
const STATUSES_URL = "api/ProsedurDashboard/informasi";

const TableInformasiProsedur = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // State untuk menyimpan nilai filter
    const [selectedProsedur, setSelectedProsedur] = useState("");
    const [selectedPj, setSelectedPj] = useState("");

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

    // Mendapatkan daftar unik jenis layanan, kantor, status, state, dan posisi dari data JSON
    const prosedurs = [...new Set(data.map(item => item.namaProsedur))];
    const pjs = [...new Set(data.map(item => item.namaPenanggungJawab))];

     // Handler untuk perubahan filter
     const handleProsedurChange = (event) => {
        setSelectedProsedur(event.target.value);
    }
    
    const handlePjChange = (event) => {
        setSelectedPj(event.target.value);
    }

     // Filter data berdasarkan filter yang dipilih
     const filteredData = data.filter((row) => {
        return (
            (selectedProsedur === "" || row.namaProsedur     === selectedProsedur) &&
            (selectedPj === "" || row.namaPenanggungJawab === selectedPj) 
        )
    })

    return (
        <Box>
            <Paper sx={{ width: '100%', backgroundColor: "transparent", borderRadius: "15px" }}>
                <TableContainer
                    sx={{ 
                        maxHeight: 400, 
                        borderRadius: "15px",
                        scrollbarWidth: "none", // Menyembunyikan scrollbar (untuk Firefox)
                        '&::-webkit-scrollbar': {
                            display: "none" // Menyembunyikan scrollbar (untuk Chrome, Edge, Safari) 
                            }
                        }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            <TableCell>
                                    <FormControl variant="standard" sx={{ minWidth: 200, marginLeft: 1 }}>
                                        <InputLabel id="prosedur-select-label" shrink>Prosedur</InputLabel>
                                        <Select
                                            labelId="prosedur-select-label"
                                            value={selectedProsedur}
                                            onChange={handleProsedurChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            {prosedurs.map((prosedur) => (
                                                <MenuItem key={prosedur} value={prosedur}>
                                                    {prosedur}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ minWidth: 250, marginLeft: 1 }}>
                                        <InputLabel id="pj-select-label" shrink>Penanggung Jawab</InputLabel>
                                        <Select
                                            labelId="pj-select-label"
                                            value={selectedPj}
                                            onChange={handlePjChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            {pjs.map((pj) => (
                                                <MenuItem key={pj} value={pj}>
                                                    {pj}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>Jumlah Layanan</TableCell>
                                <TableCell>Rerata Waktu Eksekusi</TableCell>
                                <TableCell>Jumlah Permohonan Diproses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.namaProsedur}</TableCell>
                                <TableCell>{item.namaPenanggungJawab}</TableCell>
                                <TableCell>{item.jumlahLayanan} layanan</TableCell>
                                <TableCell>{item.rerata} hari</TableCell>
                                <TableCell>{item.jumlahPermohonan} permohonan</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default TableInformasiProsedur;