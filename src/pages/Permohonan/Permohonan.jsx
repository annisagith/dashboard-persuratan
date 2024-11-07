import { Box } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";

const Permohonan = () => {
    return (
        <Box display="flex">
        {/* SIDEBAR KOMPONEN */}
        <Sidebar/>
            <Box>
                {/* TOPBAR KOMPONEN */}
                <Topbar/>
                {/* BODY */}
                <Box m="20px">
                    <div>
                        <h1>Wilayah</h1>
                        <p>Ini halaman monitoring wilayah.</p>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default Permohonan;