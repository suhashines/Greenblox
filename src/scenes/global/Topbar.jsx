import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auditorActions, communityMemberActions, investorActions, projectDeveloperActions } from "../../store";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuditorLoggedIn = useSelector((state) => state.auditor.isLoggedIn);
  const isInvestorLoggedIn = useSelector((state) => state.investor.isLoggedIn);
  const isProjectDeveloperLoggedIn = useSelector((state) => state.projectDeveloper.isLoggedIn);
  const isCommunityMemberLoggedIn = useSelector((state) => state.communityMember.isLoggedIn);

  const handleLogout = () => {
    if(isAuditorLoggedIn) {
      dispatch(auditorActions.logout());
      localStorage.removeItem("auditorId");
    } else if(isInvestorLoggedIn) {
      dispatch(investorActions.logout());
      localStorage.removeItem("investorId");
    } else if(isProjectDeveloperLoggedIn) {
      dispatch(projectDeveloperActions.logout());
      localStorage.removeItem("projectDeveloperId");
    } else if(isCommunityMemberLoggedIn) {
      dispatch(communityMemberActions.logout());
      localStorage.removeItem("communityMemberId");
    }
    navigate("/");
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
