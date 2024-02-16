if(!window.magiconchToolsEnhanceFunctions) throw new Error('未安装通用小工具功能增强用户脚本');

const { httpRequest } = window.magiconchToolsEnhanceFunctions;



const $ = (selector, context = document) => context.querySelector(selector);


const MC = {};

MC.fetch = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        httpRequest({
            method: options.method || 'GET',
            url: url,
            headers: options.headers,
            data: options.body,
            responseType: options.responseType,
            onload: response => resolve(response),
            onerror: error => reject(error)
        });
    });
};