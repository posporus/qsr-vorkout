import { RouteRecordRaw } from 'vue-router';
//import CreateWorkout from 'pages/CreateWorkout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //{ path: '', component: () => import('pages/Index.vue') },
      //{ path: '', component: () => import('src/pages/_WorkoutPage.vue') },
      { path: 'edit/:id', name:'edit', component: () => import('pages/EditWorkout.vue'),props:true },
      { path: 'my-workouts', component: () => import('pages/MyWorkouts.vue') },
      { path: 'test', component: () => import('pages/Test.vue') }
    ],
  },
  {
    path: '/workout/:id',
    name: 'workout',
    component: () => import('layouts/WorkoutLayout.vue'),
    props:true,
    /*
    children: [
      //{ path: '', component: () => import('pages/Index.vue') },
      { path: '', component: () => import('pages/WorkoutPage.vue') },
      { path: 'create', component: () => import('pages/CreateWorkout.vue') },
      { path: 'edit', component: () => import('pages/EditWorkout.vue') }
    ],*/
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
