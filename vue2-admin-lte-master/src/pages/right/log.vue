<template>
    <div class="scroll-x">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm" v-loading="loading">
                    <div>
                        <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                        <div class="page-toolbar clear">
                            <div class="pull-left toolbar-candle">
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup)">
                                    <i class="fa fa-trash"></i>删除
                                </a>
                                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh">
                                    <i class="fa fa-refresh"></i>
                                </div>
                            </div>
                            <div class="pull-right clear">
                                <div class="pull-left m-r-sm opacity-8" title="列">
                                    <select-checkbox :list="showList" v-model="selectVal"
                                                     style="width: 60px;"></select-checkbox>
                                </div>
                                <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                                    class="fa fa-search" title="搜索"></i></div>
                            </div>
                        </div>
                        <div class="lk-table m-t-sm">
                            <ul class="table-thead clear">
                                <!-- <li class="col-lg-1 col-md-1 col-sm-1 col-xs-1 clear app-first-item" v-if="selectVal.indexOf('ID')!=-1"><div class="pull-left"><input type="checkbox" v-model="selectAll"></div><div class="pull-left">ID</div></li> -->
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('用户名')!=-1">用户名</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('Url')!=-1">Url</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('IP')!=-1">IP</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('Browser')!=-1">Browser</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">{{offset + 1 + index}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('用户名')!=-1">{{item.name}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1">{{item.title}}
                                </li>
                                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('Url')!=-1">{{item.url}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('IP')!=-1">{{item.ip}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('Browser')!=-1">
                                    {{item.browser}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1">
                                    {{item.created_time}}
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="详情" class="candle-btn btn"
                                       @click="centerDialogVisible=true"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn"
                                       @click="delItem([item.id])"><i class="fa fa-trash"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer clear m-t-md">
                            <div class="pull-left news-record text-lg">
                                <span
                                    v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>共<span
                                class="text-blue">{{data.total}}</span>条记录 每页显示
                                <el-select v-model="limit" placeholder="请选择" style="width: 66px;">
                                    <el-option
                                        v-for="(item,index) in options"
                                        :key="index"
                                        :label="item"
                                        :value="item">
                                    </el-option>
                                </el-select>
                                条记录
                            </div>
                            <div class="pull-right">
                                <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :current-page.sync="page"
                                    :page-count="pages">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="编辑"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="border-top-blue">
                <ul class="clear">
                    <li class="col-xs-3 line-height-40 attr-edit-name">标题</li>
                    <li class="col-xs-9 line-height-40">内容</li>
                </ul>
                <ul class="clear bg-f9">
                    <li class="col-xs-3 line-height-40 attr-edit-name">ID</li>
                    <li class="col-xs-9 line-height-40">1234</li>
                </ul>
                <ul class="clear">
                    <li class="col-xs-3 line-height-40 attr-edit-name">admin_id</li>
                    <li class="col-xs-9 line-height-40">5</li>
                </ul>
                <ul class="clear bg-f9">
                    <li class="col-xs-3 line-height-40 attr-edit-name">用户名</li>
                    <li class="col-xs-9 line-height-40">pingtai</li>
                </ul>
                <ul class="clear">
                    <li class="col-xs-3 line-height-40 attr-edit-name">url</li>
                    <li class="col-xs-9 line-height-40">/admin/index/login</li>
                </ul>
                <ul class="clear bg-f9">
                    <li class="col-xs-3 line-height-40 attr-edit-name">标题</li>
                    <li class="col-xs-9 line-height-40">登录</li>
                </ul>
                <ul class="clear">
                    <li class="col-xs-3 line-height-40 attr-edit-name">内容</li>
                    <li class="col-xs-9 line-height-40">好的号戽水抗旱估计是刚开会可视电话刚开始各环节的</li>
                </ul>
                <ul class="clear bg-f9">
                    <li class="col-xs-3 line-height-40 attr-edit-name">ip</li>
                    <li class="col-xs-9 line-height-40">192.168.1.1</li>
                </ul>
                <ul class="clear">
                    <li class="col-xs-3 line-height-40 attr-edit-name">useagent</li>
                    <li class="col-xs-9 line-height-40">Mozilla/5.0(Windows)</li>
                </ul>
                <ul class="clear bg-f9">
                    <li class="col-xs-3 line-height-40 attr-edit-name">creattime</li>
                    <li class="col-xs-9 line-height-40">2018-06-28 22:12:00</li>
                </ul>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                <el-button @click="centerDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            centerDialogVisible: false,
            selectVal: ['checkbox', 'ID', '用户名', '标题', 'Url', 'IP', 'Browser', '创建时间', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', 'ID', '用户名', '标题', 'Url', 'IP', 'Browser', '创建时间', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '用户名',
                    value: null
                },
                {
                    type: 'text',
                    name: '标题',
                    value: null
                },
                {
                    type: 'text',
                    name: 'Url',
                    value: null
                },
                {
                    type: 'text',
                    name: 'IP',
                    value: null
                },
                {
                    type: 'text',
                    name: 'Browser',
                    value: null
                },
                {
                    type: 'time',
                    name: '创建时间',
                    value: null
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1,
            loading: false,
            subNavList: {
                parentNode: {
                    name: '权限管理',
                    router: {
                        name: 'right_admin'
                    }
                },
                childNode: {
                    name: '管理员日志',
                    desc: '管理员日志列表及操作',
                    router: {
                        name: 'right_log'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            SelectCheckbox,
            SearchIpts
        },
        computed: {
            pages () {
                return this.data ? Math.ceil(this.data.total / this.limit) : 1
            },
            offset () {
                return (this.page - 1) * this.limit
            }
        },
        methods: {
            getList () {
                this.loading = true
                this.$http.get(api.right.log, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        name: this.searchOptions[0].value,
//                        title: this.searchOptions[1].value,
//                        url: this.searchOptions[2].value,
//                        ip: this.searchOptions[3].value,
//                        browser: this.searchOptions[4].value,
//                        created_time: this.searchOptions[5].value
                    }
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.selectedGroup = []
                        console.log(res)
                    } else {
                        this.data.rows = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            doSearch (data) {
                this.searchOptions = data
                this.getList()
            },
            refresh () {
                this.getList()
            },
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm('此操作将删除该条管理员日志, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.right.logDel, {
                            params: {
//                            id: id
                            }
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                this.getList()
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    }).catch(() => {})
                }
            },
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            delPage () {
                if (this.page > 1) this.page -= 1
            },
            format: format
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            selectedGroup (val) {
                console.log(val)
                if (val.length === this.data.rows.length) {
                    this.selectAll = true
                }
            },
            selectAll (val) {
                if (val) {
                    this.selectedGroup = []
                    this.data.rows.map(val => {
                        this.selectedGroup.push(val.id)
                    })
                } else {
                    this.selectedGroup = []
                }
            },
            page (val) {
                this.$router.replace({name: 'right_log', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>
<style scoped>
    .lk-table .p-n {
        padding-left: 0;
        padding-right: 0;
    }
</style>
