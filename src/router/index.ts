import store from '@/store'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next()
      } else {
        next("/login")
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginRegister.vue')
  },

  // 文章管理
  {
    path: '/article',
    name: 'Article',
    component: Layout,
    children: [
      {
        path: 'add-article',
        component: () => import('../views/article/AddArticle.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.userinfo.token) {
            //判断用户权限
            let checkInfo = {
              contentType: 'mweb_article',
              permissions: ['add']
            }
            store.dispatch("checkUserPerm", checkInfo).then((res) => {
              if (res) {
                next()
              }
            })
          } else {
            next('/login')
          }
        }
      },
      {
        path: 'article-list',
        component: () => import('../views/article/ArticleList.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.userinfo.token) {
            //判断用户权限
            let checkInfo = {
              contentType: 'mweb_article',
              permissions: ['add', 'change', 'delete', 'view']
            }
            store.dispatch("checkUserPerm", checkInfo).then((res) => {
              if (res) {
                next()
              }
            })
          } else {
            next('/login')
          }
        }
      },
      {
        path: 'article-top',
        component: () => import('../views/article/ArticleTopList.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.userinfo.token) {
            //判断用户权限
            let checkInfo = {
              contentType: 'mweb_article',
              permissions: ['add', 'change', 'delete', 'view']
            }
            store.dispatch("checkUserPerm", checkInfo).then((res) => {
              if (res) {
                next()
              }
            })
          } else {
            next('/login')
          }
        }
      },
    ]
  },

  // 分类管理
  {
    path: '/categories',
    name: 'Categories',
    component: Layout,
    children: [
      {
        path: 'categories-manage',
        component: () => import('../views/categories/categories.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.userinfo.token) {
            //判断用户权限
            let checkInfo = {
              contentType: 'mweb_fenlei',
              permissions: ['add', 'change', 'delete', 'view']
            }
            store.dispatch("checkUserPerm", checkInfo).then((res) => {
              if (res) {
                next()
              }
            })
          } else {
            next('/login')
          }
        },
      },
    ]
  },

  // 用户管理
  {
    path: '/users',
    name: 'Users',
    component: Layout,
    children: [
      {
        path: 'users-manage',
        component: () => import('../views/user/users.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.userinfo.token) {
            //判断用户权限
            let checkInfo = {
              contentType: 'auth_user',
              permissions: ['add', 'change', 'delete', 'view']
            }
            store.dispatch("checkUserPerm", checkInfo).then((res) => {
              if (res) {
                next()
              }
            })
          } else {
            next('/login')
          }
        }
      },
    ]
  },

  {
    path: '/messages',
    name: 'Message',
    component: Layout,
    children: [
      {
        path: 'messages-manage',
        component: () => import('../views/messages/Messages.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.userinfo.token) {
            //判断用户权限
            let checkInfo = {
              contentType: 'mweb_barrage',
              permissions: ['add', 'change', 'delete', 'view']
            }
            store.dispatch("checkUserPerm", checkInfo).then((res) => {
              if (res) {
                next()
              }
            })
          } else {
            next('/login')
          }
        },
      }
    ]
  },

  {
    path: '/friends',
    name: 'Friends',
    component: Layout,
    children: [
      {
        path: 'friends-manage',
        component: () => import('../views/friends/friends.vue'),
        beforeEnter: (to, from, next) => {
          if (store.state.userinfo.token) {
            //判断用户权限
            let checkInfo = {
              contentType: 'mweb_barrage',
              permissions: ['add', 'change', 'delete', 'view']
            }
            store.dispatch("checkUserPerm", checkInfo).then((res) => {
              if (res) {
                next()
              }
            })
          } else {
            next('/login')
          }
        },
      }
    ]
  },


]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
