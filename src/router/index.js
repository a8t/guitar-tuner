import Vue from 'vue'
import Router from 'vue-router'
import TunerPage from '@/pages/TunerPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'tuner',
    },
    {
      path: '/tuner',
      name: 'Tuner Page',
      component: TunerPage,
    },
  ],
})
