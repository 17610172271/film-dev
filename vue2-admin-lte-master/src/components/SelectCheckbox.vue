<template>
  <div class="relative select-container">
    <div class="ipt-select relative" @click="iptShow = !iptShow">
      <i class="fa fa-th"></i>
      <div class="triangle triangle-position" v-show="!iptShow"></div>
      <div class="de-triangle triangle-position1" v-show="iptShow"></div>
    </div>
    <div class="modal1" v-show="iptShow" @click="iptShow=false"></div>
    <ul class="ipt-option" v-show="iptShow">
      <li class="option-item" v-for="item in list">
        <!-- <input type="checkbox" v-model="currentVal" :value="item"> -->
        <el-checkbox v-model="currentVal" :label="item"></el-checkbox>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Array,
        default: []
      },
      list: {
        type: Array,
        default: []
      }
    },
    data: () => ({
      iptShow: false,
      currentVal: [1, 2]
    }),
    // computed: {
    //   currentVal () {
    //     return this.value ? this.value : []
    //   }
    // },
    mounted () {
      this.currentVal = this.value ? this.value : []
    },
    watch: {
      currentVal (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.currentVal = val
      }
    }
  }
</script>
<style scoped>
  .select-container {
    width: 200px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .select-container .fa-th {
    position: absolute;
    top: 10px;
    left: 12px;
    font-size: 16px;
  }
  .ipt-select {
    width: 100%;
    height: 38px;
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
    right: 0;
    z-index: 9;
  }
  .ipt-option {
    width: 140px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #eee;
    position: absolute;
    top: 38px;
    right: 0;
    left: inherit;
    padding-top: 0;
    border-radius: 4px;
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
  .option-item label {
    width: 100%;
    height: 100%;
  }
  .option-item label input {
    width: 14px;
    height: 14px;
    vertical-align: -2px;
  }
  .triangle-position {
    position: absolute;
    top: 15px;
    right: 8px;
  }
  .opacity-8:hover .triangle-position {
    border-top-color: #666;
  }
  .opacity-8:hover .triangle-position1 {
    border-bottom-color: #666;
  }
  .triangle-position1 {
    position: absolute;
    top: 8px;
    right: 8px;
  }
</style>
