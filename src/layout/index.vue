<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :style="{
        width: LayOutSettingStore.isCollapse ? ' 56px' : '200px',
      }">
      <Logo></Logo>
      <el-scrollbar>
        <el-menu
          :default-active="$route.path"
          active-text-color="var(--color-active)"
          background-color="aqua"
          text-color="#fff"
          :unique-opened="true"
          :collapse="LayOutSettingStore.isCollapse"
          :router="true">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_taber"
      :style="{
        left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
        width: LayOutSettingStore.isCollapse
          ? 'calc(100% - 56px)'
          : 'calc(100% - 200px)',
      }">
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :style="{
        left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
        width: LayOutSettingStore.isCollapse
          ? 'calc(100% - 56px)'
          : 'calc(100% - 200px)',
      }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
// import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import Main from './main/index.vue'
import useLayOutSettingStore from '@/store/modules/setting'
// import useUserStore from '@/store/modules/user.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRoute } from 'vue-router'

let userStore = useUserStore()
let $route = useRoute()

let LayOutSettingStore = useLayOutSettingStore()
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .el-scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabber-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_taber {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    top: $base-tabber-height;
    left: $base-menu-width;
    overflow: auto;
    transition: all 0.3s;
  }
}
</style>
