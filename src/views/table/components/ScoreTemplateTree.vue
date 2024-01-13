<template>
  <div class="score-flex_column">
    <div
      v-for="(o, odx) of children"
      :key="odx"
      class="hpd-display_flex hpd-flex_1">
      <div class="score-cell" :style="`width:${width}px;`">
        {{ o.content }}
        <div
          v-if="calcBasis(o.id) && scene == 'manage'"
          class="score-cell_badge">
          {{ calcBasis(o.id) }}分
        </div>
      </div>
      <ScoreTemplateTree
        :children="o.children"
        :width="width"
        :scene="scene"
        :criteria="criteria"
        :options="options"
        @handleChoose="handleChoose"
        v-if="o.children && o.children.length"></ScoreTemplateTree>
      <template v-else>
        <div
          class="score-cell"
          :class="scene == 'manage' ? 'no_border' : ''"
          :style="`width:${scene == 'manage' ? width + 2 : width}px`">
          {{ calcScore(o) }}
        </div>
      </template>
      <!-- <template v-if="scene != 'manage' && calcOptions(o) > -1">
        <div
          class="score-cell"
          :style="`width:${width}px`"
          v-for="(i, idx) in options[calcOptions(o)].options"
          :key="idx"
        >{{i}}</div>
      </template> -->
      <div
        class="score-cell no_border"
        :style="`width:${width + 2}px`"
        v-if="scene != 'manage' && calcOptions(o) > -1">
        <el-select
          v-model="options[calcOptions(o)].score"
          placeholder="请选择分值"
          clearable
          @change="handleChoose">
          <el-option
            v-for="(i, idx) in options[calcOptions(o)].options"
            :key="idx"
            :value="i"
            :label="i"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ScoreTemplateTree',
}
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import ScoreTemplateTree from './ScoreTemplateTree.vue'
const props = defineProps(['width', 'children', 'criteria', 'options', 'scene'])
// 计算当前项是否为依据项，展示分值
const calcBasis = computed(() => (id: any) => {
  let num = ''
  let obj = props.criteria.total.find((o: any) => o.cell_id == id)
  if (obj) {
    num = obj.score
  }
  return num
})
const calcScore = computed(() => (val: any) => {
  let num = ''
  let obj = props.criteria.detail.find((o: any) => o.cell_id == val.id)
  if (obj) {
    num = obj.score
  }
  return num
})
const calcOptions = computed(() => (val: any) => {
  let index = props.options.findIndex((o: any) => o.cell_id == val.id)
  return index
})
const $emit = defineEmits(['handleChoose'])
const handleChoose = () => {
  $emit('handleChoose', props.options)
}
</script>

<style scoped>
.score-cell {
  position: relative;
  padding: 15px 12px;
  font-size: 14px;
  line-height: 18px;
  border-right: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.score-cell.no_border {
  border-right: 0;
}
.score-cell_badge {
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 12px;
  color: var(--color-warning);
  font-size: 14px;
  line-height: 18px;
}
.score-flex_column {
  display: flex;
  flex-direction: column;
}
.hpd-display_flex {
  display: flex;
  flex: 1;
}
</style>
