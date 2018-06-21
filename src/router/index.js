import Vue from 'vue'
import Router from 'vue-router'
import TunerPage from '@/pages/TunerPage'
import NeedleDisplay from '@/components/Tuner/NeedleTuner/NeedleDisplay'
import StrobeDisplay from '@/components/Tuner/StrobeTuner/StrobeDisplay'

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
          component: NeedleDisplay,
        },
        {
          path: 'strobe-tuner',
          component: StrobeDisplay,
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
