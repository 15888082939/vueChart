// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio,'http://127.0.0.1:7001/');
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  sockets:{
    connect:function(){  //默认的事件
      console.log('socket connected');
    },
    res:function(val){   //自定义的监听事件  监听服务端发送的res事件
      console.log('接收到服务端消息',val);
    }
  }
})
