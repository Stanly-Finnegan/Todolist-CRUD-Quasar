const routes = [
  {
    path: '/',
    component: () => import('layouts/baseLayout.vue'),
    children: [
      { path: '', name: 'signin', component: () => import('pages/SigninPage.vue') },
      { path: '/signup', name: 'signup', component: () => import('pages/SignupPage.vue') },
      { path: '/home', name: 'home', component: () => import('pages/HomePage.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
