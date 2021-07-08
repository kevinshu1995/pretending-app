import { createApp } from 'vue'
import App from './view/App.vue'
import Route from './route/index'
import './index.css'

createApp(App)
    .use(Route)
    .mount('#app')
