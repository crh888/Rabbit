// 封装倒计时逻辑

import { computed, onUnmounted, ref } from "vue"
import dayjs from "dayjs"

export const useCountDown = () => {
  let timer = null
  // 1. 响应式数据
  const time = ref(0)
  // 格式化 XX分XX秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2.开启倒计时的函数
  const start = (currentTime) => {
    // 开启倒计时的逻辑
    // 每隔 1s 减 1
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000);
  }

  // 组件销毁时 清除计时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}