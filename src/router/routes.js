const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/doc', component: () => import('pages/Index.vue') },
      { path: '', component: () => import('pages/Main.vue') },
      { path: 'pokemon/:id', component: () => import('pages/Pokemon.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
