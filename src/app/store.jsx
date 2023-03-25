import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice"; // stockSlice dan stockReducer ı ekledık ismi biz stockreducer ismini biz veriyoruz.

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults olarak localStorage i kullanıyor.
// import storage from "redux-persist/lib/storage/session"; //! sadece session diyerek sessionStorage e alabiliyoruz.

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;

//! şu an yine localstorage kullanıyoruz bu kütüphane "redux-persist" otomatik storage a kaydetme işlemi yapıyor biz ayrıca her işlemde kayıt yapmıyoruz. store da yazıyoruz app.j de sarmallayıp kullanıyoruz. kendisi otomatik statelerimizi localstorage e alıyor.
