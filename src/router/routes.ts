import { RouteRecordRaw } from 'vue-router';
//import CreateWorkout from 'pages/CreateWorkout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //{ path: '', component: () => import('pages/Index.vue') },
      //{ path: '', component: () => import('src/pages/_WorkoutPage.vue') },
      { path: 'edit/:id', name:'edit', component: () => import('src/pages/EditWorkoutPage.vue'),props:true },
      { path: 'my-workouts', component: () => import('src/pages/MyWorkoutsPage.vue') },
      { path: 'test', component: () => import('src/pages/TestPage.vue') },
      { path: 'my-logs', component: () => import('src/pages/MyLogsPage.vue') },
      { path: 'my-exercises', component: () => import('src/pages/MyExercisesPage.vue') },
      { path: 'edit-exercise', name:'edit-exercise', component: () => import('src/pages/EditExercisePage.vue') }
    ],
  },
  {
    path: '/workout/',
    
    component: () => import('src/layouts/FullscreenLayout.vue'),
    children: [
      { name: 'workout',path: ':id', component: () => import('src/pages/WorkoutPage.vue'), props:true, }
    ],
    //props:true,
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
