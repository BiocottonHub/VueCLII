import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Nprogress from 'nprogress'

Vue.use(VueRouter)

let routes = []
const requireContext = require.context('./', true, /\.js$/)
requireContext.keys().forEach((filename) => {
  if (filename === './index.js') {
    return
  }
  const routeModule = requireContext(filename) // 获取文件内容
  routes = [...routes, ...routeModule.default] // 合并两个数组内容
})
const router = new VueRouter({
  routes
})

router.addRoutes([
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
])

// 全局路由守卫
router.beforeEach((to, form, next) => {
  Nprogress.start()
  next()
})
router.afterEach((to, from) => {
  Nprogress.done()
})

export default router
