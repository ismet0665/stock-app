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
//!Redux kullandığımız uygulamalarda, sayfa değiştiğinde, yenilendiğinde veya uygulama kapatıp tekrar açıldığında, redux’ taki değişkenlerin tekrar eski haline dönmesi veya sıfırlanması sebebiyle tekrar kullanmak istediğimizde ulaşamayız. Bu yüzden sayfa yenilendiğinde tekrar istek atar ve değişkenleri tekrar setleriz. Özellikle genelde servisten gelen sabit objeler veya arraylerde bu can sıkıcı hale gelir çünkü tekrar servise istek atıp değişkeni tekrar setlemek gerekir.Redux persist, redux’taki değişkenlerin, sayfa yenilendiğinde, değiştiğinde veya uygulama kapatıp tekrar açıldığında tekrar eski haline dönmesini veya sıfırlanmasını engellemeye yarayan, bu değişkenleri localstorage da saklayan bir pakettir.
