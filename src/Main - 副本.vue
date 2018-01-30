<template>
  <div class="content">
    <div class="top">
      <div class="topcontent">
        <div class="title" @click="qwe()">Creative6</div>
        <div class="fucbtn" v-for="(item,i) in option" @click="select(item)">{{item.name}}</div>
        <div class="trans" :style="{transform: 'translate3d(' + index*120 + 'px,0px,0px)'}"></div>
        <div class="searchbox">
          <input class="input" type="text" style="background: #444;" maxlength="20">
          <i class="iconfont icon-search1"></i>
        </div>
        <div class="bodyright">
          <div class="personinfo">
            <div v-if="userinfo">
              <div class="plist1">
                <img :src="userinfo.avatar_url" @click="gotogithub()" :title="userinfo.html_url">
                <div style="padding-top: 10px;">{{userinfo.name}}</div>
                <div style="font-size:13px;">{{userinfo.email}}</div>
                <div class="bio">{{userinfo.bio}}</div>
              </div>
              <div class="plist2" @click="editflg=!editflg">
                <i class="iconfont icon-edit"></i>
                <div>Add New</div>
              </div>
              <div class="plist2">
                <i class="iconfont icon-comments"></i>
                <div>My Msg</div>
              </div>
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

    <div class="down">
      <div class="mainbody">
        <div class="bodyleft">
          <div class="editorcontent" :class="editflg?'showe':''">
            <input class="input" type="text" placeholder="Title" v-model="title">
            <!-- <textarea name="" id="" cols="30" rows="10" placeholder="Content" v-model="content"></textarea> -->
            <div id="editorElem" style="text-align:left"></div>
            <!-- <mavon-editor v-model="value" default_open="edit" code_style='code-dark'/> -->

            <button class="button" @click="commit">Commit</button>
          </div>
          <router-view/>
        </div>
      </div>
      <div class="fot">
        Copyright © 2017 Flower-Creative6
      </div>
    </div>

  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';

  // import PIXI from 'pixi.js';
  // import 'pixi-live2d';

  import E from "wangeditor";
  import Home from './components/Home.vue'
  var editor;
  export default {
    name: 'name',
    components: {
      Home,
    },
    data() {
      return {
        option: [{
            name: 'HOME',
            path: '/Home',
            index: 0,
          }, {
            name: 'DRAW',
            path: '/Draw',
            index: 1,
          }
          // , {
          //   name: 'SETTING',
          //   path: '/Setting',
          //   index: 2,
          // }
        ],
        index: 0,
        userinfo: undefined,
        editflg: false,
        title: '',
        editorContent: '',
        value: '',
        classify: [{
            name: 'JAVA',
            num: 4
          },
          {
            name: 'c#',
            num: 2
          },
          {
            name: '数据库',
            num: 6
          },
          {
            name: 'c++',
            num: 3
          },
          {
            name: 'javascript',
            num: 4
          },
          {
            name: 'css',
            num: 1
          },
          {
            name: 'html',
            num: 8
          },
        ]
      }
    },
    created() {
      try {
        this.userinfo = JSON.parse(this.$cookie.get("userinfo"));
      } catch (e) {
        console.log('UserInfo Error!');
        console.log(e);
      }
    },
    methods: {
      ...mapMutations({
        getnews: 'main/getnews'
      }),
      qwe() {
        // console.log(this);
        // this.$router.push('/Home');
        //document.body.setAttribute('class', 'bg2');
      },
      exit() {
        this.$cookie.delete('userinfo');
        window.location.reload();
      },
      select(item) {
        this.index = item.index;
        this.$router.push(item.path);
      },
      _login() {
        window.location.href =
          'https://github.com/login/oauth/authorize?client_id=5264e5de73487b1b7a35&redirect_uri=http://101.132.128.112:4000/github';
      },
      gotogithub() {
        window.open(this.userinfo.html_url);
      },
      commit() {
        this.call('/savenews', {
          title: this.title,
          content: this.editorContent,
          uid: this.userinfo.id
        }, (rs) => {
          if (rs) {
            this.getnews();
            this.editflg = false;
            this.title = '';
            this.editorContent = '';
            editor.txt.html('')
          }
        })
      }
    },
    mounted() {

      // const renderer = new PIXI.WebGLRenderer(800, 600);
      // document.body.appendChild(renderer.view);
      // const stage = new PIXI.Container();

      // const live2dSprite = new PIXI.Live2DSprite(modelHaru);
      // stage.addChild(live2dSprite);

      // live2dSprite.startRandomMotion('idle');
      // live2dSprite.on('mousemove', (evt) => {
      //   const point = evt.data.global;
      //   live2dSprite.setViewPoint(point.x, point.y);
      // });

      // requestAnimationFrame(animate);
      // renderer.render(stage);

      this.option.map((item) => {
        console.log(this, this.$router.path, item.path)
        if (this.$route.path === item.path) {
          this.index = item.index;
        }
      })

      if (this.$route.path === '/') {
        this.$router.push('/Home');
      }


      editor = new E("#editorElem");
      //editor.customConfig.uploadImgServer = "http://www.creative6.cn:4000/qwe?uid=" + localStorage.getItem('uid');
      editor.customConfig.uploadImgShowBase64 = true;
      editor.customConfig.menus = [
        "head", // 标题
        "strikeThrough", // 删除线
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
  }

</script>

<style scoped>
  .title {
    color: #228DFF;
    font-family: 'Consolas';
    animation: qwe 1.5s ease-in-out infinite alternate;
  }

  @keyframes qwe {
    from {
      text-shadow: 0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px rgb(217, 255, 0),
      0 0 70px rgb(255, 238, 0),
      0 0 80px #228DFF,
      0 0 100px #228DFF,
      0 0 150px #228DFF;
    }
    to {
      text-shadow: 0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px #228DFF,
      0 0 35px #228DFF,
      0 0 40px #228DFF,
      0 0 50px #228DFF,
      0 0 75px #228DFF;
    }
  }

  .num {
    float: right;
    color: #aaa;
  }

  .showe {
    height: 450px !important;
  }

  .editorcontent {
    width: 700px;
    background: rgba(0, 0, 0, 0.4);
    height: 0px;
    transition: height 0.2s;
    overflow: hidden;
    padding: 0px 20px;
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

  .plist2:hover {
    color: #fff;
  }

  .plist2 {
    overflow: hidden;
    padding: 10px 20px;
    border-top: 1px solid #555;
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
    border-radius: 10px;
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
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
    color: #b9b9b9;
    border-radius: 2px;
  }

  .tag:hover {
    background: rgba(0, 0, 0, 0.7);
    color: #ccc !important;
  }

  .tag {
    background: rgba(0, 0, 0, 0.4);
    padding: 5px 10px;
    margin: 5px;
    border-radius: 10px;
    color: #bbb;
    font-size: 15px;
    overflow: hidden;
    transition: background 0.2s;
    cursor: pointer;
  }

  .tags {
    width: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
    margin-top: 20px;
    border-radius: 2px;
  }

  .bodyright {
    float: right;
    width: 270px;
    overflow: hidden;
    right: 0px;
    top: 80px;
    position: absolute;
  }

  .bodyleft {
    width: 700px;
    float: left;
  }

  .mainbody {
    width: 1000px;
    margin: 0 auto;
    overflow: hidden;
  }

  .down {
    width: 100%;
    margin-top: 80px;
    float: left;
    margin-top: 80px;
  }

  .fot {
    border-top: 1px solid #555;
    width: 1000px;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    margin-top: 30px;
    font-weight: 300;
    font-size: 12px;
    color: #aaa;
  }

  .searchbox input {
    width: 230px !important;
  }

  .searchbox i:hover {
    color: #bbb;
  }

  .searchbox i {
    position: absolute;
    color: #888;
    right: 11px;
    top: 22px;
    transition: 0.2s;
    cursor: pointer;
  }

  .searchbox {
    float: right;
    width: 270px;
    height: 100%;
    position: relative;
  }

  .trans {
    position: absolute;
    width: 100px;
    height: 5px;
    left: 200px;
    top: 55px;
    background: #00aaaa;
    transition: transform 0.2s;
  }

  .fucbtn {
    width: 100px;
    height: 100%;
    line-height: 60px;
    text-align: center;
    color: #fff;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    /* font-family: qwe; */
  }

  .title {
    width: 200px;
    font-size: 30px;
    line-height: 60px;
    color: #fff;
    float: left;
    /* font-family: qwe; */
  }

  .topcontent {
    width: 1000px;
    height: 60px;
    position: relative;
    margin: 0 auto;
  }

  .top {
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    z-index: 1000;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }

</style>
