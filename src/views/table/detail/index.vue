<template>
  <div class="rd">
    <table>
      <thead>
        <tr>
          <th
            :colspan="datas.header.length + 1"
            class="sticky"
            style="left: 0px">
            评分表
          </th>
          <th
            class="sticky"
            :style="`left:${
              datas.header.length * 150 + 60
            }px;background-size:0 100%, 100% 1px`">
            <div style="padding: 3px 5px">评分记录</div>
          </th>
          <th
            :colspan="datas.recordsInfo.length - 1"
            class="hpd-text_align-left z-idx4"></th>
        </tr>
        <tr>
          <th
            v-for="(h, hdx) of datas.header"
            :key="`head_${hdx}`"
            style="width: 150px"
            class="sticky"
            :style="`left:${hdx * 150}px;top:36px`">
            <div style="padding: 3px 5px">{{ h.name }}</div>
          </th>
          <th
            style="width: 60px"
            class="sticky"
            :style="`left:${datas.header.length * 150}px;top:36px`">
            <div style="padding: 3px 5px">评分分值</div>
          </th>
          <template v-if="datas.recordsInfo.length">
            <th
              style="width: 90px"
              class="sticky"
              :style="`left:${datas.header.length * 150 + 60}px;top:36px;`">
              <div class="rd-head_item-text">
                {{ datas.recordsInfo[0].score_at }}
              </div>
              <div>{{ datas.recordsInfo[0].scorer_name }}</div>
            </th>
            <template v-for="(s, sdx) of datas.recordsInfo">
              <th
                v-if="sdx > 0"
                :key="`date_${sdx}`"
                style="width: 90px; top: 36px; z-index: 3"
                class="sticky">
                <div class="rd-head_item-text">{{ s.score_at }}</div>
                <div>{{ s.scorer_name }}</div>
              </th>
            </template>
          </template>
        </tr>
        <tr>
          <th
            :colspan="datas.header.length + 1"
            class="hpd-text_align-right sticky"
            style="left: 0px; top: 72px">
            <div style="padding: 3px 5px">总分</div>
          </th>
          <template v-if="datas.recordsInfo.length">
            <th
              class="sticky"
              :style="`left:${datas.header.length * 150 + 60}px;top:72px`">
              {{ datas.recordsInfo[0].score }}
            </th>
            <template v-for="(s, sdx) of datas.recordsInfo">
              <th
                v-if="sdx > 0"
                :key="`total_${sdx}`"
                style="top: 72px"
                class="sticky z-idx4">
                {{ s.score }}
              </th>
            </template>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, ldx) in listArr" :key="`list_${ldx}`">
          <template v-for="(c, cdx) in l.column">
            <td
              :key="`column_${cdx}`"
              v-if="c.rowspan"
              :rowspan="c.rowspan ? c.rowspan : ''"
              class="sticky"
              :style="`left:${cdx * 150}px`">
              {{ c.content }}
            </td>
          </template>
          <td
            class="sticky"
            :style="`left:${(datas.header.length - 1) * 150}px`">
            {{ l.content }}
          </td>
          <td class="sticky" :style="`left:${datas.header.length * 150}px`">
            {{ calcScore(l) }}
          </td>
          <template v-if="calcOptions(l) > -1">
            <template
              v-for="(s, sdx) in datas.scoreRecords[calcOptions(l)].scores">
              <td
                :key="`score_${sdx}`"
                :rowspan="l.rowspan ? l.rowspan : ''"
                v-if="sdx == 0"
                class="sticky"
                :style="`left:${datas.header.length * 150 + 60}px;`">
                {{ s }}
              </td>
              <td
                :key="`score_1${sdx}`"
                :rowspan="l.rowspan ? l.rowspan : ''"
                v-else>
                {{ s }}
              </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { tableDetail } from '../../../constant/table'
import { reactive, computed } from 'vue'
let datas = reactive<any>({})
let listArr = reactive<any>([])
let nodeMap = reactive<any>(new Map())
// 计算每项分值
const calcScore = computed(() => (val: any) => {
  let num = ''
  let obj = datas.score_criteria.detail.find((o) => o.cell_id == val.id)
  if (obj) {
    num = obj.score
  }
  return num
})
// 计算选项
const calcOptions = computed(() => (val) => {
  let index = datas.scoreRecords.findIndex((o) => o.cell_id == val.basis_id)
  return index
})
const filterData = (node: any) => {
  let parentNode = nodeMap.get(node.pid)
  if (parentNode) {
    node.ids = parentNode.ids ? parentNode.ids : {}
    node.ids[`${parentNode.level}`] = parentNode.id
  }
  nodeMap.set(node.id, node)
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      filterData(node.children[i])
    }
  }
}
const getInit = () => {
  nodeMap.clear()
  datas = Object.assign(datas, tableDetail)
  let list = JSON.parse(JSON.stringify(tableDetail.cell))
  for (let i = 0; i < list.length; i++) {
    filterData(list[i])
  }
  let arr: any = []
  let p: any = {
    column: [],
    basis_id: 0,
    rowspan: 0,
  }
  for (let value of nodeMap.values()) {
    if (value.level == datas.header.length) {
      arr.push({ ...value, ...p })
    }
  }
  arr = arr.reverse()
  let head = {}
  for (let o = 0; o < datas.header.length - 1; o++) {
    head[o] = 0
  }
  let arr1 = JSON.parse(JSON.stringify(arr))
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < datas.header.length - 1; j++) {
      let obj = JSON.parse(JSON.stringify(nodeMap.get(arr1[i].ids[`${j + 1}`])))
      head[j]++
      if (
        !arr1[i + 1] ||
        arr1[i].ids[`${j + 1}`] != arr1[i + 1].ids[`${j + 1}`]
      ) {
        obj.rowspan = head[j]
        if (datas.scoreRecords.findIndex((o) => o.cell_id == obj.id) > -1) {
          arr1[i].rowspan = head[j]
          arr1[i].basis_id = obj.id
        }
        head[j] = 0
      }
      arr1[i].column[j] = obj
    }
  }
  let arr2 = JSON.parse(JSON.stringify(arr1))
  return arr2.reverse()
}
listArr.length = 0
listArr.push(...getInit())
</script>
<style scoped>
.rd {
  max-width: 1700px;
  margin: 0 auto;
  min-height: 700px;
  height: calc(100vh - 60px);
  border: 1px solid #dcdfe6;
  overflow: auto;
  width: max-content;
}
table {
  border: none;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
  background: white;
  text-align: center;
  color: #303133;
  font-size: 12px;
  width: max-content;
}
table thead tr th {
  font-weight: normal;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: #f9f9f9;
  height: 36px;
  background-image: linear-gradient(#dcdfe6, #dcdfe6),
    linear-gradient(#dcdfe6, #dcdfe6);
  background-repeat: no-repeat;
  background-size:
    1px 100%,
    100% 1px;
  background-position:
    right top,
    right bottom;
}
table thead tr th.sticky {
  position: sticky;
  position: -webkit-sticky;
}
.z-idx3 {
  z-index: 3;
}
.z-idx4 {
  z-index: 4;
}
table tbody tr td {
  height: 36px;
  padding: 3px 5px;
  z-index: 2;
  background-color: #ffffff;
  background-image: linear-gradient(#dcdfe6, #dcdfe6),
    linear-gradient(#dcdfe6, #dcdfe6);
  background-repeat: no-repeat;
  background-size:
    1px 100%,
    100% 1px;
  background-position:
    right top,
    right bottom;
}
table tbody tr td.sticky {
  position: sticky;
  position: -webkit-sticky;
}
.rd-head_item-text {
  width: 90px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
}
.hpd-text_align-left {
  text-align: left;
}

.hpd-text_align-center {
  text-align: center;
}

.hpd-text_align-right {
  text-align: right !important;
}
</style>
