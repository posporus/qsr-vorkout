import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout'),
    children: [
      {
        path: '',
        name: 'overview',
        meta: {
          title: 'Overview'
        },
        component: () => import('src/pages/OverviewPage')
      },
      {
        path: 'edit/:id',
        name: 'edit',
        
        meta: {
          title: 'Edit Workout'
        },
        component: () => import('src/pages/EditWorkoutPage'),
        props: true
      },
      {
        path: 'my-workouts',
        meta: {
          title: 'My Workouts'
        },
        component: () => import('src/pages/MyWorkoutsPage')
      },
      /* {
        path: 'my-logs',
        
        meta: {
          title: 'My Logs'
        },
        component: () => import('src/pages/MyLogsPage')
      }, */
      {
        path: 'my-exercises',
        
        meta: {
          title: 'My Exercises'
        },
        component: () => import('src/pages/MyExercisesPage')
      },
      {
        path: 'edit-exercise',
        name: 'edit-exercise',
        
        meta: {
          title: 'Edit Exercise'
        },
        component: () => import('src/pages/EditExercisePage')
      },
      {
        path: 'workout-log-details/:workoutLogId',
        name: 'workout-log-details',
        meta: {
          title: 'Workout Log'
        },
        component: () => import('src/pages/WorkoutLogDetailsPage'),
        props: true
      },
      {
        path: 'settings',
        name: 'settings',
        meta: {
          title: 'Settings'
        },
        component: () => import('src/pages/SettingsPage')
      },
      {
        path: 'diary',
        name: 'diray',
        meta: {
          title: 'Diary'
        },
        component: () => import('src/pages/DiaryPage')
      },
      {
        path: 'changelog',
        name: 'changelog',
        meta: {
          title: 'Changelog'
        },
        component: () => import('src/pages/ChangelogPage')
      },

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
