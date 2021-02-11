import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Address from '../views/Address.vue'
import Nav from '../views/Nav.vue'
import Profile from '../views/Profile.vue'
import Detail from '../views/Detail.vue'
import RegStore from '../views/Store/RegStore.vue'
import StoreDashboard from '../views/Store/StoreDashboard.vue'
import Cart from '../views/order/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components:{default:Home,nav:Nav} 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    components: {default:Register, nav: Nav}
  },
  {
    path: '/register/address',
    name: 'Address',
    components: {default:Address, nav: Nav},
    meta: { 
      requiresAuth: true
    }
    
  },
  {
    path: '/register/store',
    name: 'RegStore',
    components: {default:RegStore, nav: Nav},
    meta: { 
      requiresAuth: true
    }
    
  },
  {
    path: '/store/:id',
    name: 'StoreDashboarad',
    components: {default:StoreDashboard, nav: Nav},
    meta: { 
      requiresAuth: true
    }
    
  },
  {
    path: '/login',
    name: 'Login',
    components: {default:Login}
  },
  {
    path: '/profile',
    name: 'Profile',
    components: {default:Profile, nav:Nav},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    components: {default:Search, nav: Nav}
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    components: {default:Detail, nav: Nav}
  },
  {
    path: '/cart',
    name: 'Cart',
    components: {default:Cart, nav: Nav}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
