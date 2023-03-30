import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProductModal from "../components/modals/ProductModal";
import useStockCall from "../hooks/useStockCall";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { btnStyle } from "../styles/globalStyle";

const Products = () => {
  const { deleteStockData, getProCatBrand } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);

  // https://14613.fullstack.clarusway.com/redoc/#operation/stock_products_create
  const [info, setInfo] = useState({
    category_id: "",
    brand_id: "",
    name: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // field=Backend den gelen gerçek veri , headerName= ekrana gözüken kısım, editable= tıklayarak editleme.  flex
  const columns = [
    {
      field: "id",
      headerName: "#",
      minWidth: 40,
      maxWidth: 70,
      flex: 1, //tablo büyüyüp küçüldüğünde sütuna flex oranı verdik.
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center", //başlıgı ortalar.
      align: "center", // verileri ortalar.
      flex: 3,
      minWidth: 150,
      // valueGetter:(params)=>`${params.row.firstName || ""} ${params.row.lastName || ""}`
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 2,
    },

    {
      field: "stock",
      headerName: "Stock",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 0.7, //float deger verebiliriz.
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 50,
      flex: 1,
      renderCell: ({ id }) => (
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          sx={btnStyle}
          onClick={() => deleteStockData("products", id)}
        />
      ),
    },
  ];

  useEffect(() => {
    // getStockData("products")
    // getStockData("categories")
    // getStockData("brands")

    //! Promise All ile veriyi çektik.
    getProCatBrand(); //pro=products, cat=categories, brand=brands , :)
  }, []); // eslint-disable-line

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>

      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>

      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          autoHeight
          rows={products}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          sx={{
            boxShadow: 4,
          }}
        />
      </Box>
    </div>
  );
};

export default Products;

// https://mui.com/material-ui/react-table/ iptal ettik yeni kütüphane kullanıp hazır tablo kullandık. https://mui.com/x/react-data-grid/
// https://14613.fullstack.clarusway.com/redoc/#operation/stock_products_read

/*
      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          autoHeight //içindeki elementlerin yüksekliğine göre ayarlar.
          rows={products || []} //! products dizi oldugundan ilk render da apiden veri gelmezse null olur ve hata alırız. başlangıc degerini null yerine [] dizi yaptık direk çözdük.
          rows={products} //! row api den gelecek product verisi ile dolduracagız.
          columns={columns} // yukarda columns dizisi ile oluşturduk
          pageSize={10}
          disableRowSelectionOnClick // tıklayarak row un tamamını seçmeyi disabled yaptık.
          pageSizeOptions={[5]} sayfayı 5 ilerletmek için.
          checkboxSelection checkbox ile seçme işlemi yapılabiliyor.
          slots={{ toolbar: GridToolbar }}
          sx={{
            boxShadow: 4,
          }}
        />
      </Box>

        renderCell: (props) => ( props u console.log(props) yapınca içinde id verisi var desc yaptık aldık.

      renderCell: ({ id }) => (
        <GridActionsCellItem
          icon={<DeleteForeverIcon />} //* icon ekledik
          label="Delete"
          sx={btnStyle}  //* sx props u ile style verdik hover kırmızı vs. 
          onClick={() => deleteStockData("products", id)}  //* deleteStockData func. ile ilgili (id) products ı silmek için.
        />
      ),

      */
