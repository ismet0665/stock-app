import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuListItems from "../components/MenuListItems";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";
import { Outlet } from "react-router-dom";
import { blueGrey } from "@mui/material/colors";
// bu sayfayı muı dan https://mui.com/material-ui/react-drawer/  Responsive drawer seçip copy paste yaptık. ekledikten sonra di

const drawerWidth = 200; //sidebarın genişliği

function Dashboard(props) {
  const { currentUser } = useSelector((state) => state.auth); // authSlice.jsx den currentUser ı çektik.
  const { logout } = useAuthCall();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MenuListItems />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  // aşagıdaki <CssBaseline /> componenti boşlukları resetlemek için muı içindeki hazır component.Çok önemli dashboard ı copy paste yapınca geldi.
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: blueGrey[900],
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Stock App
          </Typography>
          {currentUser && (
            <Button
              color="inherit"
              onClick={() => logout()}
              sx={{
                color: "white",
                fontWeight: "bold",
                "&:hover": { color: "red" },
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer =sidebar kısmı sx ile style verdik sm de none gözükmeyecek. //! 1.Drawer sayfa tam iken */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile = Mobil cihazlarda daha iyi açık performans
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: blueGrey[900],
            },
          }}
        >
          {drawer} {/* yukarda componentleri basdık. */}
        </Drawer>
        {/* //! 2.Drawer sayfa küçük iken */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: blueGrey[900],
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
        {/*sidebar sabit, navbar sabit ama ortada sidebardaki linkleri tıkayınca sayfaların gelmesi lazım o sayfaları <Outlet /> componenti temsil ediyor. */}
      </Box>
    </Box>
  );
}

export default Dashboard;
