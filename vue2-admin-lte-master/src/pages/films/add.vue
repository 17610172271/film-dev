<template>
    <div class="film-add">
        <sub-header :list="subNavList"></sub-header>
        <div class="bg-white m-t-md film-add-container">
            <div class="p-md border-bottom text-xlg">基本信息</div>
            <div class="container-fluid p-v-sm">
                <div class="row p-v-sm" :class="{'p-b-n': nameShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40"><span class="text-red text-xs fa fa-asterisk"></span> 中文名称:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-input placeholder="请输入中文名称" style="max-width: 300px;"
                                  v-model="data.chinese_name" @blur="validateName"></el-input>
                        <div class="text-red m-t-xs" v-show="nameShow"><span class="fa fa-remove m-r-sm"></span>中文名称不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">时长/分钟:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-input placeholder="请输入时长" style="max-width: 300px;" v-model="data.time_length"></el-input>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">英文名称:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-input placeholder="请输入英文名称" style="max-width: 300px;"
                                  v-model="data.english_name"></el-input>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': typeShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40"><span class="text-red text-xs fa fa-asterisk"></span> 影片分类:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40">
                        <el-checkbox-group style="max-width: 800px;" v-model="data.type" @change="validateType">
                            <el-checkbox :label="item.id" v-for="item in selectOptions.filmType">{{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                        <div class="text-red m-t-xs" v-show="typeShow"><span class="fa fa-remove m-r-sm"></span>影片分类不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': countryShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 国家:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-select clearable placeholder="请选择国家" v-model="data.country"
                                   style="width: 100%;max-width: 300px;" @change="validateCountry" @blur="validateCountry">
                            <el-option
                                v-for="item in selectOptions.country"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <div class="text-red m-t-xs" v-show="countryShow"><span class="fa fa-remove m-r-sm"></span>国家不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': directorShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 导演/主讲:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-select clearable placeholder="请选择导演/主讲" v-model="data.director" multiple
                                   style="width: 100%;max-width: 300px;" @blur="validateDirector" @change="validateDirector">
                            <el-option
                                v-for="item in selectOptions.director"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <div class="text-red m-t-xs" v-show="directorShow"><span class="fa fa-remove m-r-sm"></span>导演/主讲不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': actorShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 演员:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-select clearable placeholder="请选择演员" v-model="data.actor" multiple
                                   style="width: 100%;max-width: 300px;" @blur="validateActor" @change="validateActor">
                            <el-option
                                v-for="item in selectOptions.actor"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <div class="text-red m-t-xs" v-show="actorShow"><span class="fa fa-remove m-r-sm"></span>演员不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm"  :class="{'p-b-n': languageShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 语言:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-select clearable placeholder="请选择语言" v-model="data.language"
                                   style="width: 100%;max-width: 300px;" @blur="validateLanguage" @change="validateLanguage">
                            <el-option
                                v-for="item in selectOptions.language"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <div class="text-red m-t-xs" v-show="languageShow"><span class="fa fa-remove m-r-sm"></span>语言不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': writerShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 编剧:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-select clearable placeholder="请选择编剧" v-model="data.writer" multiple
                                   style="width: 100%;max-width: 300px;" @blur="validateWriter" @change="validateWriter">
                            <el-option
                                v-for="item in selectOptions.writer"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <div class="text-red m-t-xs" v-show="writerShow"><span class="fa fa-remove m-r-sm"></span>编剧不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': releaseShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 上映时间:</div>
                    <div class="col-xs-12 col-sm-10">
                        <el-date-picker
                            v-model="data.release_time"
                            style="width: 100%;max-width: 300px;"
                            type="date"
                            @blur="validateRelease"
                            placeholder="选择上映时间">
                        </el-date-picker>
                        <div class="text-red m-t-xs" v-show="releaseShow"><span class="fa fa-remove m-r-sm"></span>上映时间不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': coverShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 封面(横向):</div>
                    <div class="col-xs-12 col-sm-10">
                        <div class="clear">
                            <div class="col-xs-9 p-n p-r-sm" style="max-width: 800px;">
                                <el-input placeholder="上传文件" v-model="data.cover"  @blur="validateCover"></el-input>
                            </div>
                            <div class="col-xs-3 p-n">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-success="handlePreview"
                                    list-type="text">
                                    <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                                </el-upload>
                            </div>
                        </div>
                        <div class="text-red m-t-xs" v-show="coverShow"><span class="fa fa-remove m-r-sm"></span>封面(横向)不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': cover1Show}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 封面(纵向):</div>
                    <div class="col-xs-12 col-sm-10">
                        <div class="clear">
                            <div class="col-xs-9 p-n p-r-sm" style="max-width: 800px;">
                                <el-input placeholder="上传文件" v-model="data.cover1"  @blur="validateCover1"></el-input>
                            </div>
                            <div class="col-xs-3 p-n">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-success="handlePreview"
                                    list-type="text">
                                    <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                                </el-upload>
                            </div>
                        </div>
                        <div class="text-red m-t-xs" v-show="cover1Show"><span class="fa fa-remove m-r-sm"></span>封面(纵向)不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r">是否最新上映:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40">
                        <el-radio v-model="data.is_new" :label="1">是</el-radio>
                        <el-radio v-model="data.is_new" :label="2">否</el-radio>
                    </div>
                </div>
                <div class="row p-v-sm" :class="{'p-b-n': descriptionShow}">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r"><span class="text-red text-xs fa fa-asterisk"></span> 影片描述:</div>
                    <div class="col-xs-12 col-sm-10">
                        <quill-editor v-model="data.description"
                                      style="max-width: 800px;"
                                      @blur="validateDescription"
                                      ref="myQuillEditor">
                        </quill-editor>
                        <div class="text-red m-t-xs" v-show="descriptionShow"><span class="fa fa-remove m-r-sm"></span>影片描述不能为空</div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r">是否自有内容:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40">
                        <el-radio v-model="data.is_self_content" :label="1">是</el-radio>
                        <el-radio v-model="data.is_self_content" :label="2">否</el-radio>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40 contry-p-r">是否收费:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40">
                        <el-radio v-model="data.is_charge" :label="1">收费</el-radio>
                        <el-radio v-model="data.is_charge" :label="2">不收费</el-radio>
                    </div>
                </div>
            </div>
            <div class="clear p-o-md">
                <div class="p-v-sm text-lg text-bold border-bottom">原始视频</div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">原始视频地址:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">原始音频地址:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">原始字幕地址:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear p-o-md">
                <div class="p-v-sm text-lg text-bold border-bottom">加密视频</div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">在线视频 480P:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">在线视频 720P:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">在线视频 1080P:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear p-o-md">
                <div class="p-v-sm text-lg text-bold border-bottom">下载视频</div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">下载视频 480P:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">下载视频 720P:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">下载视频 1080P:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear p-o-md">
                <div class="p-v-sm text-lg text-bold border-bottom">转换后高清视频</div>
                <div class="row p-v-sm">
                    <div class="col-xs-12 col-sm-2 text-right film-add-name line-height-40">转换后视频地址:</div>
                    <div class="col-xs-12 col-sm-10 line-height-40 p-n" style="max-width: 800px;">
                        <div class="col-xs-6 p-l-n">
                            <el-input></el-input>
                        </div>
                        <div class="col-xs-6 p-r-82 p-l-n relative">
                            <el-input></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="pos-upload"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-o-md m-t-md poster-container">
                <div>
                    <a href="javascript:;" class="btn bg-blue1 text-white" @click="addPoster=true"><i
                    class="fa fa-plus m-r-xs"></i>添加海报(纵向)</a>
                </div>
                <div class="lk-table m-t-sm">
                    <ul class="table-thead clear">
                        <li class="col-xs-3">海报名称</li>
                        <li class="col-xs-3">海报图片</li>
                        <li class="col-xs-3">海报尺寸</li>
                        <li class="col-xs-3">操作</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="item in data.posters">
                        <li class="col-xs-3 over-omit">{{item.name}}</li>
                        <li class="col-xs-3"><img :src="item.image" width="75%" alt=""></li>
                        <li class="col-xs-3">{{item.size}}</li>
                        <li class="col-xs-3"><a href="javascript:;" class="btn btn-danger">删除</a></li>
                    </ul>
                    <ul class="table-tbody clear" v-show="addPoster">
                        <li class="col-xs-3 over-omit text-center" style="padding: 17px 10px;"><el-input v-model="posterImg.name"></el-input></li>
                        <li class="col-xs-3 text-center" style="padding: 17px 10px;">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-success="posterUploadSuccess"
                                :show-file-list="false"
                                v-show="!posterImg.image"
                                :headers="header">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                            <img :src="posterImg.image" alt="" v-show="posterImg.image" width="75%">
                        </li>
                        <li class="col-xs-3 text-center"><span v-show="posterImg.size">{{posterImg.size}}</span></li>
                        <li class="col-xs-3">
                            <a href="javascript:;" class="btn bg-blue1 text-white" @click="posterSubmit">确定</a>
                            <a href="javascript:;" class="btn bg-gray1 text-white" @click="posterCancel">取消</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="p-md text-center">
                <button class="btn bg-blue1 text-white m-r-sm" @click="submit">确定</button>
                <button class="btn bg-gray1 text-white">重置</button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
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
            data: {
                chinese_name: null,
                time_length: null,
                english_name: null,
                type: [],
                country: null,
                director: [],
                actor: [],
                language: null,
                writer: [],
                release_time: null,
                cover: null,
                cover1: null,
                is_new: null,
                description: null,
                is_self_conten: null,
                is_charge: null,
                posters: []
            },
            nameShow:false,
            typeShow: false,
            countryShow: false,
            directorShow: false,
            actorShow: false,
            languageShow: false,
            writerShow: false,
            releaseShow: false,
            coverShow: false,
            cover1Show: false,
            descriptionShow: false,
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
                    desc: '主要用来添加及编辑影片',
                    router: {
                        name: 'films_add'
                    }
                }
            },
            filmType: ['歌舞', '情感', '爱国', '励志', '动漫', '青春', '偶像', '历史', '歌舞', '情感', '爱国', '励志', '动漫', '青春', '偶像', '历史'],
            selectOptions: {},
            header: {ContentType: 'application/x-www-form-urlencoded'},
            addPoster: false,
            posterImg: {
                name: '',
                size: '',
                image: ''
            }
        }),
        components: {
            SubHeader,
            Selection,
            SelectCheckbox,
            quillEditor
        },
        computed: {},
        methods: {
            // 获取数据
            getOptions () {
                this.$http.get(api.films.options).then(res => {
                    if (res.data.code === 1) {
                        this.selectOptions = res.data.data
                        console.log(this.selectOptions)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            getData () {
                this.$http.get(api.films.detail, {
                    params: {
//                        id: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        console.log(res)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 提交数据
            submit () {
                if (!this.data.chinese_name) this.nameShow = true
                if (this.data.type.length === 0) this.typeShow = true
                if (!this.data.country) this.countryShow = true
                if (this.data.director.length === 0) this.directorShow = true
                if (this.data.actor.length === 0) this.actorShow = true
                if (this.data.writer.length === 0) this.writerShow = true
                if (!this.data.language) this.languageShow = true
                if (!this.data.cover) this.coverShow = true
                if (!this.data.cover1) this.cover1Show = true
                if (!this.data.description) this.descriptionShow = true
                if (!this.data.release_time) this.releaseShow = true
                if (this.data.chinese_name && this.data.type.length > 0 && this.data.country && this.data.director.length > 0 &&
                    this.data.actor.length > 0 && this.data.writer.length > 0 && this.data.language && this.data.cover && this.data.cover1 &&
                    this.data.description && this.data.release_time) {
                    if (this.$route.params.id) {
                        this.$http.post(api.films.edit).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                })
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        this.$http.post(api.films.add).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                })
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '您还有必填项尚未填写!'
                    })
                }
            },
            // 必填项验证
            validateName () {
                if (!this.data.chinese_name) {
                    this.nameShow = true
                } else {
                    this.nameShow = false
                }
            },
            validateType () {
                if (this.data.type.length === 0) {
                    this.typeShow = true
                } else {
                    this.typeShow = false
                }
            },
            validateCountry () {
                if (!this.data.country) {
                    this.countryShow = true
                } else {
                    this.countryShow = false
                }
            },
            validateDirector () {
                if (this.data.director.length === 0) {
                    this.directorShow = true
                } else {
                    this.directorShow = false
                }
            },
            validateActor () {
                if (this.data.actor.length === 0) {
                    this.actorShow = true
                } else {
                    this.actorShow = false
                }
            },
            validateLanguage () {
                if (!this.data.language) {
                    this.languageShow = true
                } else {
                    this.languageShow = false
                }
            },
            validateWriter () {
                if (this.data.writer.length === 0) {
                    this.writerShow = true
                } else {
                    this.writerShow = false
                }
            },
            validateRelease () {
                if (!this.data.release_time) {
                    this.releaseShow = true
                } else {
                    this.releaseShow = false
                }
            },
            validateCover () {
                if (!this.data.cover) {
                    this.coverShow = true
                } else {
                    this.coverShow = false
                }
            },
            validateCover1 () {
                if (!this.data.cover1) {
                    this.cover1Show = true
                } else {
                    this.cover1Show = false
                }
            },
            validateDescription () {
                if (!this.data.description) {
                    this.descriptionShow = true
                } else {
                    this.descriptionShow = false
                }
            },
            // 上传
            handlePreview () {
            },
            handleRemove () {
            },
            handleExceed () {
            },
            // 海报上传
            posterUploadSuccess (response, file, fileList) {
                let that = this
                console.log(file)
                let img = new Image()
                this.posterImg.image = file.url
                img.src = file.url
                img.onload = function () {
                    that.posterImg.size = img.width + '*' + img.height
                    console.log(that.posterImg)
                }
            },
            posterSubmit () {
                if (this.posterImg.image && this.posterImg.name) {
                    this.data.posters.push(this.posterImg)
                    this.posterImg = {
                        name: '',
                        image: '',
                        size: ''
                    }
                    this.addPoster = false
                } else if (!this.posterImg.name) {
                    this.$message({
                        type: 'warning',
                        message: '请填写海报名称'
                    })
                } else if (!this.posterImg.image) {
                    this.$message({
                        type: 'warning',
                        message: '请上传海报图片'
                    })
                }
            },
            posterCancel () {
                this.posterImg = {
                    name: '',
                    image: '',
                    size: ''
                }
                this.addPoster = false
            }
        },
        created () {
            this.getOptions()
            if (this.$route.params.id) this.getData()
        },
        watch: {
            content (val) {
                console.log(val)
            },
            '$route' (val) {
                if (!this.$route.params.id) {
                    this.data = {
                        chinese_name: null,
                            time_length: null,
                            english_name: null,
                            type: [],
                            country: null,
                            director: [],
                            actor: [],
                            language: null,
                            writer: [],
                            release_time: null,
                            cover: null,
                            cover1: null,
                            is_new: null,
                            description: null,
                            is_self_conten: null,
                            is_charge: null,
                            posters: []
                    }
                } else {
                    this.getData()
                }
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
        .poster-container {
            padding-left:5px;
            padding-right:5px;
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
