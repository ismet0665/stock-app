import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    purchases: [],
    sales: [],
    brands: [],
    firms: [],
    products: [],
    categories: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
      // state.url = data;  bu şekilde kullanamayız. Çünkü state in içinde url diye bir key arar. [] square breaket ile değişkenlerimizi kullanıyoruz.
    },
    // getSuccess func. dinamik hale getirdik. yoksa her state için ayrı ayrı getSuccess func. yazacaktık.
    // ! url bizim state lerimizin adı.  dispatch(getSuccess({ data, url })) veriyi bu formatta göndermemiz lazım.
    // getSuccessSales: (state, { payload }) => {
    //   state.loading = false
    //   state.sales = payload
    // },
    // getSuccesPurchase: (state, { payload }) => {
    //   state.loading = false
    //   state.purchases = payload
    // },

    getProCatBrandSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0]; //products. dizinin[0] indisi products
      state.categories = payload[1]; //categories
      state.brands = payload[2]; //brands
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail, getProCatBrandSuccess } =
  stockSlice.actions;
export default stockSlice.reducer;

// stockSlice stock taki verileri getirceğiz. api deki verileri çekip redux a atacagız sayfanın istenilen yerinde kullanacagız. her ihtiyaç oldugunda her defasında api den veri çekmektense bir kere çekip kullancaz. istek zaman alan bir işlem.
//! getSuccess i yukardaki tüm state ler için kullandık. fetchStart ve fetchFail hepsinde ortaktı. authSlice da login,logout,register success durumları için ayrı ayrı yazdık. burda stateler çok oldugu için getSuccess ı 1 kere yazıp onu dinamik hale getirdik.bütün statelerde getSuccess i kullanabiliyoruz.  state[url] state.firms gibi
