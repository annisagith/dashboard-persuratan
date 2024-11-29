import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Table, Box, TableContainer, TableHead, TableBody, TableRow, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";

// URL untuk komponen Daftar Layanan
const URL = "api/LayananDashboard/daftar";

const DaftarLayanan = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // State untuk menyimpan nilai filter
    const [selectedLayanan, setSelectedLayanan] = useState("");
    const [selectedKategori, setSelectedKategori] = useState("");

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

    // Mendapatkan daftar unik jenis layanan, kantor, status, state, dan posisi dari data JSON
    const layanans = [...new Set(data.map(item => item.namaLayanan))];
    const kategoris = [...new Set(data.map(item => item.namaKategori))];

     // Handler untuk perubahan filter
     const handleLayananChange = (event) => {
        setSelectedLayanan(event.target.value);
    }
    
    const handleKategoriChange = (event) => {
        setSelectedKategori(event.target.value);
    }

    // Mengambil data kantor berdasarkan wilayah yang dipilih
    const chartData = data.map(item => ({
        layanan: item.namaLayanan,           // Nama kantor sebagai x-axis
        kategori: item.namaKategori,
        permohonan: item.jumlahPermohonan,
        waktu: item.rerataLayanan,
        prosedur: item.prosedurTerlama
    }))

     // Filter data berdasarkan filter yang dipilih
     const filteredData = chartData.filter((row) => {
        return (
            (selectedLayanan === "" || row.layanan === selectedLayanan) &&
            (selectedKategori === "" || row.kategori === selectedKategori) 
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
                                    <FormControl variant="standard" sx={{ minWidth: 150, marginLeft: 1 }}>
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
                                <TableCell>
                                    <FormControl variant="standard" sx={{ minWidth: 150, marginLeft: 1 }}>
                                        <InputLabel id="kategori-select-label" shrink>Kategori</InputLabel>
                                        <Select
                                            labelId="kategori-select-label"
                                            value={selectedKategori}
                                            onChange={handleKategoriChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            {kategoris.map((kategori) => (
                                                <MenuItem key={kategori} value={kategori}>
                                                    {kategori}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>Jumlah Permohonan</TableCell>
                                <TableCell>Rerata Waktu Proses (hari)</TableCell>
                                <TableCell>Prosedur Terlama</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.layanan}</TableCell>
                                <TableCell>{item.kategori}</TableCell>
                                <TableCell>{item.permohonan} permohonan</TableCell>
                                <TableCell>{item.waktu} hari</TableCell>
                                <TableCell>{item.prosedur}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}

export default DaftarLayanan;