import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Cookies from "js-cookie";

const URL = "api/LayananDashboard/permohonan/avg-pemrosesan-trends";

const TrendPermohonanLayanan = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedKategori, setSelectedKategori] = useState('Pelayanan Peralihan Hak');
    const [selectedTahun, setSelectedTahun] = useState('2024');
    
    const [kategoriLayanan, setKategoriLayanan] = useState([]);
    const [tahun, setTahun] = useState([]);

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
                setData(response.data.data);
                setLoading(false);
                // Ambil tahun dan kategori unik
                const uniqueYears = Array.from(new Set(response.data.data.map((item) => item.tahun).filter((y) => y)));
                const uniqueCategories = Array.from(new Set(response.data.data.map((item) => item.namaKategori)));
                setTahun(uniqueYears);
                setKategoriLayanan(uniqueCategories);
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

    const colors = ['#FFAE4C', '#6FD195', '#7086FD', '#1F94FF','#988AFC', '#07DBFA', '#FF9066', "#C3A5F3", "#FF6B6B"];

    // Filter data berdasarkan kategori dan tahun
    const filteredData = data.filter(
        (item) =>
        (!selectedKategori || item.namaKategori === selectedKategori) &&
        (!selectedTahun || item.tahun === parseInt(selectedTahun))
    );

    // Format data untuk grafik
    const chartData = [];

    // Membuat struktur data dengan kuartal dan layanan
    filteredData.forEach((item) => {
        const layananIndex = chartData.findIndex((entry) => entry.layanan === item.namaLayanan);

        if (layananIndex === -1) {
            // Tambahkan layanan baru dengan data kuartal yang sesuai
            chartData.push({
                layanan: item.namaLayanan,
                Q1: item.q1,
                Q2: item.q2,
                Q3: item.q3,
                Q4: item.q4
            });
        } else {
            // Update layanan yang sudah ada dengan data kuartal
            chartData[layananIndex].Q1 += item.q1;
            chartData[layananIndex].Q2 += item.q2;
            chartData[layananIndex].Q3 += item.q3;
            chartData[layananIndex].Q4 += item.q4;
        }
    });

    // Membuat data untuk sumbu X (quarter)
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    // Format data untuk setiap layanan
    const formattedDataForChart = quarters.map((quarter) => {
        const result = { quarter };
        chartData.forEach((item) => {
            result[item.layanan] = item[quarter]; // Menambahkan data layanan untuk kuartal terkait
        });
        return result;
    });

    return (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
            <Typography variant="h6">Tren Rata-rata Waktu Pemrosesan Layanan / Hari</Typography>
            <Autocomplete
              disablePortal
              options={tahun}
              value={selectedTahun}
              onChange={(event, newValue) => setSelectedTahun(newValue)}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Pilih Tahun" />}
            />
            <Autocomplete
              disablePortal
              options={kategoriLayanan}
              value={selectedKategori}
              onChange={(event, newValue) => setSelectedKategori(newValue)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Pilih Kategori" />}
            />
          </Box>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={formattedDataForChart}>
              <defs>
                {chartData.map((item, index) => {
                  const gradientId = `colorGradient_${item.layanan
                    .replace(/\s+/g, "_")
                    .replace(/[^a-zA-Z0-9_]/g, "")}`;
                  const gradientColor = colors[index % colors.length] || "#CCCCCC";

                  return (
                    <linearGradient
                      key={gradientId}
                      id={gradientId}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
                    </linearGradient>
                  );
                })}
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px", color: "#fff" }} // Warna latar tooltip
                        itemStyle={{ color: "#fff" }} // Warna teks item tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // Warna saat kursor hover di batang
                    />
              <Legend />
              {chartData.map((item, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={item.layanan}
                  stroke={colors[index % colors.length]}
                  fill={`url(#colorGradient_${item.layanan
                    .replace(/\s+/g, "_")
                    .replace(/[^a-zA-Z0-9_]/g, "")})`}                  
                  fillOpacity={1}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </Box>
    );
};

export default TrendPermohonanLayanan;
