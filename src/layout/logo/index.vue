<template>
  <div class="logo">
    <img v-if="!setting.hidden" :src="setting.logo" alt="avator" />
    <h1 v-show="!layOutSettingStore.isCollapse">{{ setting.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-tabber-height;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    width: 40px;
    height: 40px;
  }
  h1 {
    color: #fff;
    font-weight: 600;
  }
}
</style>
