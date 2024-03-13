<template>
    <button @click="sendquery">testaxios</button>
    <button @click="sendquerytwo">status</button>
    <button @click="sendPost">sendPost</button>
</template>
<script setup lang="ts">
import axios from "@/http/myAxios";
const sendquery = () => {
    axios({
        url: "/",
        method: "get",
        params: {
            id: 123
        },
    }).then((res) => {
        console.log(res.data);
    });
}
const sendquerytwo = () => {
    axios({
        url: "/status",
        method: "get",
        params: {},
    }).then((res) => {
        console.log(res.data);
    });
}
const sendPost = () => {
    axios({
        url: "/test/post",
        method: "post",
        data: {
            id: 123
        }
    }).then((res) => {
        console.log(res.data);
    })
}
</script>
<style scoped></style>