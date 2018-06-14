import Vue from 'vue'
import Router from 'vue-router'
import NeedleTuner from '@/components/NeedleTuner'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'NeedleTuner',
            component: NeedleTuner,
        },
    ],
})
