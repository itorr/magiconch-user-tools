
const outputEl = $('pre.output-pre');

function log(message) {
    console.log(message);
    outputEl.textContent += message + '\n';
}

function clearLog() {
    outputEl.textContent = '';
}




async function fetchData(url) {
    console.log('fetchData', url);
    const result = await MC.fetch(url,{
        responseType: 'text'
    });
    console.log(url, result);
    if(!result.response) return;

    return result.response;
}






const baseUrl = 'https://www.goodsmile.info';
async function getNendoroidLinks() {
    const categoryUrl = `https://www.goodsmile.info/ja/products/category/nendoroid_series`;
    const categoryPage = await fetchData(categoryUrl);
    const parser = new DOMParser();
    const doc = parser.parseFromString(categoryPage, 'text/html');
    const options = Array.from(doc.querySelectorAll('select#nendoroid_no option'));
    const urls = options.map(option => `${option.value}`).filter(text=>/^\//.test(text)).map(text=>baseUrl+text);
    return urls;
}

async function getProductLinks(url) {
    const productPage = await fetchData(url);
    const parser = new DOMParser();
    const doc = parser.parseFromString(productPage, 'text/html');
    const links = Array.from(doc.querySelectorAll('a[href^="https://www.goodsmile.info/ja/product/"]'));
    const productUrls = links.map(link => link.href);
    return productUrls;
}

async function getAllProductLinks() {
    clearLog();
    const nendoroidLinks = await getNendoroidLinks();
    const allProductLinks = [];
    for (const link of nendoroidLinks) {
        const productLinks = await getProductLinks(link);
        allProductLinks.push(...productLinks);
        log(`获取到 ${allProductLinks.length} 个产品链接`);
    }
    return allProductLinks;
}

getAllProductLinks().then(links => console.log(links));