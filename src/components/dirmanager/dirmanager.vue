<template>
    <el-tree ref="elTreeRef" style="max-width: 600px" :allow-drop="allowDrop" :allow-drag="allowDrag" :data="treeData"
        draggable node-key="id" @node-drop="handleNodeDrop" @node-click="handleClick" lazy :load="loadNode"
        :props="props"></el-tree>
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type {
  AllowDropType,
  NodeDropType
} from 'element-plus/es/components/tree/src/tree.type'
import { treeData } from './data/test1'
import { reactive, ref } from 'vue'
import axios from '@/http/myAxios'
const elTreeRef = ref(null)
const reactiveData = reactive({
  curr_path: '',
  curr_file: '',
  curr_clickData: {},
  curr_node: {}
})
const props = reactive({
  label: 'name',
  isLeaf: 'isLeaf'
})
// 拖拽成功，让后端更新文件树
const handleNodeDrop = (node: Node, parent: Node, position: any, ev: any) => {
  console.log('拖拽节点', node, parent)
}
// 判断是否能拖拽成功
const allowDrop = (
  draggingNode: Node,
  dropNode: Node,
  type: AllowDropType
) => {
  if (dropNode.data.isLeaf) {
    return false
  } else {
    return true
  }
}
const allowDrag = (draggingNode: Node) => {
  return true
}
//  获取node对象,这一步获取代码数据
const handleClick = (data: any, node: Node) => {
  console.log('点击节点', data, node)
  reactiveData.curr_clickData = data
  reactiveData.curr_node = node
}
const loadNode = (node: Node, resolve: any) => {
  console.log('load ' + node)
  if (node.level == 0) {
    loadFirstNode(node, resolve)
  }
  if (node.level >= 1) {
    loadChildNode(node, resolve)
  }
}
const loadFirstNode = async (node: any, resolve: any) => {
  const params = {
    level: 0
  }
  const res = await getTreeData('/mock/firstNode')
  console.log(res)
  return resolve(res.data.data)
}
const loadChildNode = async (node: any, resolve: any) => {
  const params = {
    level: node.level,
    id: node.id
  }
  const res = await getTreeData('/mock/childNode')
  return resolve(res.data.data)
}
//  get tree data
const getTreeData = async (url: string) => {
  const res = await axios({
    url,
    method: 'post'
  })
  return res
}
</script>
