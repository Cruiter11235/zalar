/*
 * @Author: Jinjun Zhuang Cruiter11235@outlook.com
 * @Date: 2024-03-09 11:57:59
 * @LastEditors: Jinjun Zhuang Cruiter11235@outlook.com
 * @LastEditTime: 2024-03-09 17:21:50
 * @FilePath: \zalar\src\main.ts
 * @Description:
 *
 * Copyright (c) 2024 by cruiter11235@outlook.com, All Rights Reserved.
 */
import { createApp } from 'vue'
import '@/mock'

import App from './App.vue'
// import App from "../test/App.vue";

import PluginLoader from './plugins'
import DirectiveLoader from './directive'
import './assets/main.css'
createApp(App).use(PluginLoader).use(DirectiveLoader).mount('#app')
