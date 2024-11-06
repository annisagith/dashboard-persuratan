import axios from 'axios';

// Mendefinisikan URL dasar untuk API
const BASE_URL = 'https://trackingberkas-abcedvfqa7fqesc5.southeastasia-01.azurewebsites.net';

// Membuat instance axios umum dengan baseURL API yang telah ditetapkan
export default axios.create({
    baseURL: BASE_URL // URL dasar yang akan digunakan untuk semua request
});

// Membuat instance axios khusus untuk permintaan yang memerlukan kredensial
export const axiosPrivate = axios.create({
    baseURL: BASE_URL, // URL dasar yang sama seperti di atas
    headers: { 'Content-Type': 'application/json' }, // Menetapkan tipe konten sebagai JSON
    withCredentials: true // Mengaktifkan pengiriman kredensial (cookies, auth headers)
});
