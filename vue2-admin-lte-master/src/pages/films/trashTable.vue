<template>
    <div>
        <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
        <div class="page-toolbar clear">
            <div class="pull-left toolbar-candle">
                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
            </div>
            <div class="pull-right clear">
                <div class="pull-left m-r-sm opacity-8" title="列">
                    <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
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
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('时长')!=-1">时长</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('语言')!=-1">语言</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('导演')!=-1">导演</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('演员')!=-1">演员</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('类型')!=-1">类型</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('上映时间')!=-1">上映时间</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
            </ul>
            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                </li>
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + 1 + index}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1">{{item.film_name}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('时长')!=-1">{{item.time_length}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('语言')!=-1">{{item.language}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('导演')!=-1">{{item.director}}</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('演员')!=-1">{{item.actor}}</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('类型')!=-1">{{item.type}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('上映时间')!=-1">{{item.release_date}}</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                    <a href="javascript:;" title="还原" class="candle-btn btn" @click="resetFilm(item.id)"><i class="fa fa-undo"></i></a>
                    <router-link :to="{name: 'films_edit', params: {id: item.id}}" title="编辑" class="candle-btn btn"><i
                        class="fa fa-edit"></i></router-link>
                </li>
            </ul>
        </div>
        <div class="footer clear m-t-md">
            <div class="pull-left news-record text-lg">
                <span v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>共<span
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
</template>
<script type="text/ecmascript-6">
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import api from '@/api'
    export default {
        components: {
            SelectCheckbox,
            SearchIpts
        },
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            loading: false,
            selectVal: ['checkbox', '序号', '电影名称', '时长', '语言', '导演', '演员', '类型', '上映时间', '审核状态', '状态', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '电影名称', '时长', '语言', '导演', '演员', '类型', '上映时间', '审核状态', '状态', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '电影名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '时长',
                    value: null
                },
                {
                    type: 'text',
                    name: '语言',
                    value: null
                },
                {
                    type: 'text',
                    name: '导演',
                    value: null
                },
                {
                    type: 'text',
                    name: '演员',
                    value: null
                },
                {
                    type: 'text',
                    name: '类型',
                    value: null
                },
                {
                    type: 'time',
                    name: '上映时间',
                    value: null
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1
        }),
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
                this.$http.get(api.films.trashList, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        film_name: this.searchOptions[0].value,
//                        time_length: this.searchOptions[1].value,
//                        language: this.searchOptions[2].value,
//                        director: this.searchOptions[3].value,
//                        actor: this.searchOptions[4].value,
//                        type: this.searchOptions[5].value,
//                        release_date: this.searchOptions[6].value
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
            resetFilm(id) {
                this.$confirm('您确定要还原该影片?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.films.reset, {
                        params: {
//                            id: id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '影片还原成功'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'waring',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {
                })
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
                this.$router.replace({name: 'films_trash', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>