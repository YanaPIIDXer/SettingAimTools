import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/presentations/views/HomeView.vue'),
    },
    {
      path: '/prob-calc',
      name: 'prob-calc',
      component: () => import('@/presentations/views/ProbCalc.vue'),
    },
    {
      path: '/total-calc',
      name: 'total-calc',
      component: () => import('@/presentations/views/TotalCalcView.vue'),
    },
    {
      path: '/machine-group-memo',
      name: 'machine-group-memo',
      component: () => import('@/presentations/views/MachineGroupMemoView.vue'),
    },
  ],
})

export default router;
