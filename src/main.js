import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/styles.css'

import FontAwesomeIcon from '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
