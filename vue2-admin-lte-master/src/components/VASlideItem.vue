<template>
  <router-link tag="li" v-if="router && router.name" :to="router">
    <a href="#">
      <i :class="icon"></i> <span>{{ name }}</span>
      <span class="pull-right-container" v-show="badge">
        <small class="label pull-right" :class="[badge.type==='String'?'bg-green':'label-primary']">{{ badge.data }}</small>
      </span>
    </a>
  </router-link>
  <li :class="getType" v-else>
    {{ isHeader ? name : '' }}
    <a href="#" v-if="!isHeader">
      <i :class="icon"></i> <span>{{ name }}</span>
      <span class="pull-right-container">
        <small v-if="badge && badge.data" class="label pull-right" :class="[badge.type==='String'?'bg-green':'label-primary']">{{ badge.data }}</small>
        <i v-else class="fa fa-angle-left pull-right"></i>
      </span>
    </a>
    <ul class="treeview-menu" v-if="items.length > 0">
      <router-link class="subnav-item-container" tag="li" v-for="(item,index) in items" :data="item" :key="index" :to="item.router" v-if="item.router && item.router.name">
        <a>
          <!-- <i :class="item.icon"></i> --> {{ item.name }}
        </a>
<!--         <ul v-if="item.items" v-show="">
          <router-link tag="li" :key="index1" :to="sub.router" class="text-white" v-for="(sub, index1) in item.items">{{sub.name}}</router-link>
        </ul> -->
      </router-link>
      <li v-else class="subnav-item-container">
        <a>
          <!-- <i :class="item.icon"></i> --> {{ item.name }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'va-slide-item',
  props: {
    type: {
      type: String,
      default: 'item'
    },
    isHeader: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String
    },
    badge: {
      type: Object,
      default () {
        return {}
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    router: {
      type: Object,
      default () {
        return {
          name: ''
        }
      }
    },
    link: {
      type: String,
      default: ''
    }
  },
  created () {

  },
  computed: {
    getType () {
      if (this.isHeader) {
        return 'header'
      }
      return this.type === 'item' ? '' : 'treeview'
    }
  }
}
</script>
<style>
  .treeview-menu > li > a {
    padding-left: 36px;
  }
</style>
