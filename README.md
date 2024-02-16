# ⛏️「神奇海螺油猴网页工具集」依托用户脚本支持的网页工具集


参考 https://github.com/enazo/enazo-tools 的思路，依托用户脚本对网页提供一些浏览器插件能提供的功能，实现一些网页小工具

## 使用说明
在浏览器上安装功能增强用户脚本 `tool/user-script/magiconch-tools-enhance.user.js`，然后在浏览器中打开 `https://lab.magiconch.com/tool/`，即可使用网页工具集

## 规范
每个小工具都会在 `tool/` 目录下新建文件夹，对应网站上 `https://lab.magiconch.com/tool/` 下的一个小工具

 - 框架不限，尽可能简单易读、少依赖
 - 小工具上线前会单独确认，不要提交压缩代码

## API
用户脚本会在网页上注入一个全局变量 `magiconchToolsEnhanceFunctions`，小工具可以通过这个变量调用一些浏览器插件能提供的功能
```javascript
magiconchToolsEnhanceFunctions = {
    httpRequest: options => GM_xmlhttpRequest(options),
    openTab: url => GM_openInTab(url),
    setClipboard: text => GM_setClipboard(text),
    getValue: key => GM_getValue(key),
    setValue: (key, value) => GM_setValue(key, value),
    registerMenuCommand: (name, fn) => GM_registerMenuCommand(name, fn),
}
```


## 项目
 - 微博评论抽奖 https://lab.magiconch.com/tool/weibo/raffle-comments/


## GitHub
https://github.com/itorr/magiconch-user-tools