<template>
  <div>app</div>
  <div class="contain">
    <el-button :icon="Check">啊啊啊啊啊</el-button>
    <h1 class="box">{{ a }}</h1>
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" />
    <img src="@/assets/images/eslint_rules.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check } from '@element-plus/icons-vue'
let a = ref(0)
</script>

<style lang="scss" scoped>
.contain {
  background-color: #9cea49;
  .box {
    width: 100px;
    height: 200px;
  }
}
</style>
