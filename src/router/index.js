import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'views/login/Login'
import Home from 'views/home/Home'


// 导入全局样式表
import  'assets/css/global.css'


Vue.use(VueRouter)

const routes = [
  {
    // 路由重定向
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path:'/home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]



const router = new VueRouter({
  routes,
  mode:'history'  // h5 的history模式
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  // to：router即将进入的路由对象。
  // from：当前导航正要离开的路由。
  // next：一个函数，一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // next() : 代表放行； next('/login') 强制跳转

  //如果用户访问的是登录页面，直接放行
  if(to.path === '/login') return next();
  // 获取已经保存在sessionStorage 中的 token
  const tokenStr = window.sessionStorage.getItem('token');
  // 判断如果没有token 强制跳转登录页
  if(!tokenStr) return next('/login');
  // 有则正常放行
  next()
})


export default router
