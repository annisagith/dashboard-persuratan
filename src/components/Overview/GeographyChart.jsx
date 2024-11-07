import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; 
// import geojsonProvinsi from './GeoData.geojson';
import permohonan from '../../data/permohonanProv.json'

const GeographyChart = () => {
    const kantorWilayah = [
        { provinsi: "Aceh", position: [4.4821, 96.8320] },
        { provinsi: "Sumatra Utara", position: [3.5952, 98.6722] },
        { provinsi: "Sumatra Barat", position: [-0.9162, 100.4518] },
        { provinsi: "Riau", position: [0.5075, 101.4470] },
        { provinsi: "Jambi", position: [-1.6182, 103.6362] },
        { provinsi: "Sumatra Selatan", position: [-3.3192, 104.6992] },
        { provinsi: "Bengkulu", position: [-3.8001, 102.2642] },
        { provinsi: "Lampung", position: [-4.5900, 105.4043] },
        { provinsi: "DKI Jakarta", position: [-6.2088, 106.8456] },
        { provinsi: "Jawa Barat", position: [-6.8894, 107.6103] },
        { provinsi: "Jawa Tengah", position: [-7.0159, 110.4381] },
        { provinsi: "DI Yogyakarta", position: [-7.7956, 110.3695] },
        { provinsi: "Jawa Timur", position: [-7.2915, 112.6410] },
        { provinsi: "Bali", position: [-8.4095, 115.1889] },
        { provinsi: "Nusa Tenggara Barat", position: [-8.6500, 116.2035] },
        { provinsi: "Nusa Tenggara Timur", position: [-10.2020, 123.6090] },
        { provinsi: "Kalimantan Barat", position: [-0.0508, 109.3188] },
        { provinsi: "Kalimantan Tengah", position: [-2.2876, 113.9213] },
        { provinsi: "Kalimantan Selatan", position: [-3.2942, 114.5904] },
        { provinsi: "Kalimantan Timur", position: [-1.1412, 116.4645] },
        { provinsi: "Kalimantan Utara", position: [3.0491, 117.5095] },
        { provinsi: "Sulawesi Utara", position: [1.5417, 124.8460] },
        { provinsi: "Sulawesi Tengah", position: [-0.8472, 120.8957] },
        { provinsi: "Sulawesi Selatan", position: [-4.6513, 119.6554] },
        { provinsi: "Sulawesi Tenggara", position: [-4.0510, 122.5527] },
        { provinsi: "Gorontalo", position: [0.6554, 123.0558] },
        { provinsi: "Maluku", position: [-3.3190, 128.1937] },
        { provinsi: "Maluku Utara", position: [1.3486, 127.2245] },
        { provinsi: "Papua", position: [-4.2500, 140.7400] },
        { provinsi: "Papua Barat", position: [-1.4060, 134.1820] }
      ];

      const permohonanData = permohonan.reduce((acc, item) => {
        acc[item.provinsi] = item;
        return acc;
    }, {});
      
    return (
        <MapContainer center={[-2.5, 118]} zoom={5} style={{ height: "240px", width: "100%", borderRadius: "20px" }} >
        {/* TileLayer menampilkan latar belakang peta */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" /> */}
        
        {kantorWilayah.map(kantor => (
            <Marker key={kantor.provinsi} position={kantor.position}>
                <Popup>
                    <div>
                    <h4>{kantor.provinsi}</h4>
                    <p>Total Application: {permohonanData[kantor.provinsi]?.total_application || 'Data tidak tersedia'}</p>
                    <p>Application In Progress: {permohonanData[kantor.provinsi]?.application_inprogress || 'Data tidak tersedia'}</p>
                    <p>Completed Application: {permohonanData[kantor.provinsi]?.completed_application || 'Data tidak tersedia'}</p>
                    </div>
                </Popup>
            </Marker>
        ))}
        </MapContainer>
    );
}

export default GeographyChart; 