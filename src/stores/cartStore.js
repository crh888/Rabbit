import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart.js";

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 定义state
  const cartList = ref([])

  // 获取最新购物车列表 action
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // 定义action
  const addCart = async (goods) => {
    // 添加购物车操作
    // 已添加 count +1  没有直接 push
    const {skuId, count} = goods
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      console.log(222);
      const item = cartList.value.find(item => item.skuId === goods.skuId)
      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
    
  }
  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    } else {
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
    
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleClick = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }
  // 全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 1. 总的数量 所有项 count 之和
  // 2. 总价  所有项 count * price 之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count ,0))
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  // 是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected))
  // 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 已选择商品价格合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleClick,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
}, {
  persist: true
})