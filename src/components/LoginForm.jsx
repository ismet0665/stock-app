import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { Form } from "formik";
import { useSelector } from "react-redux";
import { object, string } from "yup";

// loginScheme yı başka dosyada oluşturup import edebiliriz. login işleminde email ve password oldugu için ikisi için validation hazırladık. https://www.npmjs.com/package/yup  RegExp için https://www.w3schools.com/jsref/jsref_obj_regexp.asp
// RegExp in matches func. var.
export const loginScheme = object({
  email: string()
    .email("Lutfen valid bir email giriniz") //matches ekleyerek(/[gmail]/ diyerek sadece gmail olanlar girsin ? gibi.)
    .required("Email zorunludur"),
  password: string()
    .required("password zorunludur")
    .min(8, "password en az 8 karakter olmalıdır") //min, max deger verilmeli.
    .max(20, "password en fazla 20 karakter olmalıdır")
    .matches(/\d+/, "Password bir sayı içermelidir") //matches d decimal
    .matches(/[a-z]/, "Password bir küçük harf içermelidir") // bunları tek bir matches içine alıp yazılabilir.?
    .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
});

const LoginForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email} //{values?.email || ""}
          onChange={handleChange} //onChange inputlara girilen degeri almak için formik de hazır var.
          onBlur={handleBlur} // dokunuldugunda formik in hazır methodu handleBlur.
          helperText={touched.email && errors.email}
          error={touched.email && Boolean(errors.email)}
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password && errors.password}
          error={touched.password && Boolean(errors.password)}
        />
        {/* LoadingButton butonu kullanmak için npm i @mui/lab yüklemek lazım https://mui.com/material-ui/api/loading-button/ 
                  LoadingButton un loading props u var global loading state ini atadık Submit e basdıgımızda Formik te onSubmit de post işlemi atılcak. yukarda func. yazdık.*/}
        <LoadingButton
          loading={loading}
          loadingPosition="center"
          variant="contained"
          type="submit"
        >
          Submit
        </LoadingButton>
      </Box>
    </Form>
  );
};

export default LoginForm;
