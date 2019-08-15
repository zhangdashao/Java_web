# survey-report

> 报告管理系统

## 目录结构

## 类型检查系统
* 全局数据处理函数做类型校验

目录结构如下：

~~~
vue-web 部署目录
├─build           webpack应用目录
│  ├─build.js           npm run build 执行脚本
│  ├─check-versions.js           检查web环境版本
│  ├─utils.js           静态资源预处理器（css）
│  ├─vue-loader.conf.js           组件预处理器配置
│  ├─webpack.base.conf.js           webpack基础配置
│  ├─webpack.dev.conf.js           npm run dev 执行脚本及开发环境时 webpack打包配置
│  ├─webpack.prod.conf.js           生产环境时webpack打包配置
│  └─webpack.test.conf.js           测试环境时webpack打包配置
│
├─config           项目配置文件（对外访问目录）
│  ├─dev.env.js           开发环境配置
│  ├─index.js           项目配置文件
│  ├─prod.env.js           生产环境配置
│  └─test.env.js           单元测试配置（此项目没有用）
│
├─server           node中间服务文件（用于生产环境web服务器的中间服务）
│  ├─package.json           安装依赖包
│  └─server.js           node服务脚本
│
├─src           应用目录
│  ├─api           项目api模块
│  │  ├─index.js           api入口
│  │  └─module-1.js        请求模块
│  ├─assets           静态资源
│  ├─components           公共组件
│  │  ├─base-component           基础组件
│  │  └─bussiness-component      业务组件
│  ├─global           全局方法及变量
│  │  ├─global-function.js           全局方法
│  │  └─global-variable.js           全局变量
│  ├─router           路由
│  │  ├─before_each.js     vue-router导航守卫
│  │  └─index.js           vue-router配置
│  ├─store           vuex配置
│  │  ├─modules           按模块设置全局状态及管理
│  │  ├─getters.js         全局状态的计算属性
│  │  └─index.js           vuex入口
│  ├─views           视图目录
│  │  ├─layout           项目布局
│  │  └─pages            router-view 对应页面
│  ├─App.vue           应用组件
│  └─main.js           应用主入口
│
├─static           静态资源
├─test           单元测试（没有启用）
├─.babelrc           ES6编译设置
├─.editorconfig           统一代码格式的解决方案，[参考：有各个参数的说明](https://github.com/cy0707/Learn_Vue/issues/6)
├─eslintignore.js           eslint不检查目录配置
├─eslintrc.js           eslint配置
├─gitignore           git不上传目录配置
├─.gitlab-ci.yml           gitlab-ci 自动部署脚本
├─.postcssrc.js           [参考](https://github.com/michael-ciniawsky/postcss-load-config)
├─Dockerfile           docker镜像文件
├─index.html           入口文件
~~~

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
