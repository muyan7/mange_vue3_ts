import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import ElemenPlus from 'element-plus'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
//@ts-expect-error '引入国际化报错是因为没有ts类型，@ts-expect-error不去检验ts类型'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 国际化
const app = createApp(App)
app.use(ElemenPlus, {
  locale: zhCn,
}) // 应用
app.mount('#app') // 挂载
// console.log(import.meta.env) 打印环境变量
