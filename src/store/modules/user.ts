// 创建
import { defineStore } from 'pinia'

// 引入接口
import { reqLogin } from '@/api/user/index'

// 引入数据类型
import type { LoginFormData } from '@/api/user/type'
// 创建用户相关的的小仓库

const userStore = defineStore('user', {
  // 数据 需要renturn
  state: () => {
    return {}
  },
  // 异步
  actions: {
    async userLogin(data: LoginFormData) {
      const res = await reqLogin(data)
      console.log(res)
    },
  },
  getters: {},
})

export default userStore
