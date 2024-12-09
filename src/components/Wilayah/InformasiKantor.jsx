import axios from '../../api/axios';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from "react";
import { TextField, Autocomplete, Typography, Table, Box, TableContainer, TableHead, TableBody, TableRow, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";

// URL untuk komponen Informasi Kantor
const URL = "api/WilayahDashboard/kantor";

const InformasiKantor = () => {
    // State untuk menyimpan data API
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State untuk menyimpan nilai filter
    const [selectedWilayah, setSelectedWilayah] = useState("Wilayah Provinsi Jawa Timur");
    const [selectedKantor, setSelectedKantor] = useState("");
    const [selectedLayanan, setSelectedLayanan] = useState("");

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

     // Mendapatkan daftar unik wilayah, kantor, dan layanan
     const wilayahOptions = data.map(item => item.namaWilayah);
     const selectedWilayahData = data.find(item => item.namaWilayah === selectedWilayah);
     const kantors = selectedWilayahData ? selectedWilayahData.kantors.map(kantor => kantor.nama) : [];
     const layanans = selectedWilayahData ? [...new Set(selectedWilayahData.kantors.map(kantor => kantor.namaLayanan))] : [];
 
     // Membuat data tabel berdasarkan filter
     const filteredData = selectedWilayahData
         ? selectedWilayahData.kantors.filter(kantor => {
             return (
                 (selectedKantor === "" || kantor.nama === selectedKantor) &&
                 (selectedLayanan === "" || kantor.namaLayanan === selectedLayanan)
             );
         })
         : [];

    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" mr={2}>
                    Data Kantor {selectedWilayah}
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
                                <TableCell  >
                                    <FormControl variant="standard" sx={{ minWidth: 150, marginLeft: 1 }}>
                                        <InputLabel id="kantor-select-label" shrink>Kantor</InputLabel>
                                        <Select
                                            labelId="kantor-select-label"
                                            value={selectedKantor}
                                            onChange={(event) => setSelectedKantor(event.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            {kantors.map((kantor) => (
                                                <MenuItem key={kantor} value={kantor}>
                                                    {kantor}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Telpon Kantor</TableCell>
                                <TableCell>Jumlah Permohonan</TableCell>
                                <TableCell>Waktu Eksekusi Rata-Rata</TableCell>
                                <TableCell>Jumlah Admin</TableCell>
                                <TableCell>
                                    <FormControl variant="standard" sx={{ minWidth: 150, marginLeft: 1 }}>
                                        <InputLabel id="layanan-select-label" shrink>Layanan Terpopuler</InputLabel>
                                        <Select
                                            labelId="layanan-select-label"
                                            value={selectedLayanan}
                                            onChange={(event) => setSelectedLayanan(event.target.value)}
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item, index) => (
                            <TableRow key={index}>
                                 <TableCell>{item.nama}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.telp}</TableCell>
                                <TableCell>{item.jumlahPermohonan}</TableCell>
                                <TableCell>{item.rerataKantor}</TableCell>
                                <TableCell>{item.jumlahAdmin}</TableCell>
                                <TableCell>{item.namaLayanan}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>
    )

}
export default InformasiKantor;