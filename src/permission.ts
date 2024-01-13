/***
 * 路由鉴权：项目中路由是否可以被访问的设置。
 *
 */
import router from '@/router/index'
import setting from './setting'
import useUserStore from './store/modules/user'
// 引入进度条样式
import nprogress from 'nprogress'
//src外部不能直接引用store，要把pinia引进来
import pinia from './store'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)
// 全局守卫：任意路由切换时都会触发的钩子
// 前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  // 获取token，判断是否登录
  const token = userStore.token
  // 获取用户名
  const username = userStore.username
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token 过期 ，获取不到用户信息
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

// 未登录不能访问内置页面，已登录不能访问login页
