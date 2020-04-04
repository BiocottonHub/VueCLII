export default [
  {
    path: '/blast/query',
    name: 'blast-query',
    component: () => import('@/views/blast/query.vue')
  },
  {
    path: '/blast/show',
    name: 'blast-show',
    component: () => import('@/views/blast/show.vue')
  }
]
