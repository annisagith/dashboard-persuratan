/* eslint-disable react/prop-types */
import { useState } from "react";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard'; //icon untuk menu overview
import ContactMailIcon from '@mui/icons-material/ContactMail'; //icon untuk menu permohonan
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; //icon untuk admin
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'; //icon untuk layanan
import MapIcon from '@mui/icons-material/Map'; //icon untuk wilayah
import ListAltIcon from '@mui/icons-material/ListAlt'; //icon untuk prosedur

const Item = ({ title, to, icon, selected, setSelected }) => {
    const navigate = useNavigate();
    return (
      <MenuItem
        active={selected === title}
        onClick={() => {
            setSelected(title);
            navigate(to);
        }}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };

const SidebarComponent = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("sidebar");
    
    return (
        <Box 
        sx = {{
            display:"flex",  
            height: "10hv",  // Full height for the viewport
        }}
        >
            <Sidebar 
                className="sidebar-container"
                collapsed={isCollapsed}
                rootStyles={{
                      backgroundColor: 'black'
                  }} >
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{ margin: "50px 0 20px 0" }}
                    >
                        {isCollapsed ? (
                            <img 
                                src="/logoatrbpn.png" 
                                alt="Logo" 
                                style={{ width: "40px", height: "auto" }}
                            />
                        ) : (
                            <Box
                                display="flex"
                                alignItems="center"                            >
                                <IconButton
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                >
                                    <img 
                                        src="/logoatrbpn.png" 
                                        alt="Logo" 
                                        style={{ width: "40px", height: "auto" }} 
                                    />
                                </IconButton>
                                <Typography variant="h7" color="black">
                                    DASHBOARD MONITORING <br/>
                                    SISTEM PEMBERKASAN <br/>
                                    ATR/BPN <br/>
                                </Typography>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "5%"}>
                        <Item
                        title="Overview"
                        to="/overview"
                        icon={<DashboardIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Permohonan"
                        to="/permohonan"
                        icon={<ContactMailIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Admin"
                        to="/admin"
                        icon={<SupportAgentIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Layanan"
                        to="/layanan"
                        icon={<MiscellaneousServicesIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Wilayah"
                        to="/wilayah"
                        icon={<MapIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Prosedur"
                        to="/prosedur"
                        icon={<ListAltIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SidebarComponent;
