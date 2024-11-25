import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; 
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

// URL untuk komponen map
const URL = 'api/Overview/map'

const GeographyChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
        );
    }

      
    return (
        <Box 
            sx={{ 
                height: "310px", // Sesuaikan dengan tinggi box yang diinginkan
                width: "100%",  // Lebar mengikuti kontainer
                borderRadius: "20px", 
                overflow: "hidden" 
            }}
        >
            <MapContainer 
                center={[-2.5, 118]} 
                zoom={5} 
                style={{ height: "100%", width: "100%" }} 
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data.map(wilayah => (
                    <Marker key={wilayah.provinsi} position={[wilayah.latitude, wilayah.longitude]}>
                        <Popup>
                            <div>
                                <h4>{wilayah.namaWilayah}</h4>
                                <p>Total Permohonan: {wilayah.totalPermohonan || '0'}</p>
                                <p>Permohonan Diproses: {wilayah.totalPermohonanDiproses || '0'}</p>
                                <p>Permohonan Selesai: {wilayah.totalPermohonanSelesai || '0'}</p>
                                <p>Total Kantor: {wilayah.totalKantor || '0'}</p>
                                <p>Total Admin: {wilayah.totalAdmin || '0'}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
}

export default GeographyChart; 