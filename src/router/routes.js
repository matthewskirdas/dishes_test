const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/DishesMenu.vue') },
      {
        path: '/edit-dish/:dish_id',
        name: 'EditDish',
        component: () => import('src/pages/EditDish.vue'),
        props: true
      },
      {
        path: '/register-guest',
        name: 'GuestRegistration',
        component: () => import('src/pages/GuestRegistration.vue'),
      }
          
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;
