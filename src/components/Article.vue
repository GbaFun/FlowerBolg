<template>
  <div style="width: 1000px;margin: 0 auto;padding-top: 80px;" v-if="nid!=0">
    <div class="content">
      <div class="right">
        <div class="left">
          <img :src="item.avatar_url" alt="" :title="item.html_url" @click="gotogithub(item.html_url)">
        </div>
        <div class="title">{{item.title?item.title:'未命名标题'}}</div>
        <div class="infoma">{{item.updatetime}} ✦ {{item.name}} ✦ {{item.email}}</div>
        <div class="con" v-html="item.content" v-highlight></div>
      </div>
    </div>

    <div class="hfcontent" v-if="userinfo">
      <div id="editorElem"></div>
      <div class="btn" style="float:right;" @click="savehf()">保存</div>
    </div>
    <div class="hfbox" v-if="hf.length>0" style="margin-bottom: 50px;">
      <div class="hfboxcontent" v-for="item in hf">
        <div class="boxleft">
          <img :src="item.avatar_url" alt="" @click="gotogithub(item.html_url)" :title="item.html_url">
        </div>
        <div class="boxright" v-html="item.content" v-highlight></div>
        <div class="hftime">{{item.name}}--{{item.updatetime}}</div>
      </div>
    </div>
  </div>
  <div v-else style="width: 1000px;text-align: center;margin: 0px auto;margin-top: 150px;">
    <i class="iconfont icon-zanwu" style="font-size:50px;"></i> 没东西！！！</div>
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
    data() {
      return {
        item: [],
        userinfo: [],
        editorContent: '',
        hf: [],
        nid: 0
      };
    },
    created() {
      try {
        this.userinfo = JSON.parse(this.$cookie.get("userinfo"));
        this.nid = this.$route.query.nid ? this.$route.query.nid : 0;
      } catch (e) {
        console.log('UserInfo Error!');
        console.log(e);
      }
    },
    methods: {
      gotogithub(url) {
        window.open(url);
      },
      savehf() {
        if (this.editorContent != '') {
          this.call('/savehf', {
            uid: this.userinfo.id,
            content: this.editorContent,
            nid: this.nid * 1
          }, (rs) => {
            if (rs) {
              this.editorContent = '';
              editor.txt.html('')
              this.gethf()
            }
          })
        }
      },
      gethf() {
        this.call('/gethf', {
          nid: this.nid
        }, (rs) => {
          if (rs) {
            console.log(rs)
            this.hf = rs
            //this.item = rs[0]
          }
        })
      }
    },
    mounted() {
      this.call('/getnewsinfo', {
        nid: this.nid
      }, (rs) => {
        if (rs) {
          this.item = rs[0]
        }
      })

      this.gethf()
      //if (true) {
      if (this.userinfo && this.nid != 0) {
        editor = new E("#editorElem");
        editor.customConfig.uploadImgServer = "http://101.132.128.112:4000/qwe?uid=" + this.userinfo.id;
        //editor.customConfig.uploadImgServer = "http://101.132.128.112:4000/qwe?uid=";
        //editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.menus = [
          "emoticon", // 表情
          "code" // 插入代码
        ];
        editor.customConfig.onchange = html => {
          this.editorContent = html;
        };
        editor.create();
        this.editflg = true
      }
    }
  };

</script>

<style scoped>
  .w-e-text-container {
    height: 100px !important;
  }

  .hftime {
    position: absolute;
    right: 10px;
    bottom: 0px;
    font-size: 13px;
    color: #888;
  }

  .boxleft img:hover {
    transform: rotate(360deg)
  }

  .boxleft img {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    transition: 0.3s;
    cursor: pointer;
  }

  .boxleft {
    float: left;
    height: 50px;
  }

  .boxright {
    float: left;
    margin-left: 10px;
    width: 904px;
    padding: 5px;
    font-size: 15px;
    color: #555;
    background: #eee;
    margin-bottom: 7px;
    border-radius: 2px;
  }

  .hfboxcontent {
    overflow: hidden;
    background: #fff;
    border-bottom: 1px solid #eee;
    position: relative;
    padding: 10px 0px;
  }

  .hfbox {
    background: #fff;
    float: left;
    width: 100%;
    padding: 20px;
    box-shadow: 0px 1px 10px #ccc;
  }

  .hfcontent {
    background: #fff;
    float: left;
    width: 100%;
    padding: 20px;
    box-shadow: 0 1px 10px #ccc;
    margin-bottom: 15px;
  }

  .con {
    padding: 20px;
  }

  .infoma {
    font-size: 13px;
    padding: 3px 6px;
    border-bottom: 1px solid #555;
    color: #888;
    font-weight: 400;
  }

  .title {
    font-size: 20px;
    padding: 6px;
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
    transition: 0.2s;
  }

  .right {
    overflow: hidden;
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
    /* background: #fff; */
    background: url(../assets/qwe.jpg);
    margin-bottom: 15px;
    border-radius: 2px;
    font-size: 15px;
    font-weight: 300;
    box-shadow: 0px 1px 10px #ccc;
  }

</style>
