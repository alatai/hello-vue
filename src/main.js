import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// import BaseIcon from '@/components/BaseIcon.vue'
// import BaseButton from '@/components/BaseButton.vue'
// import BaseInput from '@/components/BaseInput.vue'


// ------ set global component automatically ------
const requireComponent = require.context(
  // 1)Directory to search within,
  './components',
  // 2)Search subdirectories
  false,
  // 3)Regular
  /Base[A-Z]\w+\.(vue|js)$/
)
// ------ set global component automatically ------

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

// ------ set global component manually -------
// Make sure this line above the new Vue
// instance we're creating below
// Set the name of BaseIcon
// It is to globally register this base icon component
// Vue.component('BaseIcon', BaseIcon)
// Vue.component('BaseButton', BaseButton)
// Vue.component('BaseInput', BaseInput)
// ------ set global component manually -------

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
