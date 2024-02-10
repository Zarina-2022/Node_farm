// Iki parametre alacak: 
//    ilki => Card html'ini alıcak
//    ikincisi => ürün bilgilerini alıcak
// Cart hml'inde değişken olarak tanılanan alanlara
// ürünün bilgilerini ekliyecek ve ürüne özel oluşan
// kartı geri göndericek

const replaceTemplate = (cardTemplate, data) => {
  let updatedCard = cardTemplate.replace(/{%PRODUCTNAME%}/g, data.productName);
  updatedCard = updatedCard.replace(/{%IMAGE%}/g, data.image);
  updatedCard = updatedCard.replace(/{%PRICE%}/g, data.price);
  updatedCard = updatedCard.replace(/{%FROM%}/g, data.from);
  updatedCard = updatedCard.replace(/{%NUTRIENTS%}/g, data.nutrients);
  updatedCard = updatedCard.replace(/{%QUANTITY%}/g, data.quantity);
  updatedCard = updatedCard.replace(/{%DESCRIPTION%}/g, data.description);
  updatedCard = updatedCard.replace(/{%ID%}/g, data.id);

  //urun organic degilse :
  if (!data.organic){
     return updatedCard = updatedCard.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  }
  
  return updatedCard
};


// module.export ile replaceTemplate isimli ffonksiyonu
// projedeki diğer js'dosylarından erişelebilir hale getiriyoruz
// React'taki export default gibi.
// Bu replaceTemplate() kullanmak istedigin sayfaya import etmen lazim:
// const replaceTemplate = require('./modules/replaceTemplate')
module.exports = replaceTemplate;
