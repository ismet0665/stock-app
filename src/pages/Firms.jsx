import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/modals/FirmModal";
import useStockCall from "../hooks/useStockCall";
import { flex } from "../styles/globalStyle";

// ebe1ceab59d5a423b0cfe7fd08bbd40e8e528e21 post işleminde kullancagım key login olurken api verdi.

// import axios from "axios"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice"

const Firms = () => {
  // const { token } = useSelector((state) => state.auth)
  // const dispatch = useDispatch() //state i güncellememiz lazım dispatch ile.

  // const getFirms = async () => {
  //   const BASE_URL = "https://14613.fullstack.clarusway.com/"
  //   dispatch(fetchStart())
  //   const url = "firms"
  //   try {
  //     const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     })
  //     dispatch(getSuccess({ data, url }))  stockSlice sayfasında getSuccess func. payload kısmını açtıgımız için veriyi bu şekile yolladık. { data, url } bu obje formatında oldugu için { data, "firms" } şeklinde gönderim olmuyor. key olarak yollamamız lazım. url i değişken haline getirip gönderdik.
  //   } catch (error) {
  //     console.log(error)
  //     dispatch(fetchFail())
  //   }
  // }

  const { getStockData } = useStockCall(); //useStockCall custom hook undan getStockData func. desc ettik.
  const { firms } = useSelector((state) => state.stock); //state den verileri useSelector ile çektik.
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // getFirms()
    getStockData("firms");
  }, []);

  console.log(firms);

  return (
    <div>
      <Typography variant="h4" color="error" mb={1}>
        Firm
      </Typography>

      <Button variant="contained" onClick={handleOpen}>
        New Firm
      </Button>

      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex} mt={2}>
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;

/* 
! Dashboarda Firms butonuna tıklayınca firma verisini apiden get ile çekmesi gerekiyor. ve global state e atılması gerekiyor.bunun için istek func. yazılması gerekir.componentdidmount aşamasında veri gelmesi lazım.
Read => manager olmasına gerek yok
Create-Update-Delete => manager grubunda olması lazım
Bütün işlemlerde header altında token gönderilmesi gerekiyor

<FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} /> 
setOpen={setOpen} edit butonuna tıklanınca açılması için props olarak FirmCarda yolladık.
setInfo={setInfo} ise edit butonuna tıklanınca açılan modal da bilgilerin gelmesi için.

* setInfo={setInfo}  state i normalde FİrmModal da bulunuyordu. FirmCard da setInfo state ine ihtiyaç olunca state i Fİrm.jsx e taşıdık sonra props ile FirmCard ve FirmModal a gönderdik.
*/
