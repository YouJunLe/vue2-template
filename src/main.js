import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import console from 'Console'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
// register globally
Vue.component('multi-select', Multiselect)

// import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'
// Vue.use(ViewUI)
import ElementResizeDetectorMaker from 'element-resize-detector'
Vue.prototype.$erd = ElementResizeDetectorMaker()

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.console = console

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
