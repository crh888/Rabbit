// 定义懒加载指令插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install (app) {
    // 懒加载逻辑
    app.directive('img-lazy', {
      mounted (el, binding) {
        // el: 指令绑定的元素 img
        // binding：binding.value 指令等于号后面绑定的表达式的值 图片url
        const { stop } = useIntersectionObserver(
          el,
          ([{isIntersecting}]) => {
            if (isIntersecting) {
              // 进入了视口区域 将binding.value (url) 赋值给el.src(图片地址)
              el.src = binding.value
              // 手动停止监听，防止内存浪费
              stop()
            }
          }
        )
      }
    })
  }
}