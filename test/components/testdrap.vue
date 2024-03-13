<template>
    <div>
        <div class="test" draggable="true" v-throttle:drag="data"></div>
        <div class="test" draggable="true" v-debounce:drag="data"></div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const data = ref<DirectiveArgs>({
    callback() {
        console.log("ok");
    },
    delay: 1000
})
</script>
<style scoped>
.test {
    background-color: pink;
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
}
</style>