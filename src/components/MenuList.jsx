import { Menu } from "antd";
import DashboardIcon from '@mui/icons-material/Dashboard'; //icon untuk menu overview
import ContactMailIcon from '@mui/icons-material/ContactMail'; //icon untuk menu permohonan
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; //icon untuk admin
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'; //icon untuk layanan
import MapIcon from '@mui/icons-material/Map'; //icon untuk wilayah
import ListAltIcon from '@mui/icons-material/ListAlt'; //icon untuk prosedur
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
// import { useTheme } from "@mui/material";
// import { tokens } from "../theme/theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const navigate = useNavigate();
    const isSelected = selected === to; // Mengecek apakah item ini terpilih
    
    return {
        key: title,
        icon: React.cloneElement(icon, { style: { color: isSelected ? '#000000' : '#ffffff' } }), // Ubah warna ikon
        label: (
            <Typography variant="h6" sx={{ color: isSelected ? '#000000' : '#ffffff' }}>
                {title}
            </Typography>
        ),
        onClick: () => {
            setSelected(to); // Set selected berdasarkan URL
            navigate(to);
        },
        style: {
            backgroundColor: isSelected ? "#F3B31A" : "transparent", // Ganti background jika terpilih

        },
    };
};

const MenuList = () => {
    const location = useLocation(); // Mengambil URL saat ini
    const [selected, setSelected] = useState(location.pathname); // Inisialisasi `selected` sesuai halaman saat ini

    // Update `selected` saat URL berubah
    useEffect(() => {
        setSelected(location.pathname);
    }, [location]);

    const menuItems = [
        Item({
            title: "Overview",
            to: "/overview",
            icon: <DashboardIcon />,
            selected,
            setSelected,
        }),
        Item({
            title: "Permohonan",
            to: "/permohonan",
            icon: <ContactMailIcon />,
            selected,
            setSelected,
        }),
        Item({
            title: "Admin/Petugas",
            to: "/admin",
            icon: <SupportAgentIcon />,
            selected,
            setSelected,
        }),
        Item({
            title: "Layanan",
            to: "/layanan",
            icon: <MiscellaneousServicesIcon />,
            selected,
            setSelected,
        }),
        Item({
            title: "Wilayah",
            to: "/wilayah",
            icon: <MapIcon />,
            selected,
            setSelected,
        }),
        Item({
            title: "Prosedur",
            to: "/prosedur",
            icon: <ListAltIcon style={{ color: "#ffffff" }} />,
            selected,
            setSelected,
        }),
    ];

    return (
        <Menu
            mode="inline"
            className="menu-bar"
            style={{ backgroundColor: "transparent" }}
            items={menuItems}
        />
    );
};

export default MenuList;
