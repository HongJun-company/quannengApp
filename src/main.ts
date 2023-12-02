import 'normalize.css'
import { createApp } from 'vue'
import registerIcons from './global/register_icons'
import store from './stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(registerIcons)
app.use(store)
app.use(router)

app.mount('#app')
