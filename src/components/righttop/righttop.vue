<template>
    <span class="topright">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </span>
</template>
<script setup lang="ts">

</script>
<style scoped>
.topright {
    margin: auto;
    float: right;
    height: 100%;
    background-color: aqua;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
}

.topright div {
    margin: auto;
    width: 50px;
    height: 80%;
    background-color: black;
    margin-left: 10px;
}
</style>
