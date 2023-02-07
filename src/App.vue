<template>
  <router-view />
</template>

<script lang="ts" setup>
import router from '@/router';

import { watch, computed, ref, onMounted } from 'vue';
import store from './store';

let authlogin = computed(() => {
  return store.getters.isnotUserlogin
})
// 监听token
watch(() => authlogin.value.token, (newVal) => {
  if (newVal == '') {
    router.push({ path: '/login' })
  }
})

onMounted(() => {
  store.dispatch('TryAoutLogin')
})
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  color: #2c3e50;
}
</style>
