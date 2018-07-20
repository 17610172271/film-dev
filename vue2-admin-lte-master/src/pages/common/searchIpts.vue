<template>
  <div class="search-ipts-container clear">
    <div class="search-item col-xs-4 col-sm-4 col-md-4 col-lg-3 m-b-sm p-l-n" v-for="item in searchOptions">
      <div v-if="item.type=='text'">
        <div class="col-xs-4 p-n search-name">{{item.name}}</div>
        <div class="col-xs-8 p-n">
          <el-input
            :placeholder="item.name"
            v-model="item.value"
            clearable>
          </el-input>
        </div>
      </div>
      <div v-if="item.type=='time'">
        <div class="col-xs-4 p-n search-name">{{item.name}}</div>
        <div class="col-xs-8 p-n">
          <el-date-picker
            v-model="item.value"
            type="date"
            style="width: 100%;"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div v-if="item.type=='select'">
        <div class="col-xs-4 p-n search-name">{{item.name}}</div>
        <div class="col-xs-8 p-n">
          <el-select v-model="item.value" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="search-btns col-xs-4 col-sm-4 col-md-4 col-lg-3 m-b-sm p-l-n text-center">
      <a href="javascript:;" class="btn bg-blue1 text-white app-add m-r-sm" @click="submit">提交</a>
      <a href="javascript:;" class="btn bg-gray1 text-white app-add" @click="reset">重置</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['options', 'value'],
    data: () => ({
      searchOptions: {},
    }),
    methods: {
      submit () {
        this.$emit('submit', this.searchOptions)
      },
      reset () {
        for (let i = 0; i < this.searchOptions.length; i++) {
          this.searchOptions[i].value = null
        }
        this.$emit('submit', this.searchOptions)
      }
    },
    mounted () {
      this.searchOptions = this.options
    },
    watch: {
    }
  }
</script>
<style scoped>
  .search-name {
    height: 40px;
    line-height: 40px;
    padding-right: 10px;
    text-align: right;
  }
  .search-btns {
    padding-top: 5px;
  }
</style>