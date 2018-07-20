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
                                <a href="javascript:;" title="添加" @click="dailogShow('add')"
                                             class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加
                                </a>
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup)"><i
                                    class="fa fa-trash"></i>删除</a>
                                <!-- <div class="app-del btn bg-red1 text-white"><i class="fa fa-minus-square"></i>删除</div> -->
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
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('权重')!=-1">权重</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('常用词汇')!=-1">常用词汇</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('添加人')!=-1">添加人</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('添加时间')!=-1">添加时间</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('排序')!=-1">排序</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + 1 + index}}
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('权重')!=-1">{{item.right}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('常用词汇')!=-1">
                                    {{item.letter}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('添加人')!=-1">
                                    {{item.add_name}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('添加时间')!=-1">
                                    {{item.add_time}}
                                </li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('排序')!=-1">
                                    <a href="javascript:;" class="candle-btn-up text-blue" title="上移" @click="doRight(item.id, 'up')"><i
                                        class="fa fa-long-arrow-up"></i></a>
                                    <a href="javascript:;" class="candle-btn-down text-red" title="下移" @click="doRight(item.id, 'down')"><i
                                        class="fa fa-long-arrow-down"></i></a>
                                </li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="编辑" class="candle-btn btn" @click="dailogShow('edit', item.id)"><i class="fa fa-edit"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn" @click="delItem([item.id])"><i class="fa fa-trash"></i></a>
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
            :title="type==='add'?'添加':'编辑'"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">

            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">词汇名称:</div>
                <div class="col-xs-12 col-sm-10">
                    <el-input style="max-width: 300px;" placeholder="请输入词汇名称" v-model="dailogVal.name"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">权重:</div>
                <div class="col-xs-12 col-sm-10">
                    <el-input style="max-width: 300px;" placeholder="请输入权重" v-model="dailogVal.right"></el-input>
                </div>
            </div>
            <div class="clear m-b-md" v-if="type==='edit'">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">添加人:</div>
                <div class="col-xs-12 col-sm-10 line-height-40">{{dailogVal.add_name}}</div>
            </div>
            <div class="clear m-b-md" v-if="type==='edit'">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">添加时间:</div>
                <div class="col-xs-12 col-sm-10 line-height-40">{{dailogVal.created_time}}</div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="dailogSubmit">确 定</el-button>
                <el-button @click="dailogReset">重 置</el-button>
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
            type: 'add',
            dailogVal: {
                add_name: null,
                name: null,
                created_time: null,
                right: null
            },
            letterDetail: '',
            selectVal: ['checkbox', '序号', '权重', '常用词汇', '添加人', '添加时间', '排序', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '权重', '常用词汇', '添加人', '添加时间', '排序', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '权重',
                    value: null
                },
                {
                    type: 'text',
                    name: '词汇名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '添加人',
                    value: null
                },
                {
                    type: 'time',
                    name: '添加时间',
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
                    name: '系统基本设置',
                    router: {
                        name: 'setting_enter'
                    }
                },
                childNode: {
                    name: '审核员常用词汇设置',
                    desc: '审核员常用词汇列表及设置',
                    router: {
                        name: 'setting_letter'
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
                this.$http.get(api.setting.letter, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        right: this.searchOptions[0].value,
//                        letter: this.searchOptions[1].value,
//                        add_name: this.searchOptions[2].value,
//                        add_time: this.searchOptions[3].value
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
            doRight(id, type) {
                this.$confirm('此操作将升/降该词汇权重, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.setting.letterRight, {
                        params: {
//                            id: id
//                            type: type
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
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
            delItem(id) {
                this.$confirm('此操作将删除该词汇, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.setting.letterDel, {
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
            },
            getDetailData (id) {
                this.$http.get(api.setting.letterDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.dailogVal = res.data.data
                        this.letterDetail = JSON.stringify(res.data.data)
                    }
                })
            },
            resetData () {
                this.dailogVal = {
                    name: null,
                    rename: null,
                    desc: null,
                    status: null
                }
            },
            dailogShow(type, id) {
                this.type = type
                this.centerDialogVisible = true
                if (type === 'edit') {
                    this.getDetailData(id)
                } else {
                    this.resetData()
                }
            },
            dailogReset () {
                if (this.type === 'add') {
                    this.resetData()
                } else {
                    this.dailogVal = JSON.parse(this.letterDetail)
                    console.log(this.dailogVal)
                }
            },
            dailogSubmit () {
                if (this.dailogVal.right && this.dailogVal.name) {
                    if (this.type === 'add') {
                        this.$http.post(api.setting.letterAdd, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '常用词汇添加成功'
                                })
                                this.getList()
                                this.centerDialogVisible = false
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        this.$http.post(api.setting.letterEdit, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '常用词汇编辑成功'
                                })
                                this.getList()
                                this.centerDialogVisible = false
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入内容'
                    })
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
                this.$router.replace({name: 'setting_letter', query: {page: val}})
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
