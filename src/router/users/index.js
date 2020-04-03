export default [
  {
    path: '/users',
    name: 'user',
    component: () => import('@/views/layout/common.vue'),
    children: [
      {
        path: 'list',
        name: 'user-list',
        component: () => import('@/views/users/list.vue'),
        meta: { title: '用户列表' }
      },
      {
        path: 'edit',
        name: 'user-edit',
        component: () => import('@/views/users/edit.vue'),
        meta: { title: '用户编辑页面' }
      }
    ]
  }
]
