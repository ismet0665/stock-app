// import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  //   const { token } = useSelector((state) => state.auth)
  const { axiosWithToken } = useAxios(); // useAxios() custom hook undan axiosWithToken func. desc ettik.

  const getStockData = async (url) => {
    // const BASE_URL = "https://14613.fullstack.clarusway.com/"
    dispatch(fetchStart());
    try {
      //   const { data } = await axios(`${BASE_URL}stock/${url}/`, {
      //     headers: { Authorization: `Token ${token}` },
      //   })
      const { data } = await axiosWithToken(`stock/${url}/`); //axiosWithToken default degeri get axiosWithToken.get yazmadık.
      console.log(data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  // silme işleminde id de lazım. silinecek data nın id si lazım.
  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} successfuly deleted`);
      getStockData(url); // sildikten sonra tekrar veriyi getirmek için.
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  const postStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} successfuly posted`);
      getStockData(url); //yeni firma eklendikten sonra firma yı güncelledik.Burda 1-post 2-get işlemi yapmış oluyoruz.
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be posted`);
    }
  };

  // putStockData put=güncelleme. put da tamamını baştan yazmamız lazım yazılmayan boş olur. patch olsaydı ilgili kısmı güncellerdi.
  const putStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not be updated`);
    }
  };

  return { getStockData, deleteStockData, postStockData, putStockData };
};

export default useStockCall;

// custom hook yazdık. custom hookların jsx return nu yok func. ve değişken return nu var.
// Firmaları birçok yerde çekmemiz lazım oldugu için Sales, Brands vs sayfalarında lazım oldugu için burda yazdık.
