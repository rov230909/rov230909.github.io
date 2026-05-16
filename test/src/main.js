import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import views
import HomePage from './views/HomePage.vue'
import TokenGenerator from './views/TokenGenerator.vue'
import LongBio from './views/LongBio.vue'
import UniqueBio from './views/UniqueBio.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/free-fire-token-generator', name: 'Token', component: TokenGenerator },
  { path: '/free-fire-long-bio', name: 'LongBio', component: LongBio },
  { path: '/free-fire-unique-bio', name: 'UniqueBio', component: UniqueBio },
  { path: '/token', redirect: '/free-fire-token-generator' },
  { path: '/bio', redirect: '/free-fire-long-bio' },
  { path: '/unique', redirect: '/free-fire-unique-bio' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')