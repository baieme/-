import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login/index.vue')
  },
  {
    path:'/',
    component:()=>import('@/views/layout/index.vue'),
    children:[
      {
        path:'',
        component:()=>import('@/views/layout/home/index.vue')
      },
      {
        path:'qa',
        component:()=>import('@/views/layout/qa/index.vue')
      },
      {
        path:'my',
        component:()=>import('@/views/layout/my/index.vue')
      },
      {
        path:'video',
        component:()=>import('@/views/layout/video/index.vue')
      },
    ]
  },
  {
    path:'/search',
    component:()=>import('@/views/search/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
