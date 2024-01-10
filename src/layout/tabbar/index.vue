<template>
  <div class="toolbar">
    <div class="toolbar_left">
      <BreadCrumb />
    </div>
    <div class="toolbar_right">
      <Setting />
    </div>
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgb(247, 240, 240),
    rgb(248, 237, 113),
    rgb(87, 232, 246),
    rgb(198, 255, 26)
  );
  .toolbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .toolbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
