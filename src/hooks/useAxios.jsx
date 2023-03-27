import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth); // state den token ı çektik.

  const axiosPublic = axios.create({
    baseURL: "https://14613.fullstack.clarusway.com/",
  });

  const axiosWithToken = axios.create({
    baseURL: "https://14613.fullstack.clarusway.com/",
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken, axiosPublic };
};

export default useAxios;

//! https://axios-http.com/docs/instance
// custom hook olarak axios Instance ı oluşturduk.
//  useStockcallda da yapabiliriz ama burada axios u da bir hook haline getiriyoruz farklı yerlerde de kullanabileceğiz böylelikle
