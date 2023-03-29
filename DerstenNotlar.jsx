/*
! LOGİN.jsx
Login sayfasında hatalı formatta veri girildiğinde Helper text ti çıkartan kütüphane yup. formları handle etmemizi saglayan ise formik. 
Formik ve yup ın kendi içerisinde state leri var. bu state ler ile işlemleri gerçekleştiriyorlar.
Formik temelde 3 props alıyor.propsları 1,2,3 diye açıkladım.
<Formik 
        1-    initialValues={{ email: "", password: "" }}
        2-    validationSchema={loginScheme}
        3-    onSubmit={(values, actions) => {
              login(values)
              actions.resetForm()
              actions.setSubmitting(false)
            }}
          >

1- form yapımızda 2 input(email,password) varsa bunlara initial value veriyoruz initialValues={{ email: "", password: "" }}
formik arka planda email ve password u state olarak kendi içerisinde tutuyor. Özetle kullancagımız form elementlerinin statelerioluyor.        
2- validation kısmında neye göre denetim yapsın onu belirliyoruz.en az 8 karakter rakam olsun vs. formik in kendi sayfasında validasyonu var. biz yup (harici validasyon kütüphanesi) kullanarak loginScheme adında func. yazıp kriterlerimizi belirledik.
3- onSubmit form elemanlarını inputları submit edecek. onSubmit ettiğinde ne olacagını yazıyoruz. func. (callback func.) yazıyoruz. onSubmit 2 deger alıyor values=> formların degerleri,  
onSubmit={(values, actions) => {  //! values initialValues={{ email: "", password: "" }} tüm form elementlerin değerlerini saklayan kısım email, password u tutuyor.  values.email diye degeri okuyabiliriz.
              login(values) //! submit oldugunda email ve password degerlerini global state e alıp post isteği atmamız lazım.
              actions.resetForm()
              actions.setSubmitting(false)
              values,
! actions ise formik in hazır statelerini alıyor. errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting https://formik.org/docs/overview sayfasında ki degerler. ayrıca (values, actions) isimleri biz belirledik (x,y) de olabilir.
-actions. (nokta değince formik in yapısındaki degerler geliyor) actions.reserForm() gibi.
-actions.reserForm() formu submit ettik işlemler bitti formu resetlemek için. 
-actions.setSubmitting(false) Formun submit tuşuna bastıgımız anda formik kütüphanesi isSubmiting (submit edildimi?) state ini aktif hale getiriyor true ya kuruyor bizde otomatik olarak true ya kurulan state i manuel olarak actions.setSubmitting(false) false yapıyoruz. ne işimize yarar isSubmiting submit aşamasında buton pasif hale(disabled) getirebiliriz bazem submit süre alabilir. eğer isSubmiting kullanmayacaksak false lamamız gerekmez. bilgi olsun diye yazdık.

* yup kullanımı https://www.npmjs.com/package/yup yup in kullanımına bak.
 1- import edilcek
 2- oluşturuyoruz. sayfada hazır şema var.

regex => https://medium.com/fedeveloper/regex-hakk%C4%B1nda-2c4e80501802



https://www.tremor.so/docs/components/select
*/
