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
                                <a href="javascript:;" title="添加" class="app-add btn bg-blue1 text-white"
                                   @click="dailogShow('add')"><i class="fa fa-plus-square"></i>添加</a>
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup)"><i
                                    class="fa fa-trash"></i>删除</a>
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
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('名称')!=-1">名称</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('权重')!=-1">权重</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + 1 + index}}
                                </li>
                                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('名称')!=-1">
                                    {{item.name}}
                                </li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('权重')!=-1">
                                    <a href="javascript:;" class="candle-btn-up text-blue" title="上移"
                                       @click="doRight(item.id, 'up')"><i
                                        class="fa fa-long-arrow-up"></i></a>
                                    <a href="javascript:;" class="candle-btn-down text-red" title="下移"
                                       @click="doRight(item.id, 'down')"><i
                                        class="fa fa-long-arrow-down"></i></a>
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">
                                    {{item.status}}
                                </li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="编辑" class="candle-btn btn"
                                       @click="dailogShow('edit', item.id)"><i class="fa fa-edit"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn" @click="delItem([item.id])"><i
                                        class="fa fa-trash"></i></a>
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
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">名称:</div>
                <div class="col-xs-12 col-sm-10">
                    <el-input placeholder="请输入名称" style="max-width: 300px;" v-model="dailogVal.name"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">又名:</div>
                <div class="col-xs-12 col-sm-10">
                    <el-input style="max-width: 300px;" placeholder="请输入又名" v-model="dailogVal.rename"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">简介:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-input type="textarea" placeholder="请输入简介" v-model="dailogVal.desc" rows="4"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">状态:</div>
                <div class="col-xs-12 col-sm-8 line-height-40">
                    <el-radio :label="1" v-model="dailogVal.status">正常</el-radio>
                    <el-radio :label="2" v-model="dailogVal.status">隐藏</el-radio>
                </div>
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
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            loading: false,
            centerDialogVisible: false,
            type: 'add',
            dailogVal: {
                name: null,
                rename: null,
                desc: null,
                status: null
            },
            areaDetail: '',
            selectVal: ['checkbox', '序号', '名称', '权重', '状态', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '名称', '权重', '状态', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '名称',
                    value: null
                },
                {
                    type: 'select',
                    name: '状态',
                    value: null,
                    options: [
                        {
                            value: 1,
                            label: '选项1'
                        },
                        {
                            value: 2,
                            label: '选项2'
                        },
                        {
                            value: 3,
                            label: '选项3'
                        }
                    ]
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1,
            subNavList: {
                parentNode: {
                    name: '影片属性管理',
                    router: {
                        name: 'attr_area'
                    }
                },
                childNode: {
                    name: '影片地区管理',
                    desc: '影片地区列表及设置',
                    router: {
                        name: 'attr_area'
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
                this.$http.get(api.attr.area, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        name: this.searchOptions[0].value,
//                        status:this.searchOptions[1].value
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
                this.$confirm('您将要删除该地区, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.attr.areaDel, {
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
                }).catch(() => {
                })
            },
            doRight(id, type) {
                this.$confirm('您将要提升该地区权重, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.attr.areaRight, {
                        params: {
//                            id: id,
//                            type: type
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '权重操作成功!'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {
                })
            },
            getDetailData (id) {
                this.$http.get(api.attr.areaDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.dailogVal = res.data.data
                        this.areaDetail = JSON.stringify(res.data.data)
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
                    this.dailogVal = JSON.parse(this.areaDetail)
                    console.log(this.dailogVal)
                }
            },
            dailogSubmit () {
                if (this.dailogVal.name && this.dailogVal.rename && this.dailogVal.desc && this.dailogVal.status) {
                    if (this.type === 'add') {
                        this.$http.post(api.attr.areaAdd, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '地区添加成功'
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
                        this.$http.post(api.attr.areaEdit, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '地区编辑成功'
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
            }
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
                this.$router.replace({name: 'attr_area', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>
<style>

</style>
