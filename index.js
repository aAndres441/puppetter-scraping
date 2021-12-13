const puppeteer = require('puppeteer');

(async() =>{
    const browser = await puppeteer.launch({
        headless:false,
        slowMo:250 //tiempo de la respuesta en ms
    });
    const miUrl ='https://www.youtube.com/'; //youtube
    const miUrl2 = 'https://www.google.com/search?q=ministerio+agricultura+y+pesca&rlz=1C1CHBD_esUY820UY820&oq=ministerio+agr&aqs=chrome.1.0i512l2j69i57j46i512j0i512l6.10108j0j4&sourceid=chrome&ie=UTF-8'; //ministerio Agricultura y pesca
	const miUrlScreen = 'https://www.cafenix.com.uy/'; // caFenix
    const page = await browser.newPage();
    
   //await rascar(miUrl2, page, browser);  //llamada1
   await screenShoot(miUrlScreen, page, browser); //llamada2

})(); //asi se ejecuta automaticamente al abrir

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
 await page.screenshot({path:'miScreen.png'})
 console.log(`\nFenix-${url}`);
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