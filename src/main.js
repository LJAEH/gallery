import { createApp } from 'vue'
import store from './scripts/store.js'
import router from './scripts/router.js'
import App from './App.vue'

createApp(App).use(store).use(router).mount('#app')
