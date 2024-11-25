import { useState } from "react";
import {Table, Box, TableContainer, TableHead, TableBody, TableRow, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from "react";

// URL API untuk komponen Ringkasan Permohonan
const URL = 'api/Overview/ringkasan';


const AppSummary = () => {
    // State untuk menyimpan data API
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // State untuk menyimpan nilai filter
    const [selectedLayanan, setSelectedLayanan] = useState("");
    const [selectedPosisi, setSelectedPosisi] = useState("");

    //Menangkap data dari api
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

    // Mendapatkan daftar unik jenis layanan dan status dari data JSON
    const layanans = [...new Set(data.map(item => item.namaLayanan))];
    const posisis = [...new Set(data.map(item => item.namaPenanggungJawab))];

    // Handler untuk perubahan filter
    const handleLayananChange = (event) => {
        setSelectedLayanan(event.target.value);
    }
    

    const handlePosisiChange = (event) => {
        setSelectedPosisi(event.target.value);
    };

    // Filter data berdasarkan filter yang dipilih
    const filteredData = data.filter((row) => {
        return (
            (selectedLayanan === "" || row.namaLayanan === selectedLayanan) &&
            (selectedPosisi === "" || row.namaPenanggungJawab === selectedPosisi)
        );
    });

    return (
        <Box>
            <Paper sx={{ width: '100%', backgroundColor: "transparent", borderRadius: "15px" }}>
                <TableContainer 
                    sx={{ 
                        maxHeight: 240, 
                        borderRadius: "15px",
                        scrollbarWidth: "none", // Menyembunyikan scrollbar (untuk Firefox)
                        '&::-webkit-scrollbar': {
                            display: "none" // Menyembunyikan scrollbar (untuk Chrome, Edge, Safari) 
                            }
                        }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nomor Permohonan</TableCell>
                                <TableCell align="right">
                                    <FormControl variant="standard" sx={{ minWidth: 95, marginLeft: 1 }}>
                                        <InputLabel id="layanan-select-label" shrink>Layanan</InputLabel>
                                        <Select
                                            labelId="layanan-select-label"
                                            value={selectedLayanan}
                                            onChange={handleLayananChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            {layanans.map((layanan) => (
                                                <MenuItem key={layanan} value={layanan}>
                                                    {layanan}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="right">Tenggat</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                        <FormControl variant="standard" sx={{ minWidth: 120, marginLeft: 1 }}>
                                            <InputLabel id="posisi-select-label" shrink>Posisi</InputLabel>
                                            <Select
                                                labelId="posisi-select-label"
                                                value={selectedPosisi}
                                                onChange={handlePosisiChange}
                                                displayEmpty
                                            >
                                                <MenuItem value="">
                                                    <em>All</em>
                                                </MenuItem>
                                                {posisis.map((posisi) => (
                                                    <MenuItem key={posisi} value={posisi}>
                                                        {posisi}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ border: 'none' }}>
                            {filteredData.map((row) => (
                                <TableRow key={row.noPermohonan} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.noPermohonan}
                                    </TableCell>
                                    <TableCell align="right">{row.namaLayanan}</TableCell>
                                    <TableCell align="right">{row.statusHari}</TableCell>
                                    <TableCell align="right">{row.namaPenanggungJawab}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default AppSummary;
