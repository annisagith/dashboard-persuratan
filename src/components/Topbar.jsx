import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme/theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box className="topbar-component" sx={{ alignItems: 'center', padding: '0 20px', height: '40px' }}>
        <Typography variant="h4" color={colors.primary.main} fontWeight="bold">DASHBOARD</Typography>
        <Box display="flex" >
            <IconButton onClick={colorMode.toggleColorMode}>
              {
                theme.palette.mode == "dark" ? (
                  <LightModeOutlinedIcon/>
                ) : (
                  <DarkModeOutlinedIcon/>
                )
              }
            </IconButton>
        </Box>
    </Box>
  );
};

export default Topbar;
