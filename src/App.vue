<!--
 * @Author: Jinjun Zhuang Cruiter11235@outlook.com
 * @Date: 2024-03-09 11:57:59
 * @LastEditors: Jinjun Zhuang Cruiter11235@outlook.com
 * @LastEditTime: 2024-03-09 17:47:33
 * @FilePath: \zalar\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by cruiter11235@outlook.com, All Rights Reserved. 
-->
<script setup lang="ts">
import cm from "./components/cm/cm.vue";
import xterm from "./components/xterm/xterm.vue"
import lefttop from "./components/lefttop/lefttop.vue";
import righttop from "./components/righttop/righttop.vue"
import dirmanager from "./components/dirmanager/dirmanager.vue";
</script>

<template>
  <el-container class="mainContainer">
    <el-header class="mainHeader">
      <lefttop></lefttop>
      <righttop></righttop>
    </el-header>
    <el-container class="subContainer">
      <el-aside width="200px">
        <dirmanager></dirmanager>
      </el-aside>
      <el-container>
        <el-main class="codeWindow">
          <cm></cm>
        </el-main>
        <el-footer class="terminalwindow" height="30%">
          <xterm></xterm>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<style scoped>
.mainContainer {
  background-color: red;
  margin: auto;
  height: 100vh;
  width: 100vw;
}

.mainHeader {
  height: 5%;
  width: 100%;
  background-color: yellow;
}

.subContainer {
  height: 90%;
  width: 100%;
}

.codeWindow {
  height: 200px;
  background-color: blue;
  padding: 0;
}

.terminalwindow {
  /* overflow: scroll; */
  background-color: green;
  padding: 0;
  /* margin-bottom: 1px; */
}
</style>
