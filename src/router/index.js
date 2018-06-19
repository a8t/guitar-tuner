import Vue from 'vue'
import Router from 'vue-router'
import TunerPage from '@/pages/TunerPage'
import NeedleTuner from '@/components/Tuner/NeedleTuner/NeedleTuner'
import StrobeTuner from '@/components/Tuner/StrobeTuner/StrobeTuner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tuner',
      component: TunerPage,
      children: [
        {
          path: '',
          redirect: 'needle-tuner',
          name: 'Needle Tuner',
        },
        {
          path: 'needle-tuner',
          component: NeedleTuner,
        },
        {
          path: 'strobe-tuner',
          component: StrobeTuner,
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
