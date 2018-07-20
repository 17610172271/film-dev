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
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('用户名')!=-1">用户名</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('昵称')!=-1">昵称</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('所属组别')!=-1">所属组别</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('Email')!=-1">Email</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('最后登录')!=-1">最后登录</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + 1 + index}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('用户名')!=-1">{{item.name}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('昵称')!=-1">
                                    {{item.nickname}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('所属组别')!=-1">
                                    {{item.team}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('Email')!=-1">
                                    {{item.email}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">
                                    {{item.status}}
                                </li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('最后登录')!=-1">
                                    {{item.login_time}}
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="编辑" class="candle-btn btn"
                                       @click="dailogShow('edit', item.id)"><i class="fa fa-edit"></i></a>
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
            :title="type==='add'?'添加':'编辑'"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">所属组别:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-select v-model="dailogVal.team" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in teamOptions"
                            :key="index"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">用户名:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-input placeholder="请输入用户名" v-model="dailogVal.username"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">Email:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-input placeholder="请输入Email" v-model="dailogVal.email"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">昵称:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-input placeholder="请输入昵称" v-model="dailogVal.nickname"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">手机号:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-input placeholder="请输入手机号" v-model="dailogVal.tel"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">密码:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-input placeholder="请输入密码" type="password" v-model="dailogVal.password"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">登录失败次数:</div>
                <div class="col-xs-12 col-sm-8">
                    <el-input placeholder="请输入登录失败次数" v-model="dailogVal.login_default"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">状态:</div>
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
    import format from '@/tools/format'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            value: null,
            centerDialogVisible: false,
            type: 'add',
            dailogVal: {
                team: null,
                username: null,
                email: null,
                nickname: null,
                tel: null,
                password: null,
                login_default: null,
                status: null
            },
            adminDetail: '',
            selectVal: ['checkbox', '序号', '用户名', '昵称', '所属组别', 'Email', '状态', '最后登录', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '用户名', '昵称', '所属组别', 'Email', '状态', '最后登录', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '用户名',
                    value: null
                },
                {
                    type: 'text',
                    name: '昵称',
                    value: null
                },
                {
                    type: 'select',
                    name: '所属组别',
                    value: null,
                    options: [
                        {
                            value: 1,
                            label: '添加管理组'
                        },
                        {
                            value: 2,
                            label: '审核管理组'
                        },
                        {
                            value: 3,
                            label: '平台管理员'
                        }
                    ]
                },
                {
                    type: 'text',
                    name: 'E-mail',
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
                    type: 'time',
                    name: '最后登录',
                    value: null
                }
            ],
            options: [10, 25, 50],
            teamOptions: [
                {
                    name: '添加管理组',
                    value: 1
                },
                {
                    name: '审核管理组',
                    value: 2
                }
            ],
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
                    name: '管理员管理',
                    desc: '管理员列表信息及操作',
                    router: {
                        name: 'right_admin'
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
                this.$http.get(api.right.admin, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        name: this.searchOptions[0].value,
//                        nickname: this.searchOptions[1].value,
//                        team: this.searchOptions[2].value,
//                        email: this.searchOptions[3].value,
//                        status: this.searchOptions[4].value,
//                        login_time: this.searchOptions[5].value
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
                    this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.right.adminDel, {
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
            getDetailData (id) {
                this.$http.get(api.right.adminDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.dailogVal = res.data.data
                        console.log(this.dailogVal);
                        this.adminDetail = JSON.stringify(res.data.data)
                    }
                })
            },
            resetData () {
                this.dailogVal = {
                    team: null,
                    username: null,
                    email: null,
                    nickname: null,
                    tel: null,
                    password: null,
                    login_default: null,
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
                    this.dailogVal = JSON.parse(this.adminDetail)
                    console.log(this.dailogVal)
                }
            },
            dailogSubmit () {
                console.log(1);
                if (this.dailogVal.username && this.dailogVal.team && this.dailogVal.email && this.dailogVal.nickname && this.dailogVal.tel
                    && this.dailogVal.password && this.dailogVal.login_default && this.dailogVal.status) {
                    if (this.type === 'add') {
                        this.$http.post(api.right.adminAdd, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '管理员添加成功'
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
                        this.$http.post(api.right.adminEdit, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '管理员信息编辑成功'
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
                this.$router.replace({name: 'right_admin', query: {page: val}})
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
