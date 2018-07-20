<template>
  <div class="border-top">
    <!-- <sub-header :list="subNavList"></sub-header> -->
    <div class="bg-white p-v-sm">
<!--       <div class="p-v-sm border-bottom text-xlg">基本信息</div> -->
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm">中文名称:</div>
          <div class="col-xs-9 p-v-sm">请输入中文名称</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm">时长/分钟:</div>
          <div class="col-xs-9 p-v-sm">请输入时长</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm">英文名称:</div>
          <div class="col-xs-9 p-v-sm">请输入英文名称</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm">影片分类:</div>
          <div class="col-xs-9 p-v-sm">
            <span class="p-o-sm">爱情</span>
            <span class="p-o-sm">爱情</span>
            <span class="p-o-sm">爱情</span>
            <span class="p-o-sm">爱情</span>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">国家:</div>
          <div class="col-xs-9 p-v-sm">德国</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">导演/主讲:</div>
          <div class="col-xs-9 p-v-sm">张艺谋</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">演员:</div>
          <div class="col-xs-9 p-v-sm">孙红雷,黄渤,张艺兴</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">语言:</div>
          <div class="col-xs-9 p-v-sm">英语, 国语</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">编剧:</div>
          <div class="col-xs-9 p-v-sm">张三</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">上映时间:</div>
          <div class="col-xs-9  p-v-sm">2018-06-28</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">海报(横向):</div>
          <div class="col-xs-9 p-v-sm">img</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">是否最新上映:</div>
          <div class="col-xs-9 p-v-sm">是</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">影片描述:</div>
          <div class="col-xs-9 p-v-sm">就是轱辘扩过付军或过扩多军付过军扩多付扩过军扩多付过付多多扩扩扩扩扩付多军扩所</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">是否自有内容:</div>
          <div class="col-xs-9 p-v-sm">是</div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-o-n text-right film-add-name p-v-sm contry-p-r">是否收费:</div>
          <div class="col-xs-9 p-v-sm">是</div>
        </div>
      </div>
      <div class="clear p-o-md">
        <div class="row p-v-sm text-lg text-bold border-bottom">原始视频</div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">原始视频地址:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">原始音频地址:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">原始字幕地址:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
      </div>
      <div class="clear p-o-md">
        <div class="row p-v-sm text-lg text-bold border-bottom">加密视频</div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">在线视频 480P:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">在线视频 720P:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">在线视频 1080P:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
      </div>
      <div class="clear p-o-md">
        <div class="row p-v-sm text-lg text-bold border-bottom">下载视频</div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">下载视频 480P:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">下载视频 720P:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">下载视频 1080P:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
      </div>
      <div class="clear p-o-md">
        <div class="row p-v-sm text-lg text-bold border-bottom">转换后高清视频</div>
        <div class="row">
          <div class="col-xs-3 p-l-n text-right film-add-name p-v-sm">转换后视频地址:</div>
          <div class="col-xs-9 p-v-sm p-n" style="max-width: 800px;">
            <div class="col-xs-6 p-l-n">www.baidu.com</div>
            <div class="col-xs-6 p-r-82 p-l-n relative">www.baidu.com</div>
          </div>
        </div>
      </div>
      <div class="p-o-md m-t-md">
        <div><a href="javascript:;" class="btn bg-blue1 text-white"><i class="fa fa-plus m-r-xs"></i>添加海报(纵向)</a></div>
        <div class="lk-table m-t-sm">
          <ul class="table-thead clear">
            <li class="col-xs-3">海报名称</li>
            <li class="col-xs-3">海报图片</li>
            <li class="col-xs-3">海报尺寸</li>
            <li class="col-xs-3">操作</li>
          </ul>
          <ul class="table-tbody clear">
            <li class="col-xs-3">海报名称</li>
            <li class="col-xs-3">海报图片</li>
            <li class="col-xs-3">海报尺寸</li>
            <li class="col-xs-3">操作</li>
          </ul>
        </div>
      </div>
      <div class="p-md text-center">
        <button class="btn bg-blue1 text-white m-r-sm">确定</button>
        <button class="btn bg-gray1 text-white">重置</button>
      </div>
    </div>
  </div> 
</template>
<script>
  import SubHeader from '../common/subheader'
  import Selection from '@/components/Select'
  import SelectCheckbox from '@/components/SelectCheckbox'
  import api from '@/api'
  import format from '@/tools/format'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data: () => ({
      data: '',
      value: [],
      value1: '',
      content: '',
      subNavList: {
        parentNode: {
          name: '影片管理',
          router: {
            name: 'films_list'
          }
        },
        childNode: {
          name: '添加影片',
          desc: '主要用来绑定应用和应用列表的查看',
          router: {
            name: 'films_add'
          }
        }
      },
      filmType: ['歌舞', '情感', '爱国', '励志', '动漫', '青春', '偶像', '历史', '歌舞', '情感', '爱国', '励志', '动漫', '青春', '偶像', '历史'],
      options: [
        {
          label: '中国',
          value: 1
        },
        {
          label: '美国',
          value: 2
        },
        {
          label: '德国',
          value: 3
        }
      ]
    }),
    components: {
      SubHeader,
      Selection,
      SelectCheckbox,
      quillEditor
    },
    computed: {
    },
    methods: {
      // 图片上传
      handlePreview () {},
      handleRemove () {},
      handleExceed () {}
    },
    created () {
    },
    watch: {
      content (val) {
        console.log(val)
      }
    }
  }
</script>
<style>
  .film-add-container {
    border-top: 4px solid #3691f5;
  }
  .film-add {
    padding: 30px;
  }
  .contry-p-r {
    padding-right: 10px;
  }
  .add-upload-btn {
    height: 40px;
    line-height: 26px;
  }
  .p-r-82 {
    padding-right: 82px;
  }
  .pos-upload {
    position: absolute;
    right: 0;
    top: -1px;
  }
  @media (max-width: 768px) {
    .film-add-name {
      text-align: left;
    }
    .film-add {
      padding: 10px;
    }
    .m-t-md.film-add-container {
      margin-top: 10px;
    }
    .contry-p-r {
      padding-right: 0px;
    }
  }
</style>
