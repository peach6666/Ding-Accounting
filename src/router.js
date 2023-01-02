import { createRouter,createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

export const router = createRouter({
    //vue3開啟history mode
    history: createWebHistory(),
    routes: [
        {path: '/',component: Home}
    ]
})