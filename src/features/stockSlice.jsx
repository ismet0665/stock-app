import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    purchases: null,
    sales: null,
    brands: null,
    firms: null,
    products: null,
    categories: null,
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

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = stockSlice.actions;
export default stockSlice.reducer;

// stockSlice stock taki verileri getirceğiz. api deki verileri çekip redux a atacagız sayfanın istenilen yerinde kullanacagız. her ihtiyaç oldugunda her defasında api den veri çekmektense bir kere çekip kullancaz. istek zaman alan bir işlem.
//! getSuccess i yukardaki tüm state ler için kullandık. fetchStart ve fetchFail hepsinde ortaktı. authSlice da login,logout,register success durumları için ayrı ayrı yazdık. burda stateler çok oldugu için getSuccess ı 1 kere yazıp onu dinamik hale getirdik.bütün statelerde getSuccess i kullanabiliyoruz.  state[url] state.firms gibi
