<template>
  <div>
    <transition name="fade">
      <div class="back" v-show="editflg">
        <div style="padding:10px;width:1000px;" class="editorcontent">
          <div class="closebtn" @click="editflg=false">×</div>
          <input type="text" placeholder="标题" class="titleinput" v-model="title">
          <div id="editorElem"></div>
          <div class="btn" style="float:right;" @click="addNew()">保存</div>
        </div>
      </div>
    </transition>

    <div class="titlec">
      <div class="bigtitlec">
        <div>Golden Sun - Aqua Rock</div>
        <div>--------------------------------------------------------------------</div>
        <div>The Lost Age</div>
      </div>
    </div>

    <div style="width:1000px;margin:20px auto;">
      <div style="width: 700px;float: left;box-shadow: 0px 1px 10px #ccc;" v-if="nowpage<=totalpage">
        <div class="content" v-for="(item,i) in newsinfo" :key="i">
          <div class="left">
            <img :src="item.avatar_url" alt="" :title="item.html_url" @click="gotogithub(item.html_url)">
          </div>
          <div class="right">
            <div class="title" @click="gotoNewsInfo(item.nid)">{{item.title?item.title:'未命名标题'}}</div>
            <div class="infoma">{{item.updatetime}} ✦ {{item.name}} ✦ {{item.email}}</div>
            <div class="hfnum" :title="item.hfnum+'个回复'" @click="gotoNewsInfo(item.nid)">
              <i class="iconfont icon-comments"></i>{{item.hfnum}}</div>
            <!-- <div class="con" v-html="item.content"></div> -->
            <!-- <div class="allbtn" @click="_setNewsItem(item)">ALL>></div> -->
          </div>
        </div>
        <div style="width: 100%;position: relative;overflow: hidden;height: 50px;background: #fff;">
          <div class="pagebtn">
            <div class="btn yuan" @click="prepage()" :class="!prebtnflg?'useless':''">
              <i class="iconfont icon-back"></i>
            </div>
            <div class="pagenum">{{nowpage}}/{{totalpage}}</div>
            <div class="btn yuan" @click="nextpage()" :class="!nextbtnflg?'useless':''">
              <i class="iconfont icon-more"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="width: 700px;float: left;text-align:center;">
        <i class="iconfont icon-zanwu" style="font-size:50px;"></i> 没东西！！！</div>
      <div class="bodyright">
        <div class="personinfo">
          <div v-if="userinfo">
            <div class="plist1">
              <img :src="userinfo.avatar_url" @click="gotogithub(userinfo.html_url)" :title="userinfo.html_url">
              <div style="padding-top: 10px;">{{userinfo.name}}</div>
              <div style="font-size:13px;">{{userinfo.email}}</div>
              <div class="bio">{{userinfo.bio}}</div>
            </div>
            <div class="plist2" @click="showEditor()">
              <i class="iconfont icon-edit"></i>
              <div>Add New</div>
            </div>
            <!-- <div class="plist2">
              <i class="iconfont icon-comments"></i>
              <div>My Msg</div>
            </div> -->
            <div class="plist2" @click="exit">
              <i class="iconfont icon-exit"></i>
              <div>Exit</div>
            </div>
          </div>
          <div v-else>
            <div class="plist2" @click="_login()">
              <i class="iconfont icon-github" style="font-size: 20px;"></i>
              <div>使用github登录</div>
            </div>
          </div>
        </div>
        <div class="tags">
          <div class="tag" v-for="(item,i) in classify" :key="i">
            <i class="iconfont icon-attachment"></i> {{item.name}}
            <div class="num">{{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';

  import E from "wangeditor";
  var editor = undefined;
  export default {
    name: "name",
    created() {
      try {
        this.userinfo = JSON.parse(this.$cookie.get("userinfo"));
      } catch (e) {
        console.log('UserInfo Error!');
        console.log(e);
      }
    },
    data() {
      var p = [];
      for (let i = 0; i < 20; i++) {
        p.push({
          name: '测试' + i,
          num: i + 1
        })

      }

      return {
        p: undefined,
        userinfo: undefined,
        classify: p,
        editflg: false,
        editorContent: '',
        title: '',
        newsinfo: [],
        totalnum: 0,
        prebtnflg: false,
        nextbtnflg: false,
        nowpage: 0,
        totalpage: 0
      };
    },
    watch: {
      $route(to, from) {
        this.getnews()
        this.getnewsnum()
        this.setpagebtn()
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      totalnum() {
        this.setpagebtn()
      }
    },
    methods: {
      getnews() {
        this.call('/getnews', {
          page: this.$route.query.page ? this.$route.query.page * 1 : 1
        }, (rs) => {
          this.newsinfo = rs;
          console.log(this.newsinfo)
        })
      },
      prepage() {
        if (!this.prebtnflg) {
          return;
        }
        console.log('pre', this.$route.path, this.$route)
        var page = 0;
        if (this.$route.query.page) {
          page = this.$route.query.page * 1 - 1
        }
        if (page <= 1) {
          this.$router.push('/Home')
        } else {
          this.$router.push('/Home?page=' + page)
        }
      },
      nextpage() {
        if (!this.nextbtnflg) {
          return;
        }
        console.log('next', this.$route.path, this.$route)
        var page = 2
        if (this.$route.query.page) {
          page = this.$route.query.page * 1 + 1
        }
        this.$router.push('/Home?page=' + page)
      },
      showEditor() {
        if (!editor) {
          editor = new E("#editorElem");
          editor.customConfig.uploadImgServer = "http://101.132.128.112:4000/qwe?uid=" + this.userinfo.id;
          //editor.customConfig.uploadImgShowBase64 = true;
          editor.customConfig.menus = [
            "head", // 标题
            "strikeThrough", // 删除线
            'list', // 列表
            'link', // 插入链接
            'justify', // 对齐方式
            "quote", // 引用
            "emoticon", // 表情
            "table", // 表格
            "image",
            "code" // 插入代码
          ];
          editor.customConfig.onchange = html => {
            this.editorContent = html;
          };
          editor.create();
        }
        this.editflg = true
      },
      addNew() {
        this.call('/savenews', {
          title: this.title,
          content: this.editorContent,
          uid: this.userinfo.id
        }, (rs) => {
          this.getnews();
          this.editflg = false;
          this.title = '';
          this.editorContent = '';
          editor.txt.html('')
        })
      },
      gotogithub(url) {
        window.open(url);
      },
      _login() {
        window.location.href =
          'https://github.com/login/oauth/authorize?client_id=5264e5de73487b1b7a35&redirect_uri=http://101.132.128.112:4000/github';
      },
      gotoNewsInfo(id) {
        this.$router.push('/Article?nid=' + id)
      },
      exit() {
        this.$cookie.delete('userinfo');
        window.location.reload();
      },
      getnewsnum() {
        this.call('/getnewsnum', {}, (rs) => {
          if (rs) {
            console.log('total', rs)
            this.totalnum = rs["0"].num * 1
          }
        })
      },
      setpagebtn() {
        var page = this.$route.query.page ? this.$route.query.page * 1 : 1
        this.nowpage = page
        this.totalpage = Math.ceil(this.totalnum / 25)
        if (page > 1) {
          this.prebtnflg = true
        } else {
          this.prebtnflg = false
        }
        if (this.totalnum / (page * 25) > 1) {
          this.nextbtnflg = true
        } else {
          this.nextbtnflg = false
        }
      }
    },
    mounted() {
      editor = undefined;
      this.getnews();
      this.getnewsnum();
    }
  };

</script>

<style scoped>
  .pagebtn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .pagenum {
    float: left;
    line-height: 50px;
    margin: 0px 10px;
    font-size: 18px;
    color: #555;
  }

  .hfnum i {
    margin-right: 10px;
  }

  .hfnum:hover {
    color: #333;
  }

  .hfnum {
    color: #888;
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-weight: 400;
    cursor: pointer;
    transition: 0.2s;
  }

  .titleinput {
    height: 30px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    width: 100%;
    float: left;
    outline: none;
    font-size: 16px;
    text-indent: 10px;
  }

  .editorcontent {
    background: #fff;
    float: left;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2px;
  }

  .num {
    float: right;
  }

  .tag:hover {
    background: #eee;
  }

  .tag {
    background: #fff;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 10px;
    font-size: 15px;
    overflow: hidden;
    color: #555;
    transition: background 0.2s;
    cursor: pointer;
  }

  .tags {
    width: 100%;
    overflow: hidden;
    background: #fff;
    margin-top: 20px;
    border-radius: 2px;
    box-shadow: 0 1px 10px #ccc;
  }

  .bio {
    font-size: 13px !important;
    width: 100%;
    padding: 0px 10px;
    line-height: 20px !important;
    margin-bottom: 10px;
  }

  .plist2 div {
    float: left;
    text-indent: 20px;
    font-size: 15px;
  }

  .plist2 i {
    float: left;
  }

  .plist2:hover .iconfont {
    transform: rotate(360deg) scale(1.5);
    color: rgb(187, 22, 209);
  }

  .iconfont {
    transition: 0.3s;
  }

  .plist2 {
    padding: 10px 20px;
    overflow: hidden;
    cursor: pointer;
  }

  .plist1 span {
    font-size: 13px;
  }

  .plist1 div {
    line-height: 23px;
    float: left;
    text-indent: 20px;
    font-size: 20px;
  }

  .plist1 img:hover {
    transform: rotate(360deg)
  }

  .plist1 img {
    width: 50px;
    height: 50px;
    float: left;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 10px;
    transition: 0.2s;
  }

  .plist1 {
    overflow: hidden;
  }

  .personinfo {
    width: 100%;
    background: #fff;
    box-shadow: 0px 1px 10px #ccc;
  }

  .bodyright {
    float: right;
    width: 270px;
  }

  .bigtitlec div:nth-child(1) {
    font-size: 40px;
    font-weight: 300;
  }

  .bigtitlec {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .titlec {
    height: 300px;
    background: url('../assets/rain.jpg') no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
  }

  .allbtn:hover {
    color: #fff;
    border-radius: 20px;
  }

  .allbtn {
    background: #565656;
    text-align: center;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 13px;
    padding: 0px 10px;
    color: #bbb;
    cursor: pointer;
    transition: 0.2s;
  }

  .con {
    padding: 6px;
    color: #ccc;
    font-size: 13px;
    max-height: 300px;
    margin-bottom: 6px;
    overflow: hidden;
  }

  .infoma {
    font-size: 13px;
    padding: 3px 6px;
    /* border-bottom: 1px solid #555; */
    color: #888;
    font-weight: 400;
  }

  .title:hover {
    text-decoration: underline;
  }

  .title {
    font-size: 20px;
    padding: 6px;
    cursor: pointer;
    transition: 0.2s;
  }

  .left img:hover {
    transform: rotate(360deg)
  }

  .left img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.3s;
  }

  .right {
    overflow: hidden;
    width: 630px;
    position: relative;
  }

  .left {
    float: left;
    width: 70px;
    height: 100%;
    overflow: hidden;
  }

  .content {
    overflow: hidden;
    float: left;
    background: #fff;
    border-radius: 2px;
    font-size: 15px;
    font-weight: 300;
    padding: 5px 0px;
    border-bottom: 1px solid #eee;
  }

</style>
