
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Table, Box, TableContainer, TableHead, TableBody, TableRow, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";


// URL untuk komponen Data Permohonan
const URL = "api/PermohonanDashboard";

const getStatusColor = (status) => {
    switch (status) {
        case 'Diajukan':
            return '#F3B31A'; // Kuning
        case 'Diproses':
            return '#2196F3'; // Biru
        case 'Ditolak':
            return '#F44336'; // Merah
        case 'Selesai':
            return '#4CAF50'; // Hijau
        case 'Melebihi SOP':
            return '#FF5722'; // Oranye
        default:
            return '#9E9E9E'; // Abu-abu untuk status tidak dikenal
    }
};


const DataPermohonan = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // State untuk menyimpan nilai filter
    const [selectedLayanan, setSelectedLayanan] = useState("");
    const [selectedKantor, setSelectedKantor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedPosisi, setSelectedPosisi] = useState("");

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
    const kantors = [...new Set(data.map(item => item.namaKantor))];
    const statuss = [...new Set(data.map(item => item.status))];
    const states = [...new Set(data.map(item => item.stateSaatIni))];
    const posisis = [...new Set(data.map(item => item.pjSaatIni))];

     // Handler untuk perubahan filter
     const handleLayananChange = (event) => {
        setSelectedLayanan(event.target.value);
    }
    
    const handleKantorChange = (event) => {
        setSelectedKantor(event.target.value);
    }

     const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    }
    
    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    }

     const handlePosisiChange = (event) => {
        setSelectedPosisi(event.target.value);
    }
    
    // Filter data berdasarkan filter yang dipilih
    const filteredData = data.filter((row) => {
        return (
            (selectedLayanan === "" || row.namaLayanan === selectedLayanan) &&
            (selectedKantor === "" || row.namaKantor === selectedKantor) &&
            (selectedStatus === "" || row.status === selectedStatus) &&
            (selectedState === "" || row.stateSaatIni === selectedState) &&
            (selectedPosisi === "" || row.pjSaatIni === selectedPosisi)
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
                            <TableCell>No.Permohonan</TableCell>
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
                            <TableCell align="right">
                                <FormControl variant="standard" sx={{ minWidth: 95, marginLeft: 1 }}>
                                    <InputLabel id="kantor-select-label" shrink>Kantor</InputLabel>
                                    <Select
                                        labelId="kantor-select-label"
                                        value={selectedKantor}
                                        onChange={handleKantorChange}
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
                            <TableCell>Telp. Pemohon</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Estimasi</TableCell>
                            <TableCell align="right">
                                <FormControl variant="standard" sx={{ minWidth: 95, marginLeft: 1 }}>
                                    <InputLabel id="status-select-label" shrink>Status</InputLabel>
                                    <Select
                                        labelId="status-select-label"
                                        value={selectedStatus}
                                        onChange={handleStatusChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        {statuss.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="right">
                                <FormControl variant="standard" sx={{ minWidth: 95, marginLeft: 1 }}>
                                    <InputLabel id="state-select-label" shrink>Prosedur saat ini</InputLabel>
                                    <Select
                                        labelId="state-select-label"
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        {states.map((state) => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align="right">
                                <FormControl variant="standard" sx={{ minWidth: 95, marginLeft: 1 }}>
                                    <InputLabel id="posisi-select-label" shrink>Penanggung Jawab</InputLabel>
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
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                        <TableRow key={row.noPermohonan} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.noPermohonan}
                            </TableCell>
                            <TableCell>{row.namaLayanan}</TableCell>
                            <TableCell>{row.namaKantor}</TableCell>
                            <TableCell>{row.telpPemohon}</TableCell>
                            <TableCell>{row.tglPermohonan}</TableCell>
                            <TableCell>{row.estimasiWaktu} hari pengerjaan</TableCell>
                            <TableCell>
                                <Box 
                                    sx={{
                                        display: 'inline-block', // Untuk membatasi ukuran sesuai konten
                                        color: 'white', 
                                        backgroundColor: getStatusColor(row.status), // Warna dinamis berdasarkan status
                                        borderRadius: '8px', // Membuat sudut melengkung
                                        padding: '4px 8px', // Padding internal
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        minWidth: '80px', // Opsional: Atur lebar minimum agar konsisten
                                    }}
                                >
                                    {row.status}
                                </Box>
                            </TableCell>
                            <TableCell>{row.stateSaatIni}</TableCell>
                            <TableCell>{row.pjSaatIni}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}
export default DataPermohonan;