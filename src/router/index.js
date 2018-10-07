import Vue from 'vue'
import Router from 'vue-router'
import TunerPage from '@/pages/TunerPage'
import TunerDisplayNeedle from '@/components/Tuner/TunerDisplayNeedle'
import TunerDisplayStrobe from '@/components/Tuner/TunerDisplayStrobe'

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
          component: TunerDisplayNeedle,
        },
        {
          path: 'strobe-tuner',
          component: TunerDisplayStrobe,
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
