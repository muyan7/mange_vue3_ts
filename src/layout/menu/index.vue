<template>
  <template v-for="i in menuList" :key="i.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!i.children && !i.meta.hidden" :index="i.path">
      <el-icon>
        <component v-if="i.meta.icon" :is="i.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ i.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有子路由但只有一个 --home -->
    <el-menu-item
      v-if="
        i.children && i.children.length == 1 && i.path === '/' && !i.meta.hidden
      "
      :index="i.children[0].path">
      <el-icon>
        <component
          v-if="i.children[0].meta.icon"
          :is="i.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ i.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有子路由但只有一个 --not home -->
    <el-sub-menu
      v-if="
        i.children && i.children.length == 1 && i.path !== '/' && !i.meta.hidden
      "
      :class="{ isActive: $route.path.includes(i.path) }"
      :index="i.path">
      <template #title>
        <el-icon>
          <component v-if="i.meta.icon" :is="i.meta.icon"></component>
        </el-icon>
        <span>{{ i.meta.title }}</span>
      </template>
      <Menu :menuList="i.children"></Menu>
    </el-sub-menu>
    <el-sub-menu
      :index="i.path"
      :class="{ isActive: $route.path.includes(i.path) }"
      v-if="i.children && i.children.length != 1 && !i.meta.hidden">
      <template #title>
        <el-icon>
          <component v-if="i.meta.icon" :is="i.meta.icon"></component>
        </el-icon>
        <span>{{ i.meta.title }}</span>
      </template>
      <Menu :menuList="i.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
}
</script>
<script setup lang="ts">
import { useRoute } from 'vue-router'
let $route = useRoute()
defineProps(['menuList'])
</script>

<style lang="scss" scoped>
.isActive {
  :deep(.el-sub-menu__title) {
    color: $active-color !important;
  }
}
</style>
