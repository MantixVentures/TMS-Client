import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Paper,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import RuleIcon from "@mui/icons-material/Rule";
import PaymentsIcon from "@mui/icons-material/Payments";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import COLORS from "../utils/Colors";
import profile from "../assets/Drawer/logo.png";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: `linear-gradient(90deg, ${COLORS.bgBlue} 0%, #1a237e 100%)`,
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    background: `linear-gradient(165deg, ${COLORS.bgBlue} 0%, #1a237e 100%)`,
    color: "#fff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const NAVIGATION = [
  {
    kind: "header",
    title: "Main Menu",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    segment: "users",
    title: "User Management",
    icon: <GroupsIcon />,
    children: [
      {
        segment: "police",
        title: "Police Users",
        icon: <SecurityIcon />,
        path: "/user/police",
      },
      {
        segment: "civil",
        title: "Civil Users",
        icon: <PersonOutlineIcon />,
        path: "/user/civil",
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Operations",
  },
  {
    segment: "fines",
    title: "Fine Management",
    icon: <RuleIcon />,
    children: [
      {
        segment: "normal-fines",
        title: "Normal Fines",
        icon: <DescriptionIcon />,
        path: "/fines/normal",
      },
      {
        segment: "court-fines",
        title: "Court Fines",
        icon: <DescriptionIcon />,
        path: "/fines/court",
      },
    ],
  },
  {
    segment: "payment",
    title: "Payment Analytics",
    icon: <PaymentsIcon />,
    path: "/analyze",
  },
  {
    segment: "settings",
    title: "System Settings",
    icon: <SettingsIcon />,
    path: "/add/student",
  },
];

const DrawerPage = () => {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSubmenu, setOpenSubmenu] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSubmenuClick = (itemName) => {
    setOpenSubmenu(openSubmenu === itemName ? "" : itemName);
  };

  const isPathActive = (path) => {
    return location.pathname === path;
  };

  const isSubmenuActive = (children) => {
    return children.some((child) => location.pathname === child.path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open} elevation={0}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              color: "#fff",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            Traffic Management System
          </Typography>
          <IconButton
            sx={{
              mr: 2,
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Badge
              badgeContent={4}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ff4444",
                  color: "#fff",
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              sx={{
                p: 0,
                border: "2px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Avatar
                src={profile}
                sx={{
                  width: 32,
                  height: 32,
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
                "& .MuiMenuItem-root": {
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    "& .MuiListItemIcon-root": {
                      color: COLORS.bgBlue,
                    },
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => navigate("/profile")}
              sx={{
                borderRadius: "8px",
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                borderRadius: "8px",
                mx: 1,
                mt: 0.5,
                color: "#d32f2f",
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                  "& .MuiListItemIcon-root": {
                    color: "#d32f2f",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#d32f2f" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: open ? "space-between" : "center",
              px: 2,
            }}
          >
            {open && (
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                Admin Panel
              </Typography>
            )}
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
        <List component="nav" sx={{ px: 1, py: 1 }}>
          {NAVIGATION.map((item, index) => {
            if (item.kind === "header") {
              return (
                open && (
                  <Typography
                    key={index}
                    variant="overline"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      px: 3,
                      py: 1.5,
                      display: "block",
                    }}
                  >
                    {item.title}
                  </Typography>
                )
              );
            }

            if (item.kind === "divider") {
              return (
                <Divider
                  key={index}
                  sx={{ my: 1, borderColor: "rgba(255,255,255,0.12)" }}
                />
              );
            }

            const hasChildren = item.children && item.children.length > 0;
            const isActive = hasChildren
              ? isSubmenuActive(item.children)
              : isPathActive(item.path);

            return (
              <React.Fragment key={index}>
                <ListItem disablePadding sx={{ mb: hasChildren ? 0 : 1 }}>
                  <ListItemButton
                    onClick={() =>
                      hasChildren
                        ? handleSubmenuClick(item.title)
                        : navigate(item.path)
                    }
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.9)"
                        : "transparent",
                      color: isActive ? COLORS.bgBlue : "#fff",
                      minHeight: 48,
                      "&:hover": {
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: isActive ? COLORS.bgBlue : "#fff",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        opacity: open ? 1 : 0,
                        "& .MuiListItemText-primary": {
                          fontWeight: isActive ? 600 : 400,
                        },
                      }}
                    />
                    {hasChildren &&
                      open &&
                      (openSubmenu === item.title ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                </ListItem>
                {hasChildren && (
                  <Collapse
                    in={openSubmenu === item.title && open}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((child, childIndex) => {
                        const isChildActive = isPathActive(child.path);
                        return (
                          <ListItemButton
                            key={childIndex}
                            onClick={() => navigate(child.path)}
                            sx={{
                              pl: 4,
                              py: 1,
                              borderRadius: "8px",
                              ml: 2,
                              backgroundColor: isChildActive
                                ? "rgba(255,255,255,0.9)"
                                : "transparent",
                              color: isChildActive ? COLORS.bgBlue : "#fff",
                              "&:hover": {
                                backgroundColor: isChildActive
                                  ? "rgba(255,255,255,0.95)"
                                  : "rgba(255,255,255,0.08)",
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 3,
                                color: isChildActive ? COLORS.bgBlue : "#fff",
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={child.title}
                              sx={{
                                "& .MuiListItemText-primary": {
                                  fontWeight: isChildActive ? 600 : 400,
                                },
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: "#f5f5f5",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DrawerPage;
