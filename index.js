const puppeteer = require('puppeteer');
const fs = require('fs/promises'); //para

(async() =>{

    const browser = await puppeteer.launch({
        headless:false,
        slowMo:250 //tiempo de la respuesta en ms
    });
    const miUrl ='https://www.youtube.com/'; //youtube
    const miUrl2 = 'https://www.google.com/search?q=ministerio+agricultura+y+pesca&rlz=1C1CHBD_esUY820UY820&oq=ministerio+agr&aqs=chrome.1.0i512l2j69i57j46i512j0i512l6.10108j0j4&sourceid=chrome&ie=UTF-8'; //ministerio Agricultura y pesca
	const miUrlScreen = 'https://www.cafenix.com.uy/'; // caFenix
    const urlScrap1 = 'https://books.toscrape.com'; //pag para escrapear
    const urlScrap2 = 'https://www.instagram.com/elceibo_vivero/?hl=es'; //pag para escrapear
    const urlScrap3 = 'https://books.toscrape.com/catalogue/category/books/food-and-drink_33/index.html'; //pag para escrapear
    const urlScrap4 = 'https://quotes.toscrape.com/search.aspx'; //para form login
    
    //const page = await browser.newPage();
    
   //await rascar(miUrl2, page, browser);  //llamada1
   //await screenShoot(miUrlScreen, page, browser); //llamada2
   //await addDatos(urlScrap1, page, browser); //llamada3
   //await getImages(urlScrap3, page, browser); //llamada guarda imagen
   //await click(urlScrap3, page, browser); //llamada3
   await formu(urlScrap4, page, browser); //llamada3
})(); //asi se ejecuta automaticamente al abrir y llama a funcion q preciso sino lo hago desde afuera

//abrir(); llamo a una function
async function abrir() {
    const url = 'https://quotes.toscrape.com/search.aspx';
    
        try {
            const browser = await puppeteer.launch({
                headless: false,
                slowMo: 250 //tiempo de la respuesta en ms
            });
            const page = await browser.newPage();
            await page.goto(url);
            await page.screenshot({ path: 'quelopario.png', fullPage: true });
            await browser.close(); //cierra navegador
            /* o puedo hacer una llamada a la de abajo
            formu(url,page,browser);*/

        } catch (error) {
            log.error(error);
        }
}

/* ***  Cargar pagina web  *** */
 async function  rascar (url, page, browser) {
    /* rascar = async (url, page, browser)=> { */

    //config para abrir la pagina
    await page.goto(url,{ 
        waitUntil:['load', 'domcontentloaded', 'networkidle0', 'networkidle2']        
    });

/*     const valorDvuelto = await page.$eval('.style-scope ytd-rich-grid-renderer > .style-scope ytd-rich-grid-renderer > .style-scope ytd-rich-grid-row > .style-scope ytd-rich-grid-row > .style-scope ytd-rich-item-renderer',el=>el.innerHTML);*/
    /* const valorDvuelto = await page.$eval('#kp-wp-tab-overview',el=>el.innerHTML);*/
    const valorDvuelto = await page.$eval('#kp-wp-tab-overview',el=>el.innerHTML);
    console.log(`\nDATOS: ${valorDvuelto.trim()} --\n`);
	
    await browser.close(); //cierra navegador
}

/* Sacar una screenShot y guardarla. la llamada sera automatica */
/* screenShoot = async (url, page, browser) => { */
async function screenShoot(url, page, browser)  {
 await page.goto(url);
 await page.mouse.click(332,-103,{button:'left'})
 await page.screenshot({path:'mouse_click.png'});
 /* await page.screenshot({path:'miScreen.png',fullPage:true}); */
 console.log(`\nFenix-${url}`);
 await browser.close(); //cierra navegador
}

/* --  guardar datos de alguna pagina   */
async function addDatos
(url, page, browser) {
    await page.goto(url);

    const listDtosDOM = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#default > div > div > div > div > section > div> ol > li > article > h3 > a'))
                                                    /*
                                                    #content_inner > article > ul > li> article > h3 > a
                                                    #content_inner > article > ul > li:nth-child(3) > article > h3 
                                                    //le saco el nth-child(4) para obtener todos los valores del DOM*/
          .map(x => x.textContent);
    });
    

    const names = ['Ana', 'Daniel', 'Colita', 'Yellow'];

    /*Abajo se crea un nuevo archivo (nuevoArch)y agregara cada linea del 
    array names en un archivo gracias a fs/promises*/
    /*//\r\n = return new line*/
    await fs.writeFile('nuevoArch.txt', listDtosDOM.join('\r\n'));

    console.log(`\r\nFenixche-${listDtosDOM}`);

    await browser.close(); //cierra navegador
}

/* Guarda ej titulo de las imagenes */
async function getImages(url, page, browser) {
    await page.goto(url);
    const fotos = await page.$$eval('img',imgs=>{
        return imgs.map(img =>img.src);
    })
     for (const foto of fotos) {
        const imagepage = await page.goto(foto)  /*//navega hasta la url de cada foto
        /* 
        #default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(2) > article > div.image_container > a > img
         #default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(4) > article > div.image_container > a > img */
        await fs.writeFile(foto.split("/").pop(), await imagepage.buffer());
            /* se creo un archivo con cada imagen */       
    }
    await browser.close(); //cierra navegador
}


/*  ** formulario *** */
async function formu(url,page,browser){

    await page.goto(url); 

    //await page.type('#author','Albert Einstein');    
    //await page.type('#tag','miracles');
    await page.type('#author','Bob Marley');
    await page.type('#tag','love');

    //await page.click('body > div > form > input.btn.btn-default')

    /* await Promise.all([await page.click('body > div > form > input.btn.btn-default')
                            ,page.waitForNavigation()]) */   
                            
     //arriba pongo los 2 await en un array de promesa de abago
     //en este caso como no navegare splo  muestro info de la misma pag
     await page.click('body > div > form > input.btn.btn-default');

    /*await page.click('body > div > form > input.btn.btn-default');
    await page.waitForNavigation(); */

    /* const datoBoton1 = await page.$eval('body > div > form > input.btn.btn-default',el=>el.textContent)
    const datoBoton2 = await page.$eval('#author',el=>el.textContent)
 */
    //aca muestra la info de la pag a la que se navegaria
    const infoUnLink = await page.$eval('body > footer > div > p.text-muted > a',el=>el.innerHTML);
   // const info = await page.$eval('body > div > div.results > div > span.content', x=x.textContent)
    try {
        console.log(`info: ${infoUnLink}`);
       //console.log(`Lainfo: ${info}`);
    } catch (error) {
        console.log('error');
    }

    await browser.close(); //cierra navegador
}

/* click boton */
async function click(url, page, browser){
    await page.goto(url);
    await page.click('#default > div > div > div > div > section > div > ol > li > article > div.product_price > form > button');
    const datoBoton1 = await page.$eval('#default > div > div > div > div > section > div > ol > li > article > div.product_price > p.instock.availability',el=>el.textContent)
    const datoBoton2 = await page.$eval('#default > div > div > div > div > section > div > ol > li> article > div.product_price > form > button',el=>el.textContent)
    const datoBoton3 = await page.$eval('#default > div > div > div > div > section > div > ol > li > article > div.product_price > p.price_color',el=>el.textContent)
    //const datoBoton4 = await page.$eval('#default > div > div > div > div > section > div > ol > li: > article > h3',el=>el.textContent)
    
    const list= await page.evaluate(() => {
        const lista = Array.from(document.querySelectorAll('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(16) > article > h3 > a'))
        .map(x => x.textContent);
      });
    
    const datoBoton4 = await page.$eval('#default > div > div > div > div > section > div > ol > li > article > h3 > a',el=>el.textContent)
    console.log(datoBoton1);
    console.log(datoBoton2);
    console.log(datoBoton3);
    //console.log(datoBoton4);
    console.log(list);
    await browser.close(); //cierra navegador
}


/* **** llmaAsincMio *****  */
//llmaAsincMio();
async function llmaAsincMio() {
    /* llmaAsincMio = async () => { */
    try {
        const valor = await screenShoot2();//el await ya usa el valor devuelto Y lo guardo en una variable
        console.log('DEMORAS',valor)
    } catch (error) {
        console.log(`Errorrr-${error}`);
    }
}
/* const screenShoot2= async () => { */
async function screenShoot2 ()  {
    return new Promise((resolve, reject)=>{
        if(11>31){
            reject(new Error('nose DEMORON'));
        }
        setTimeout(()=>{
             resolve('Immpeca');
        },3000)
       
    });
}

/* ******************* */
let datoADevolver/* :string[] */=[ 'dato0','dato1','dato2','dato3'];

//fetchingData();//la llamada
async function fetchingData() { //agregamos async y await a la llamada de getdatos
  try {
    const guardoDato = await gttingDatos(); //el await ya usa el valor devuelto Y lo guardo en una variable 
    console.log(`Los datos son. ${guardoDato}`);
  } catch (err) {
    console.log(`Error- ${err}`);
  }
}
const gttingDatos = () => {
    return new Promise((resolve, reject) => {
        if (!datoADevolver.length) {            
                reject(new Error('nooo hay datos'));
        }
        setTimeout(() => {
            resolve(`${datoADevolver.length}`)
        }),2000
        
    })
}