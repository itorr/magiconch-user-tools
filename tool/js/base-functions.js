const { httpRequest } = window.magiconchToolsEnhanceFunctions;



const $ = (selector, context = document) => context.querySelector(selector);


const MC = {};

MC.fetch = (url, options) => {
    return new Promise((resolve, reject) => {
        httpRequest({
            method: options.method || 'GET',
            url: url,
            headers: options.headers,
            data: options.body,
            onload: response => resolve(response),
            onerror: error => reject(error)
        });
    });
};