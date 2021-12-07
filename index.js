const puppeteer = require('puppeteer');

(async() =>{
    const browser = await puppeteer.launch({
        headless:false,
        slowMo:250 //tiempo de la respuesta en ms
    });
    const miUrl ='https://www.youtube.com/'; //youtube
    const miUrl2 = 'https://www.google.com/search?q=ministerio+agricultura+y+pesca&rlz=1C1CHBD_esUY820UY820&oq=ministerio+agr&aqs=chrome.1.0i512l2j69i57j46i512j0i512l6.10108j0j4&sourceid=chrome&ie=UTF-8'; //ministerio Agricultura y pesca
    const page = await browser.newPage();

    await rascar(miUrl2, page, browser);

})();

async function rascar(url, page, browser) {

    await page.goto(url,{ 
        waitUntil:['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
        //son config para abrir la pagina
    });

/*     const valorDvuelto = await page.$eval('.style-scope ytd-rich-grid-renderer > .style-scope ytd-rich-grid-renderer > .style-scope ytd-rich-grid-row > .style-scope ytd-rich-grid-row > .style-scope ytd-rich-item-renderer',el=>el.innerHTML);*/
     const valorDvuelto = await page.$eval('#kp-wp-tab-overview',el=>el.innerHTML);
    console.log(`\nDATOS: ${valorDvuelto} --\n`);

    await browser.close(); //cierra navegador
}