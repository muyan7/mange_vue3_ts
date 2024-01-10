import type { App } from 'vue'
import * as components from './components'
// 引入element-plus提供的全图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  install(app: App) {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value)
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
