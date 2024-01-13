<template>
  <div class="score-box" id="score" :style="`height:${height}`">
    <div class="score-box_head">
      <div
        class="score-cell"
        v-for="(i, idx) of datas.header"
        :key="idx"
        :style="`width:${calcCellWidth}px;`">
        {{ i.name }}
      </div>
      <div class="score-cell" :style="`width:${calcCellWidth}px`">评分分值</div>
      <div
        class="score-cell"
        :style="`width:${calcCellWidth + 2}px`"
        v-if="scene != 'manage'">
        评分
      </div>
    </div>
    <ScoreTemplateTree
      :children="datas.cell"
      :scene="scene"
      :width="calcCellWidth"
      :criteria="datas.score_criteria"
      :options="datas.score_options"
      @handleChoose="handleChoose"></ScoreTemplateTree>
  </div>
</template>

<script lang="ts" setup>
import ScoreTemplateTree from './ScoreTemplateTree.vue'
import { ref, onMounted, defineProps, computed, watch, nextTick } from 'vue'
// 评分模板所在场景 manage评分表管理 preview预览 score立即评分
const props = defineProps(['scene', 'datas', 'height'])
let width = ref<number>(1600)
let calcCellWidth = computed(() => {
  let count =
    props.datas && props.datas.header && props.datas.header.length
      ? props.datas.header.length
      : 0
  let other = props.scene == 'manage' ? 1 : 2
  let num = width.value / (count + other) - 1
  return num
})
watch(
  () => props.datas,
  () => {
    nextTick(() => {
      let div: any = document.getElementById('score')
      width.value = div.offsetWidth
    })
  },
  {
    deep: true,
    immediate: true,
  },
)
onMounted(() => {
  window.onresize = () => {
    return (() => {
      let div: any = document.getElementById('score')
      width.value = div.offsetWidth
    })()
  }
})
let $emit = defineEmits(['handleChoose'])
const handleChoose = (arr: any) => {
  $emit('handleChoose', arr)
}
</script>

<style scoped>
.score-box {
  width: 100%;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-top: 0;
  height: calc(100vh - 190px);
  min-height: 500px;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
}
.score-box::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.score-box_head {
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
}
.score-cell {
  padding: 15px 3px;
  font-size: 14px;
  border-right: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  box-sizing: border-box;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.score-cell::after {
  content: '';
  position: absolute;
  bottom: -1px;
  width: inherit;
  height: 1px;
  background: #dcdfe6;
}
.score-cell.no_border {
  border-right: 0;
}
</style>
