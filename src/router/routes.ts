import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout'),
    children: [
      { path: 'edit/:id', name: 'edit', component: () => import('src/pages/EditWorkoutPage'), props: true },
      { path: 'my-workouts', component: () => import('src/pages/MyWorkoutsPage') },
      { path: 'my-logs', component: () => import('src/pages/MyLogsPage') },
      { path: 'my-exercises', component: () => import('src/pages/MyExercisesPage') },
      { path: 'edit-exercise', name: 'edit-exercise', component: () => import('src/pages/EditExercisePage') },
      { path: 'workout-log-details/:workoutLogId', name: 'workout-log-details', component: () => import('src/pages/WorkoutLogDetailsPage'), props: true },
      { path: 'settings', name: 'settings', component: () => import('src/pages/SettingsPage') },
      { path: 'diary', name: 'diray', component: () => import('src/pages/DiaryPage') }
    ],
  },
  {
    path: '/workout/',

    component: () => import('src/layouts/FullscreenLayout.vue'),
    children: [
      { name: 'workout', path: ':id', component: () => import('src/pages/WorkoutPage'), props: true, }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
