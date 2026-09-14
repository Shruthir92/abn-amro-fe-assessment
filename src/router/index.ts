import { createRouter, createWebHistory } from 'vue-router'
import ShowsList from '../views/ShowsList.vue'
import ShowDetailView from '../views/ShowDetail.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'shows-list',
      component: ShowsList,
    }, {
      path: '/shows/:id',
      name: 'show-details',
      component: ShowDetailView,
    }
  ]
})

export default router