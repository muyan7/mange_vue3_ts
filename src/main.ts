import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import ElemenPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error '引入国际化报错是因为没有ts类型'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 国际化
const app = createApp(App)
app.use(ElemenPlus, {
  locale: zhCn,
}) // 应用
app.mount('#app') // 挂载
