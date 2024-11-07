// import { useState } from "react";
import { Layout } from 'antd';
import MenuList from '../MenuList';
import { tokens } from "../../theme/theme";
import { useTheme } from '@mui/material';
import { useState } from 'react';
import {Box, IconButton, Typography} from '@mui/material';

const {Sider} = Layout;

const SidebarComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <Layout >
            <Sider 
                className = 'sidebar'
                collapsed={isCollapsed}
                collapsible
                trigger={null}
                style={{ backgroundColor: colors.sidebar.main }}
                >
                <Box
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{ margin: "50px 0 0 0"}}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {isCollapsed ? (
                        <img 
                            src="/logoatrbpn.png" 
                            alt="Logo" 
                            style={{ width: "40px", height: "auto"}} 
                        />
                    ) : (
                        <Box
                            display="flex"
                       >
                            <IconButton
                            >
                                <img 
                                    src="/logoatrbpn.png" 
                                    alt="Logo" 
                                    style={{ width: "40px", height: "auto"}} 
                                />
                            </IconButton>
                            <Typography variant="h7" color="#fff">
                                DASHBOARD MONITORING
                                SISTEM PEMBERKASAN 
                                ATR/BPN
                            </Typography>
                        </Box>
                    )}
                </Box>
                <MenuList />
            </Sider>
        </Layout>
    );
};

export default SidebarComponent;
