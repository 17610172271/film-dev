<template>
  <div class="scroll-x">
    <div class="p-lg appli-container">
      <sub-header :list="subNavList"></sub-header>
      <div class="page-container">
        <div class="m-t-sm">
          <tab></tab>
        </div>
      </div>
    </div> 
  </div>
</template>
<script type="text/ecmascript-6">
  import SubHeader from '../common/subheader'
  import Tab from './trashTable.vue'
  export default {
    data: () => ({
      data: '',
      tab: 'all',
      subNavList: {
        parentNode: {
          name: '影片管理',
          router: {
            name: 'films_list'
          }
        },
        childNode: {
          name: '影片回收站',
          desc: '影片回收列表及恢复',
          router: {
            name: 'films_trash'
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
        this.$router.replace({name: 'films_check_list', query: {type: this.tab}})
      }
    },
    created () {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    }
  }
</script>
<style scoped>
.lk-table .p-n {
  padding-left: 0;
  padding-right: 0;
}
</style>
