## NodeJs(Express)简单介绍

#####NodeJs
NodeJs不是类似jQuery的前端框架,它是js运行环境(Chrome js Runtime v8),类比java中jvm.<br/>
意义: 摆脱浏览器限制,可以开发后台程序.(后台中的"前端",可以做完整的route逻辑,通过ajax交互API,统一和移动端API逻辑)

#####NVM
Node Version Manager,node版本管理工具,可以下载,安装,切换不同版本的node

#####NPM
包管理器 npm 可以自动管理包的依赖. 只需要安装你想要的包, 不必考虑这个包的依赖包.<br/>
本地安装 : npm install <pkg> 安装到当前目录(node\_modules) <br/>
全局安装 : npm install -g <pkg> 安装到全局目录. <br/>
package.json :  npm install <pkg> --save 本地安装的同时保存到package.json, 项目所有依赖包统一管理.使用的时候调用npm install即可讲所有包都安装(node\_modules)

#####Express
NodeJs的后台mvc框架.<br/>
npm install -g express-generator@4 : 安装express-generator<br/>
express -e express-intro :按照express目录结构生成名为express-intro 的工程(-e 表示为views为ejs文件,默认为jade)<br/>
cd express-intro : <br/>
npm install : 安装express所需的包(package.json所配置)<br/>
npm start : 启动服务(port3000)

#####目录结构
- bin, 存放启动项目的脚本文件
- node\_modules, 存放所有的项目依赖库。
- public，静态文件(css,js,img)
- routes，路由文件(router或者MVC中的C)
- views，页面文件(Ejs模板,MVC中的V)
- package.json，项目依赖配置及开发者信息
- app.js，应用核心配置文件

#####CommonJS规范
文件就是一个module,对外接口是module.exports对象 <br/>
module.exports VS. exports (本质var exports = module.exports;)<br/>
require方法用于在其他文件加载这个接口 <br/>
  

#####参考 <br/>
> [https://github.com/alsotang/node-lessons](https://github.com/alsotang/node-lessons) <br/>
> [http://blog.fens.me/series-nodejs/](http://blog.fens.me/series-nodejs/) <br/>
> [https://github.com/tmallfe/tmallfe.github.io/issues/28](https://github.com/tmallfe/tmallfe.github.io/issues/28) <br/>
> [http://javascript.ruanyifeng.com/nodejs/module.html](http://javascript.ruanyifeng.com/nodejs/module.html) <br/>