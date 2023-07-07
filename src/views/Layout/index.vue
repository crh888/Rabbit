<template>
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加 key 破坏复用机制 强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView />
  <LayoutFooter />
  <LayoutFixed />
</template>

<script setup>
import { onMounted } from 'vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';
import { useCategoryStore } from '@/stores/category.js'

// 触发获取导航列表的action
const categoryStore =  useCategoryStore()
onMounted(() => {
  categoryStore.getCategory()
})
</script>

<style>

</style>