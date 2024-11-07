import { useState } from "react";
import {Table, Box, TableContainer, TableHead, TableBody, TableRow, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";
import data from '../../data/permohonan.json';


const AppSummary = () => {
    // State untuk menyimpan nilai filter
    const [selectedService, setSelectedService] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    // Mendapatkan daftar unik jenis layanan dan status dari data JSON
    const services = [...new Set(data.map(item => item.type_of_service))];
    const statuses = [...new Set(data.map(item => item.status))];

    // Handler untuk perubahan filter
    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    // Filter data berdasarkan filter yang dipilih
    const filteredData = data.filter((row) => {
        return (
            (selectedService === "" || row.type_of_service === selectedService) &&
            (selectedStatus === "" || row.status === selectedStatus)
        );
    });

    return (
        <Box>
            <Paper sx={{ width: '100%', backgroundColor: "transparent", borderRadius: "15px" }}>
                <TableContainer sx={{ maxHeight: 170, borderRadius: "15px" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Letter Number</TableCell>
                                <TableCell align="right">
                                    <FormControl variant="standard" sx={{ minWidth: 120, marginLeft: 1 }}>
                                        <InputLabel id="service-select-label" shrink>Types Of Services</InputLabel>
                                        <Select
                                            labelId="service-select-label"
                                            value={selectedService}
                                            onChange={handleServiceChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            {services.map((service) => (
                                                <MenuItem key={service} value={service}>
                                                    {service}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="right">Due Date</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                        <FormControl variant="standard" sx={{ minWidth: 120, marginLeft: 1 }}>
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
                                                {statuses.map((status) => (
                                                    <MenuItem key={status} value={status}>
                                                        {status}
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
                                <TableRow key={row.letter_number} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.letter_number}
                                    </TableCell>
                                    <TableCell align="right">{row.type_of_service}</TableCell>
                                    <TableCell align="right">{row.due_date}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
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
