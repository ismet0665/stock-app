import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../styles/globalStyle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useStockCall from "../../hooks/useStockCall";

export default function FirmModal({ open, handleClose, info, setInfo }) {
  //   const [info, setInfo] = useState({ //açılan modaldaki statelerimiz.
  //     name: "",
  //     phone: "",
  //     address: "",
  //     image: "",
  //   })

  const { postStockData, putStockData } = useStockCall(); //post işlemi yapacagımız postStockData func. çagırdık.
  // https://14613.fullstack.clarusway.com/redoc/#operation/stock_firms_create

  // e.target ın içindeki name ve value yu desc ettik. nereye tıklanırsa name value değişir.! [e.target.name]:e.target.value uzun yol.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  // burda if else blogunda yerine göre put yerine göre post işlemi yapıyoruz. Screenshot_5 resminde ayrıntı var. Aynı modal da hem put hem post yapacaksak post işleminde id yok çünkü api kendisi veriyor.id varsa veritbanına kayıtlıdır demek ki bu edit işlemi put olacak id si varsa bu bir put işlemi yoksa post işlemi olacak. id si varsa veritabanında vardır.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putStockData("firms", info);
    } else {
      postStockData("firms", info);
    }
    handleClose(); // modalı kapatan func.
    setInfo({ name: "", phone: "", address: "", image: "" }); // modaldaki verileri silmek için.
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setInfo({ name: "", phone: "", address: "", image: "" });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form" // component özelliği ile Box ı form gibi çalışmasını söyledik submit çalışsın diye. yada direk form yapabilirdik box yerine.
            onSubmit={handleSubmit}
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              value={info?.name}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              required
              value={info?.phone}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              required
              value={info?.address}
              onChange={handleChange}
            />

            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              required
              value={info?.image}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained">
              Submit Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

// Modal aslında bir muı componenti.Bu component içerisine 2 temel props alıyor.1-open 2-onClose props u. Open açmak için onClose kapatmak için. Open , onClose propsları true false deger alıyor. open true ise aç onClose true ise kapat.
// stateleri Firm.jsx e taşıdık çünkü modalı harekete geçirecek buton Firm.jsx de NewFirm butonu.
