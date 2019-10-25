// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";//vuerouter
import store from './store';//vueX
import axios from 'axios';//axios
import ElementUI from "element-ui"; // 导入element-ui组件
import "./theme/element/theme/index.css"; // 导入element-ui主题样式
import "@/assets/css/normalize.css"; // 导入reset.css重置样式库
import "@/assets/css/common.css"; // 导入工具类样式
import "@/assets/css/squain_icon_style.css"; // 导入icon图标样式
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
