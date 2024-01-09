import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入element-plus
import ElemenPlus from 'element-plus'
// 引入element-plus样式
import 'element-plus/dist/index.css'
// 引入默认、自定义样式
import '@/styles/index.scss'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
//@ts-expect-error '引入国际化报错是因为没有ts类型'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 国际化
// 引入路由
import router from './router'
// 引入自定义插件对象：注册整个项目的全局组件
import globalComponents from '@/components/index'
// 引入仓库
import pinia from '@/store'
app.use(pinia)
app.use(globalComponents)
app.use(router)
app.use(ElemenPlus, {
  locale: zhCn,
}) // 应用

app.mount('#app') // 挂载
