import Vue from 'vue'
import Router from 'vue-router'
import TunerPage from '@/pages/TunerPage'
import NeedleTuner from '@/components/Tuner/NeedleTuner/NeedleTuner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tuner',
      name: 'Tuner Page',
      component: TunerPage,
      children: [
        {
          path: '',
          redirect: 'needle-tuner',
        },
        {
          path: 'needle-tuner',
          component: NeedleTuner,
        },
        {
          path: '*',
          redirect: 'needle-tuner',
        },
      ],
    },
    {
      path: '*',
      redirect: 'tuner',
    },
  ],
})
