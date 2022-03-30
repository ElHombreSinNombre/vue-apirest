import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import '../src/assets/styles.scss'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
