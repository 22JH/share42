import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function UserHomeSpeedDial() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: 320,
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        icon={
          <SpeedDialIcon sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: '#FFABAB',
          }}/>
        }
        onClick={() => navigate("/user/share-category")}
      ></SpeedDial>
    </Box>
  );
}

export default UserHomeSpeedDial;
