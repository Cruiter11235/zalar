<!--
 * @Author: Jinjun Zhuang Cruiter11235@outlook.com
 * @Date: 2024-03-09 17:17:56
 * @LastEditors: Jinjun Zhuang Cruiter11235@outlook.com
 * @LastEditTime: 2024-03-09 17:43:00
 * @FilePath: \zalar\src\components\cm\cm.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by cruiter11235@outlook.com, All Rights Reserved. 
-->
<template>
    <codemirror v-model="code" :placeholder="defaultPlaceHolder" :style="cssConfig" :autofocus="true" :tabSize="2"
        :extensions="extensions" :onChange="Change" :onUpdate="change" />
</template>

<script lang="ts" setup>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { CSSProperties, ref } from "vue";
import { EditorView } from "@codemirror/view"

const defaultPlaceHolder = "start here"
// css 
const cssConfig: CSSProperties = {
    height: '100%',
    fontSize: '20px'
}
// props which received
interface IProps {
    height?: string,
}
// props
const props = withDefaults(defineProps<IProps>(), {
    height: '400px'
})
const code = ref(``);
// codemirror extension
const extensions = [javascript(), oneDark];
const change = (text: any) => {
    // console.log(text);
}
const update = (flag: any) => {
    // console.log(flag);
}
</script>
<style scoped></style>
