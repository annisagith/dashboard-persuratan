import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Membuat custom hook useAuth untuk memudahkan akses konteks autentikasi
const useAuth = () => {
    // Mengambil dan mengembalikan seluruh data dari AuthContext
    return useContext(AuthContext);
}

export default useAuth;
