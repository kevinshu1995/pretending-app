import { createApp } from 'vue'
import App from './App.vue'
import Route from './route/index'
import Store from './store/index'
import './index.css'

createApp(App).use(Route).use(Store).mount('#app')
