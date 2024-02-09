import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import { useApplicationStore } from '@/stores/application.js';

import BloodDonationHeader from "@/components/BloodDonationHeader.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
        component: () => import('../views/Home.vue'),
    }
    ]}, {
       path: '/login',
       name: 'login',
      component: () => import('../views/Login.vue')
 })
//         path: '/donators',
//         name: 'donators',
//         component: () => import('../views/DonatorsView.vue'),
//         meta: { requiresAuth: true }
//     },
//     {
//         path: '/requests/new',
//         name: 'requests-new',
//         component: () => import('../views/CreateRequestView.vue'),
//         meta: { requiresAuth: true },
//         children: [
//             {
//                 path: '',
//                 name: 'student-details',
//                 component: () => import('../views/RequestDetailsView.vue'),
//                 meta: { requiresAuth: true }
//             }]}
//     );
router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        next('/login');
    } else {
        next();
    }
});

export default router;