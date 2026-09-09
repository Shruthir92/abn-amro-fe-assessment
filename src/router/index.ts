import { createRouter, createWebHistory } from 'vue-router'
import ShowsList from '../views/ShowsList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'shows-list',
      component: ShowsList,
    }
  ]
})

export default router