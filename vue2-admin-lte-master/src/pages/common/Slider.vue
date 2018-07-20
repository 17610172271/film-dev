<template>
  <aside id="slider" class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel sidebar-form">
        <div class="pull-left image slide-avatar-container cursor-p slide-avatar" @click="goSetting">
          <img :src="getAuthInfo.avatar ? ($bus.url + getAuthInfo.avatar) : '../../../static/img/home/avatar.png'" class="" alt="User Image">
        </div>
        <div class="pull-left info">
          <p @click="goSetting" class=" cursor-p">{{ getAuthInfo.nickname || '游客' }}</p>
          <a href="#"><i class="fa fa-circle" style="color:rgb(60, 118, 61);"></i> 在线</a>
        </div>
      </div>
      <!-- search form -->
      <form class="sidebar-form">
        <div class="input-group">
          <!-- <input type="text" class="form-control" placeholder="请输入搜索内容..."> -->
          <el-autocomplete
            style="width: 100%;"
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入搜索内容..."
            @select="handleSelect"
          ></el-autocomplete>
          <span class="input-group-btn">
            <a href="javascript:;" class="btn"><i class="fa fa-search"></i>
            </a>
          </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul data-widget="tree" class="sidebar-menu">
        <va-slide-item
          v-for="(item,index) in slideMenuItems"
          :data="item"
          :key="index"
          :type="item.type"
          :isHeader="item.isHeader"
          :icon="item.icon"
          :name="item.name"
          :badge="item.badge"
          :items="item.items"
          :router="item.router"
          :link="item.link"
        >
        </va-slide-item>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
import VASlideItem from '../../components/VASlideItem'
import { mapGetters } from 'vuex'
export default {
  name: 'va-slider',
  props: {
    slideMenuItems: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    restaurants: [
      {
        value: '影片管理',
        router: 'films_list'
      },
      {
        value: '添加影片',
        router: 'films_add'
      },
      {
        value: '影片审核列表',
        router: 'films_check_list'
      },
      {
        value: '影片回收站',
        router: 'films_trash'
      },
      {
        value: '影片属性管理',
        router: 'attr_area'
      },
      {
        value: '影片地区管理',
        router: 'attr_area'
      },
      {
        value: '影片演员管理',
        router: 'attr_actor'
      },
      {
        value: '影片类型管理',
        router: 'attr_type'
      },
      {
        value: '影片语言管理',
        router: 'attr_language'
      },
      {
        value: '权限管理',
        router: 'right_admin'
      },
      {
        value: '管理员管理',
        router: 'right_admin'
      },
      {
        value: '管理员日志',
        router: 'right_log'
      },
      {
        value: '系统基本设置',
        router: 'setting_enter'
      },
      {
        value: '消息-电影录入员',
        router: 'setting_enter'
      },
      {
        value: '消息-电影审核员',
        router: 'setting_checker'
      },
      {
        value: '审核员常用词汇设置',
        router: 'setting_letter'
      },
      {
        value: '常规管理',
        router: 'normalsetting_person'
      },
      {
        value: '个人配置',
        router: 'normalsetting_person'
      },
    ],
    state1: ''
  }),
  computed: {
    ...mapGetters([
      'getAuthInfo',
    ])
  },
  methods: {
    goSetting () {
      this.$router.push({name: 'setting_person'})
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.$router.push({name: item.router})
    }
  },
  created () {
  },
  components: {
    'va-slide-item': VASlideItem
  }
}
</script>
<style>
  .slider-avatar {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
  }
  .slider-avatar img {
    position:  absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .slide-avatar-container {
    width: 45px;
    height: 45px;
    border: 0.5px solid #f5f5f5;
    border-radius: 50%;
  }
  .user-panel>.image .slide-avatar {
    height: 45px;
    border: none;
  }
  .user-panel.sidebar-form {
    border: none;
  }
  @media (max-width: 768px) {
    .navbar-nav {
      padding-right: 0;
    }
    .navbar-nav .nav>li>a {
      padding: 10px 5px;
    }
  }
  @media (min-width: 768px) and (max-width: 1500px) {

  }
  @media (min-width: 1500px) {
    .main-sidebar {
      padding-top: 80px;
    }
/*    .main-sidebar .user-panel {
      padding: 22px 20px 15px;
    }*/
    .slide-avatar-container {
      width: 70px;
      height: 70px;
    }
    .user-panel>.image>img {
      max-width: 70px;
    }
    .user-panel>.image .slide-avatar {
      height: 70px;
    }
    .user-panel>.info {
      left: 80px;
      padding-top: 20px;
    }
    .sidebar-menu>li {
      font-size: 16px;
    }
    .sidebar-menu>li>a {
      padding: 15px 5px 15px 15px;
    }
    .treeview-menu>li>a {
      font-size: 18px;
    }
  }
</style>
