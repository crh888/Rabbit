// 把 components 中所有的组件进行全局化注册
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin = {
  install (app) {
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}