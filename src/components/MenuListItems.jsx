import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";

// icons ile sidebar ın data sını oluşturduk. daha kullanışlı hale getirdik. https://mui.com/material-ui/material-icons/
const icons = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    title: "Purchase",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases/",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales/",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms/",
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands/",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/stock/products/",
  },
  {
    title: "Admin Panel",
    icon: <SupervisorAccountIcon />,
    url: "https://10001.fullstack.clarusway.com/admin",
  },
];
//  & ampersant bulundugun yeri temsil eder.& = iconStyle .burda hem icon a hemde yazıya aynı anda hover verdik. ilk önce icon ve yazıya white verdik. &:hover yazıyı temsil eder üzerine gelindiginde .MuiSvgIcon-root": { color: "red" }, iconu red yap. nested bir hover yaptık.
const iconStyle = {
  color: "white",
  "& .MuiSvgIcon-root": { color: "white" }, //iconun rengini white yaptık.
  "&:hover": { color: "red" },
  "&:hover .MuiSvgIcon-root": { color: "red" },
};

const MenuListItems = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* //  muı dan https://mui.com/material-ui/react-drawer/  Responsive drawer seçip Dashboard a yapıştırmıştık. list kısmını buraya yapıştırıp ayrı component yaptık.
       //! map e bakmadan aşagıdaki açıklamayı oku.
       */}
      <List>
        {icons?.map((item, index) => (
          <ListItem key={index} disablePadding>
            {item.url.includes("http") && (
              <ListItemButton to={item.url} sx={iconStyle}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )}
            {!item.url.includes("http") && (
              <ListItemButton onClick={() => navigate(item.url)} sx={iconStyle}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuListItems;

// data mızın içerisinde  title: "Admin Panel" lin url: "https://10001.fullstack.clarusway.com/admin", url li https ile başladıgı için full adres oldugu için diğerleri gibi değil. bu yüzden navigate hooku ekleme yaparak url li olusturyor. bunun önüne geçmek içinde item.url.includes("http") diye bir condition koyduk içeriyorsa direk to={item.url} adrese git.              !item.url.includes("http") içermiyorsa navigate ile ilgili sayfaya git. Başka yol icon data sının içindeki dahili ve harici url li olanları farklı data içine alıp (ki zaten sadece 1 tane var) dataları ayrı ayrı direk map leyebilirdik.
