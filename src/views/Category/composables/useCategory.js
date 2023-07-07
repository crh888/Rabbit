// 封装分类数据业务相关代码
import {ref, onMounted} from 'vue'
import {useRoute, onBeforeRouteUpdate} from 'vue-router'
import {getCategoryAPI} from '@/apis/category.js'

export function useCategory () {
  const route = useRoute()
  const categoryData = ref({})
  const getCategory = async (id = route.params.id ) => {
  const res = await getCategoryAPI(id)
  categoryData.value = res.result
}

onMounted(() => {
  getCategory()
})
  
// 路由参数变化的时候，仅重新发送分类数据请求
onBeforeRouteUpdate((to) => {
  getCategory(to.params.id)
})
  
return {
  categoryData
}
}