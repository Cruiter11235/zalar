<template>
    <span class="icon-container">
        <el-image :src="url" style="width: 150px; height: 100%" :fit="fit"></el-image>
    </span>
</template>
<script setup lang="ts">
const fit = 'fill'
const url = '/src/assets/icon.png'
</script>
<style scoped>
.icon-container {
    /* background-color: aqua; */
    width: 200px;
    height: 100%;
}
</style>
