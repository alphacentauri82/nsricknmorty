import Vue from 'nativescript-vue'
import App from './components/App'

import './styles.scss'

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false

new Vue({
  render: h => h(App),
}).$start()
