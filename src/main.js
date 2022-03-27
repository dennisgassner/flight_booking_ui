import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import store from './store/index'
import aFlight from './components/AFlight'

const app = createApp(App).use(store)
app.use(vuetify)
app.component('a-flight',aFlight);
app.mount('#app')
