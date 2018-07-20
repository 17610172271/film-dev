<template>
	<div class="clear" v-if="navList.childNode">
		<div class="pull-left content-nav">{{navList.childNode.name}}<span class="content-muted-xs hidden-xs">{{navList.childNode.desc}}</span></div>
    <ul class="pull-right clear content-subnav m-t-sm hidden-xs hidden-sm">
      <li class="pull-left" @click="backPrepage">返回上一级</li>
      <router-link tag="li" :to="navList.parentNode.router" class="pull-left">{{navList.parentNode.name}}</router-link>
      <router-link tag="li" :to="navList.childNode.router" class="pull-left">{{navList.childNode.name}}</router-link>
    </ul>
	</div>
</template>
<script>
  export default {
    props: {
      list: {}
    },
    data: () => ({
      navList: {
        parentNode: {
          name: '影片管理',
          router: {
            name: 'films_list'
          }
        },
        childNode: {
          name: '影片列表',
          desc: '页面功能性描述，简要解释该模块做什么用的',
          router: {
            name: 'films_list'
          }
        }
      }
    }),
    methods: {
      backPrepage () {
        this.$router.go(-1)
      }
    },
    mounted () {
      this.navList = this.list
    },
    watch: {
      list (val) {
        this.navList = val
      }
    }
  }
</script>
<style>
  .content-nav {
    font-size: 22px;
    color: #000;
  }
  .content-muted-xs {
    font-size: 16px;
    color: #666;
    padding-left: 10px;
  }
  .content-subnav > li {
    border-right: 1px solid #C5CBD1;
    padding: 0 10px;
    cursor: pointer;
    color: #2685EE;
  }
  .content-subnav > li:last-child {
    border-right: 0;
    color: #666666;
  }
  @media (max-width: 768px) {
    .content-nav {
      padding-left: 10px;
    }
  }
</style>
