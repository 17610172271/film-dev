import Vue from 'vue'
import Router from 'vue-router'
// import bus from '../lib/eventBus.js'
Vue.use(Router)
const rs = path => {
    return resolve => require(['@/pages/' + path], resolve)
}
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: rs('home/index'),
            children: [
                {
                    path: '/',
                    name: 'home',
                    meta: {requreAuth: true},
                    component: rs('home/home')
                },
                {
                    path: '/films',
                    component: rs('films/index'),
                    meta: {requreAuth: true},
                    children: [
                        {
                            path: 'list',
                            name: 'films_list',
                            component: rs('films/list')
                        },
                        {
                            path: 'add',
                            name: 'films_add',
                            component: rs('films/add')
                        },
                        {
                            path: 'edit/:id',
                            name: 'films_edit',
                            component: rs('films/add')
                        },
                        {
                            path: 'detail/:id',
                            name: 'films_detail',
                            component: rs('films/detail')
                        },
                        {
                            path: 'checkList',
                            name: 'films_check_list',
                            component: rs('films/checkList')
                        },
                        {
                            path: 'trash',
                            name: 'films_trash',
                            component: rs('films/trash')
                        }
                    ]
                },
                {
                    path: '/attr',
                    component: rs('attr/index'),
                    meta: {requreAuth: true},
                    children: [
                        {
                            path: 'area',
                            name: 'attr_area',
                            component: rs('attr/area')
                        },
                        {
                            path: 'actor',
                            name: 'attr_actor',
                            component: rs('attr/actor')
                        },
                        {
                            path: 'type',
                            name: 'attr_type',
                            component: rs('attr/type')
                        },
                        {
                            path: 'language',
                            name: 'attr_language',
                            component: rs('attr/language')
                        }
                    ]
                },
                {
                    path: '/right',
                    component: rs('right/index'),
                    meta: {requreAuth: true},
                    children: [
                        {
                            path: 'admin',
                            name: 'right_admin',
                            component: rs('right/admin')
                        },
                        {
                            path: 'log',
                            name: 'right_log',
                            component: rs('right/log')
                        }
                    ]
                },
                {
                    path: '/setting',
                    component: rs('setting/index'),
                    meta: {requreAuth: true},
                    children: [
                        {
                            path: 'enter',
                            name: 'setting_enter',
                            component: rs('setting/enter')
                        },
                        {
                            path: 'checker',
                            name: 'setting_checker',
                            component: rs('setting/checker')
                        },
                        {
                            path: 'letter',
                            name: 'setting_letter',
                            component: rs('setting/letter')
                        }
                    ]
                },
                {
                    path: '/normal',
                    component: rs('normalsetting/index'),
                    meta: {requreAuth: true},
                    children: [
                        {
                            path: 'setting',
                            name: 'normalsetting_person',
                            component: rs('normalsetting/setting')
                        }
                    ]
                },
                {
                    path: '/login',
                    name: 'login',
                    component: rs('common/login')
                },
                {
                    path: '/404',
                    name: '404',
                    component: rs('common/404')
                },
                {
                    path: '/500',
                    name: '500',
                    component: rs('common/500')
                }
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            if (!to.query.chartData) {
                setTimeout(() => {
                    resolve({x: 0, y: 0})
                }, 500)
            }
        })
    },
    linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
    // 判断去往的页面是否需要登录
    if (to.matched.some(record => record.meta.requreAuth) && !window.localStorage.getItem('Auth')) {
        next({
            path: '/login',
            query: {from: to.fullPath}
        })
    } else {
        next()
    }
})
export default router
