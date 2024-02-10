const fs = require('fs')
const http = require('http') // home sayfasi icin 
const url = require('url') // farkli sayfaya gitmek icin 
const replaceTemplate = require('./modules/replaceTemplate')

/* Burada API olusturacagiz:
    - gelen request lari izler ve cevap gonderir.
*/

/* 
   Gelen istekleri izlemek icin createServer() use ve 
   beraberinde otomatik gelen serverListener fonksiyonu ()=>{}
   her istek geldiginde tetiklenecek. 

   serverListener()=>{} has 2 parameters:
   1) request => headers, body, parameters,
   2) response => gonderilecek cevap (reply to be sent)

   Request parametresi req'in detay, bilgilerine ulasmamizi saglar:
   ex. http metodu ne etc 

   Ardindan client'in istegine cevap gondermeliyiz
    Bunu da res.end('') yapariz.
*/

/*
 html sablon verilerini once oku (template-overview.html dosyasi):

*/

let tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8')
let tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8')
let tempCards = fs.readFileSync('./templates/template-card.html', 'utf-8')
// gelen data json formatinda
let data = fs.readFileSync('./dev-data/data.json', 'utf-8')

// biz bu json formatini javascript formatina cevirmemiz lazim:
const dataObj = JSON.parse(data)


const server = http.createServer((req, res) => {
    // url deki parcalara erismek:
    // 1param=>gelen url(/product), 2param=>queryString, yani=>?id=0)
    const {pathname, query} = url.parse(req.url, true)

    switch (pathname) {
        case '/overview':
            // meyveler dizisini loop (map ile) ile dondur ve her bir meyve datasi icin 
            // meyveye ozel bir card.html olustur.
            const cardHTML = dataObj.map((el) => 
                replaceTemplate(tempCards,el)
            )
            // anasayfa template'indeki kartlar alanina card.html ekleyecegiz
            // {%PRODUCT_CARDS%} ile tanimlanan alanin yerine card.html koy
            // tempOverviewdeki {%PRODUCT_CARDS%}'i cardHTML ile degistir:
            // yeni degeri ayni isim verelim:
            output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHTML)
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(output)
            break
        case '/product':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })  
            // tikladigimiz urunun id' sini bulup sayfada gostermek: 
            const productId = dataObj.find((item)=>item.id == query.id)
            // dinamik bilgileri asil gilgilerle degistirmek icin replaceTemplate() kullan:
            const updatedProductId = replaceTemplate(tempProduct, productId) 
            res.end(updatedProductId)
            break
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html',
                Date: Date.now()
            })
            res.end('The page you are looking for is not exist 404 error!!!')
            break
    }
})

/* Simdi hangi porta (adrese) gelen requesi dinlemeliyiz onu yazalim.
    Bunu gelen requesti bir variable (server) aktararak, bu variable'i 
    listen diye bir metodu sececegiz. Hangi portu dinleyecegini belirtir:

    listen(port(3000), hostname(amazon.com), callback function)
    ek bilgi:
    Port internetimizin bir dalidir ve 0 ile 65.000 arasi olur.
    Standartlasmis portlar: 25 => email send icin; 21=> dosya transferi icin
*/

server.listen(4000, '127.0.0.1', () => {
    // dinleme islemi baslandiginda tetiklenir.
    console.log('4000 port dinlenmeye baslandi.');
})