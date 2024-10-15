import { useEffect, useState } from 'react';
import axios from 'axios';

const PermohonanComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://trackingberkas-abcedvfqa7fqesc5.southeastasia-01.azurewebsites.net/api/Permohonan');
        // Access the 'data' array from the response
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Permohonan Details</h2>
      {data.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Nomor Permohonan:</strong> {item.nomorPermohonan}</p>
          <p><strong>Pemohon ID:</strong> {item.pemohonId}</p>
          <p><strong>Pemohon Nama:</strong> {item.pemohonNama}</p>
          <p><strong>Layanan ID:</strong> {item.layananId}</p>
          <p><strong>Layanan Nama:</strong> {item.layananNama}</p>
          <p><strong>Kantor ID:</strong> {item.kantorId}</p>
          <p><strong>Kantor Nama:</strong> {item.kantorNama}</p>
        </div>
      ))}
    </div>
  );
};

export default PermohonanComponent;
