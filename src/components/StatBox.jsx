/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
// import { alpha } from '@mui/material/styles';
import { tokens } from "../theme/theme";

const StatBox = ({title, count, icon, increase, subtitle, iconBackground}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Box>
                <Typography
                    variant="h5"
                    sx={{ color: colors.primary.main, whiteSpace: "nowrap"  }}
                >
                    {title}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box  sx={{ flexGrow: 1 }}  >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ color: colors.primary.main, padding: "20px" }}
                    >
                        {count}
                    </Typography>
                </Box>
                <Box sx={{ backgroundColor: iconBackground, borderRadius: "10px", }}>
                    {React.cloneElement(icon, { sx: { fontSize: "50px",   color: colors.primary.main, p: "10px",  } })}
                </Box>
            </Box>

            <Box sx={{ display: "flex",  }}> 
                <Typography
                    variant="h6"
                    fontStyle="italic"
                    sx={{ color: colors.green.main}}
                    >
                    {increase}
                </Typography>
                <Typography
                    variant="h6"
                    fontStyle="lighter"
                    sx={{ color: colors.lightGrey.main, padding: "0 5px", whiteSpace: "nowrap"}}
                    >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
}

export default StatBox;