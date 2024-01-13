<template>
  <div class="table" v-if="datas.id">
    <div class="score-head">
      <div style="text-align: center">
        <h3>{{ datas.name }}</h3>
        <div style="font-size: 14px; color: #606266">{{ datas.desc }}</div>
      </div>
      <div class="score-head_right">
        <el-button type="primary" @click="handleClick('score')">
          立即评分
        </el-button>
        <el-button type="primary" @click="handleClick('preview')">
          预览评分
        </el-button>
        <el-button type="primary" @click="handleClick('manage')">
          管理评分
        </el-button>
        <div class="hpd-margin_right-10">
          分数合计：
          <span style="color: var(--color-danger)">
            {{
              datas && datas.score_criteria && datas.score_criteria.max_score
                ? datas.score_criteria.max_score
                : 0
            }}
          </span>
          分
        </div>
      </div>
    </div>
    <ScoreTemplate
      :datas="datas"
      :scene="manage"
      @handleChoose="handleChoose"
      height="calc(100vh - 110px)"></ScoreTemplate>
  </div>
</template>

<script lang="ts" setup>
import { tablePreview } from '@/constant/table.ts'
import ScoreTemplate from '../components/ScoreTemplate.vue'
import { reactive, ref } from 'vue'
let datas = reactive({})
datas = Object.assign(datas, tablePreview)
let manage = ref('preview')
const handleClick = (val) => {
  manage.value = val
}
const handleChoose = (arr) => {}
</script>

<style scoped>
.table {
  width: 100%;
  padding: 10px;
}
.score-head {
  position: relative;
  margin-bottom: 5px;
}
.score-head_right {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.score-box {
  width: 100%;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-top: 0;
  height: calc(100vh - 230px);
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
