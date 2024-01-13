// 创建
import { defineStore } from 'pinia'

// 引入接口
import { reqLogin, reqLogOut, reqUserInfo } from '@/api/user/index'

// 引入数据类型
import type { LoginFormData, LoginResponseData } from '@/api/user/type'
// 引入仓库数据类型
import { UserState } from './types/type'
// 引入操作本地存储的工具的方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由用于后续与接口返回的数据做对比
import { constantRoute } from '@/router/routes'
// 创建用户相关的的小仓库
const userStore = defineStore('user', {
  // 数据 需要renturn
  state: (): UserState => {
    return {
      token: GET_TOKEN('UESR_TOKEN'),
      menuRoutes: constantRoute, // 生成菜单的路由
      username: '',
      avatar: '',
    }
  },
  // 异步
  actions: {
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data)
      if (res.code == 200) {
        this.token = res.data as string
        SET_TOKEN('UESR_TOKEN', this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    async userLogout() {
      const res: any = await reqLogOut()
      if (res.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN('UESR_TOKEN')
        // dynamicRoutes.forEach((route) => {
        //   router.removeRoute(route.name)
        // })
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      const res = await reqUserInfo()
      if (res.code == 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error('获取用户信息失败'))
      }
    },
  },

  getters: {},
})

export default userStore
