import { Box } from "@mui/material";
import Topbar from "../../components/Global/Topbar";
import Sidebar from "../../components/Global/Sidebar";

const Prosedur = () => {
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
                        <h1>Prosedur</h1>
                        <p>Ini halaman monitoring </p>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default Prosedur;
