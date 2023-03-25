import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null, // current = geçerli user
    loading: false,
    error: false,
    isAdmin: false,
    token: null, // diğer projelerde public api kullandık. herkes veri çekebiliyordu. Bazı apiler private yetki verilince veri çekme silme ekleme vs yapabiliyor.Api ye giriş yapınca api token(jeton, güvenlik şifresi) veriyor. o token ın süresi olabiliyor veya olmayabilir. banka uygulamaları süresi 5 dk mesela. token lı api lerde her gönderimde token ile beraber apiye istek atılır.bu yüzden token state timiz var.
  },
  reducers: {
    fetchStart: (state) => {
      // login isteginin başlaması
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      // login isteginin başarılı bitmiştir.
      state.loading = false;
      state.currentUser = payload?.user?.username;
      state.isAdmin = payload?.user?.is_superuser;
      state.token = payload?.key;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.username;
      state.token = payload?.token;
      state.error = false;
    },
    fetchFail: (state) => {
      // login isteginin başarısız bitmiştir.
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;

// reducers kısmı redux-toolkit projesinden farklı extra reducer yok. reducers state i güncelleme isteği atan dispatch func. larımız. burda klasik yöntemi kullandık.
// eğer api istek başlarsa dispatch ile fetchStart isteği yayınlıyacagız ve isteğim başlattıgımızı state e gösteriyoruz.
// istek attık başarılı bitti. loginSuccess func. içindeki stateleri güncelle.
// state.currentUser = payload?.user?.username; // bu yazım tarzı api ile alakalı api username neyin içine koyduksa çekerken o şekilde çekiyoruz.   state.isAdmin = payload?.user?.is_superuser; gibi.

//! login işlemide olsa register işlemide olsa logout işlemide olsa fetchStart, fetchFail işlemi ortak sadece başarılı olma durumları farklı loginSuccess, logoutSuccess, registerSuccess yapımız bu şekilde.
// fetchStart ve fetchFail ortak (başlama ve hatalı durumu)
