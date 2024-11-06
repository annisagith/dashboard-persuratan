/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Membuat konteks untuk autentikasi
const AuthContext = createContext({});

// Membuat provider untuk konteks autentikasi
export const AuthProvider = ({ children }) => {
    // Menginisialisasi state "auth" untuk menyimpan data autentikasi pengguna
    const [auth, setAuth] = useState({});

    // Mengembalikan provider yang menyediakan nilai state "auth" dan fungsi "setAuth" untuk mengubahnya
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children} {/* Komponen "children" yang dibungkus oleh AuthProvider akan mendapatkan akses ke context ini */}
        </AuthContext.Provider>
    );
}

export default AuthContext;
