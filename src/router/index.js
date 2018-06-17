import Vue from 'vue'
import Router from 'vue-router'
import TunerPage from '@/pages/TunerPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tuner Page',
      component: TunerPage,
    },
  ],
})
