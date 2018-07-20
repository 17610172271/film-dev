<template>
  <div class="relative select-container">
    <div class="ipt-select relative" @click="iptShow = !iptShow">
      <input type="text" class="triangle" disabled v-model="iptName" placeholder="全部状态">
      <div class="triangle triangle-position" v-show="!iptShow"></div>
      <div class="de-triangle triangle-position1" v-show="iptShow"></div>
    </div>
    <ul class="ipt-option" v-show="iptShow">
      <li class="modal1" @click="iptShow=false"></li>
      <li class="option-item" v-for="item in list" @click="doSelect(item)">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: [Number, String],
        default: null
      },
      list: {
        type: Array,
        default: []
      }
    },
    data: () => ({
      iptVal: '',
      iptList: [],
      iptShow: false,
      iptName: ''
    }),
    methods: {
      doSelect (item) {
        this.iptVal = item.id
        this.iptName = item.name
        this.iptShow = false
      }
    },
    mounted () {
      this.iptVal = this.value
      this.iptList = this.list
      this.iptList.map(val => {
        if (val.id === this.iptVal) this.iptName = val.name
      })
    },
    watch: {
      iptVal (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style scoped>
  .select-container {
    width: 200px;
  }
  .ipt-select {
    width: 100%;
    height: 36px;
  }
  .ipt-select input {
    width: 100%;
    height: 36px;
    line-height: 34px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 0px 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: #fff;
  }
  .ipt-option {
    width: 100%;
    height: 200px;
    background-color: #f5f5f5;
    position: absolute;
    top: 0px;
    left: 0;
    border-radius: 4px;
    padding-top: 40px;
    z-index: 8;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; 
  }
  .option-item {
    width: 100%;
    height: 36px;
    line-height: 36px;
    z-index: 8;
    position: relative;
    padding: 0px 20px;
  }
  .option-item:hover {
    background-color: #fff;
    cursor: pointer;
  }
  .triangle-position {
    position: absolute;
    top: 15px;
    right: 8px;
  }
  .triangle-position1 {
    position: absolute;
    top: 8px;
    right: 8px;
  }
</style>
