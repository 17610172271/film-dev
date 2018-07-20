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
                                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                                    class="fa fa-refresh"></i></div>
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
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('是否已读')!=-1">是否已读</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('ID')!=-1">{{item.id}}</li>
                                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1">
                                    {{item.film_name}}
                                </li>
                                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1">
                                    {{item.created_time}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">
                                    {{item.status}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('是否已读')!=-1">
                                    {{item.is_read}}
                                </li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="通过" class="candle-btn btn" @click="checkItem(item.id, 'pass')"><i class="fa fa-check"></i></a>
                                    <a href="javascript:;" title="不通过" class="candle-btn btn" @click="checkItem(item.id, 'notpass')"><i
                                        class="fa fa-close"></i></a>
                                    <a href="javascript:;" title="详情" class="candle-btn btn" @click="dailogShow(item.id)"><i
                                        class="fa fa-search-plus"></i></a>
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
            title="详情"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">ID:</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.id}}</div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">电影名称:</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.film_name}}</div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">创建时间:</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.created_time}}</div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">状态:</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.status}}</div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">是否已读:</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.is_read}}</div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="dailogSubmit">确 定</el-button>
                <el-button @click="centerDialogVisible=false">取 消</el-button>
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
            dailogVal: {
                film_name: '',
                id: '',
                created_time: '',
                is_read: '',
                status: ''
            },
            selectVal: ['ID', '电影名称', '创建时间', '状态', '是否已读', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['ID', '电影名称', '创建时间', '状态', '是否已读', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: 'ID',
                    value: null
                },
                {
                    type: 'text',
                    name: '电影名称',
                    value: null
                },
                {
                    type: 'time',
                    name: '创建时间',
                    value: null
                },
                {
                    type: 'select',
                    name: '状态',
                    value: null,
                    options: [
                        {
                            value: 1,
                            label: '已上线'
                        },
                        {
                            value: 2,
                            label: '已下线'
                        }
                    ]
                },
                {
                    type: 'select',
                    name: '是否已读',
                    value: null,
                    options: [
                        {
                            value: 1,
                            label: '是'
                        },
                        {
                            value: 2,
                            label: '否'
                        }
                    ]
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1,
            loading: false,
            subNavList: {
                parentNode: {
                    name: '系统基本设置',
                    router: {
                        name: 'setting_enter'
                    }
                },
                childNode: {
                    name: '消息-电影审核员',
                    desc: '电影审核列表',
                    router: {
                        name: 'setting_checker'
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
                this.$http.get(api.setting.check, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        id: this.searchOptions[0].value,
//                        film_name: this.searchOptions[1].value,
//                        created_time: this.searchOptions[2].value,
//                        status: this.searchOptions[3].value,
//                        is_read: this.searchOptions[4].value
                    }
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data
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
            checkItem(id, type) {
                this.$confirm('此操作将通过/不通过该消息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.setting.newsCheck, {
                        params: {
//                            id: id
//                            type: type
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
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
            },
            dailogShow (id) {
                this.centerDialogVisible = true
                this.getDetailData(id)
            },
            getDetailData (id) {
                this.$http.get(api.setting.checkDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.dailogVal = res.data.data
                    }
                })
            },
            dailogSubmit () {},
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
                this.$router.replace({name: 'setting_checker', query: {page: val}})
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
