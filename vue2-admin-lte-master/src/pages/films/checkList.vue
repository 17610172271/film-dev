<template>
  <div class="scroll-x">
    <div class="p-lg appli-container">
      <sub-header :list="subNavList"></sub-header>
      <div class="page-container">
        <div class="m-t-sm" v-loading="loading">
          <el-tabs type="card" v-model="tab" @tab-click="handleClick">
            <el-tab-pane label="全部" name="all"><tab v-if="tab==='all'"></tab></el-tab-pane>
            <el-tab-pane label="未审核" name="notcheck"><tab v-if="tab==='notcheck'"></tab></el-tab-pane>
            <el-tab-pane label="审核未通过" name="notpass"><tab v-if="tab==='notpass'"></tab></el-tab-pane>
            <el-tab-pane label="审核通过" name="pass"><tab v-if="tab==='pass'"></tab></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div> 
  </div>
</template>
<script type="text/ecmascript-6">
  import SubHeader from '../common/subheader'
  import Tab from './checkTable.vue'
  import api from '@/api'
  import format from '@/tools/format'
  export default {
    data: () => ({
      data: '',
      loading: false,
      tab: 'all',
      subNavList: {
        parentNode: {
          name: '影片管理',
          router: {
            name: 'films_list'
          }
        },
        childNode: {
          name: '影片审核列表',
          desc: '影片列表信息及影片审核',
          router: {
            name: 'films_check_list'
          }
        }
      }
    }),
    components: {
      SubHeader,
      Tab
    },
    methods: {
      handleClick () {
        this.$router.replace({name: 'films_check_list', query: {type: this.tab, page: 1}})
      }
    },
    created () {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
      // this.getList()
    }
  }
</script>
<style scoped>
.lk-table .p-n {
  padding-left: 0;
  padding-right: 0;
}
</style>
