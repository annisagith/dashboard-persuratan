import { Box, IconButton, Typography, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Correct import for useTheme
import { tokens } from "../theme/theme"; // Adjust the path as necessary
import { useState } from "react";

const SidebarComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); // Assuming tokens is a function returning color tokens
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box 
            sx={{ 
                width: isCollapsed ? '80px' : '250px', 
                bgcolor: colors.sidebar.main // You may want to set a background color
            }}
        >
            <Box collapsed={isCollapsed}>
                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{ margin: "10px 0 20px 0" }}
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
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                        >
                            <Typography variant="h6" color="white">
                            DASHBOAR MONITORING 
                            SISTEM PEMBERKASAN 
                            ATR/BPN 
                            </Typography>
                            <IconButton
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                style={{
                                    margin: "10px 0 40px 0",
                                }}
                            >
                                <img 
                                    src="/logoatrbpn.png" 
                                    alt="Logo" 
                                    style={{ width: "40px", height: "auto" }} 
                                />
                            </IconButton>
                        </Box>
                    )}
                </MenuItem>
            </Box>
        </Box>
    );
};

export default SidebarComponent;
