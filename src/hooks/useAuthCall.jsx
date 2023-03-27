import axios from "axios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
//! CUSTOM HOOK YAZDIK...
// burda login işlemini çagıran bir func. yazacagımız için pure js olmalı.burdaki amacımız birçok yerde kullanabileceğimiz bir js func. yazacagız. bu yüzden component yapmadık.
// sayfanın bir çok yerinde get,post vs işlemi olacagı için tek dosyada bunları yazıp ilgili yerlerde kullanacagız.
// login işleminde post olacak . const {data} = await axios.post(url,veri) formatında istek atılıyor.
// https://14613.fullstack.clarusway.com/redoc/
// hooklar ancak bir react componentinde yada başka bir custom hook içerisinde kullanılabilir.useDispatch bir hook.hookları bir js kodları içerisinde kullanamıyoruz.
// bu sayfada bir hook kullanacaksak burayı custum hook a çevirmemiz lazım. hook larda use ile başlarlar. useAuthCall.
// Ne zaman custom hook yazmak mantıklı bir çok component içerisinde kullanmamız gereken bir func. varsa login gibi. func. içersinde hook kullanılması gerekiyorsa redux olacaksa dispatch vardık useDispatch hook u vardır. ve bir jsx döndürmemiz gerekmiyorsa custom hook yazmamız gerekir. peki direk klasik component yazsaydık custom hook a gerek kalmadan. klasik component jsx return eder buda kullanmadıgımız jsx i return etmemiz mantıklı deil. gereksiz renderlara yol açar.çözüm custom hook kullanmak.
//! özet 1. Birçok component içerisinde kullanmanız gereken bir fonksiyon varsa 2. Ancak bu fonksiyon içerisinde hook kullanılacaksa 3. aynı zamanda bir jsx döndürmeniz Gerekmiyorsa çözüm custom hook yazmak gereklidir.
//* custom hook için 1- func. ismi use ile başlamalı useAuthCall. ve return etmeli return { login }. sadece func. döndürmeli jsx html elementleri döndürmemeli. içerisinde hook bulunabilir. useAuthCall bir custom hook içerisinde de useDispatch() ve useNavigate() hook ları barındırabilir.

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = "https://14613.fullstack.clarusway.com/";

  const login = async (userInfo) => {
    dispatch(fetchStart()); // api den isteğin başlangıc anı
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data)); // başarılı ise authSlice sayfasındaki state i güncelle. data yı yolladık.return nü sildik.
      toastSuccessNotify("Login performed");
      navigate("/stock"); // başarılı ise stock sayfasına geç.
      console.log(data);
    } catch (error) {
      dispatch(fetchFail()); // varsa hatayı yolluyoruz.
      console.log(error);
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.post(`${BASE_URL}account/auth/logout/`);
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/stock");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Register can not be performed");
    }
  };

  return { login, register, logout };
};

export default useAuthCall;

// custom hook da birçok yerde kullanılan func. ları bir yerde toplayıp hook larla beraber kullanmamızı saglıyor.
// func. ları component içerisinde yazsaydık hookları kullanamazdık.
// useAuthCall export edip kullanılan yerde import ederek istedigimiz func.(login,register,logout u) kullanabiliriz.
//? custom Hookların klasörü hooks diye yazılır.
//? CustomHook jsx değil sadece fonk dödürüyor ve use ıle başlıyor. ve içinde başka hookları use... ları kullanabılırız.
//! custom hookların jsx return nu yok func. ve değişken return nu var.
