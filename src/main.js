import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

Vue.use(ElementUI);

Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
