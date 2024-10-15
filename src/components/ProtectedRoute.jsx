/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Sesuaikan dengan path yang benar

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth(); // Mengambil data auth

    // Periksa apakah token atau username ada dalam auth
    const isAuthenticated = auth?.token && auth?.username_akun && auth?.nama_admin;

    // Jika tidak terautentikasi, redirect ke halaman login
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    // Jika terautentikasi, render children (komponen yang dilindungi)
    return children;
};
export default ProtectedRoute;
