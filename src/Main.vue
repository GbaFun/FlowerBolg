<template>
  <div id='id'>
    <div class="top" :class="scrolled||$route.path==='/Article'?'top2':''">
      <div class="topcontent">
        <div class="topcontenttitle">
          <i class="iconfont icon-siglyphleaf" style="font-size:30px;"></i> Creative6</div>
        <div class="topcontentfucbtnbox">
          <div class="fucbtn" @click="$router.push('/Home')">
            <i class="iconfont icon-weibiaoti1"></i> 首页
          </div>
          <div class="fucbtn">
            <i class="iconfont icon-suoyoushangpin2"></i> 归档
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div style="float: left;text-align: center;width: 100%;margin-top: 20px;font-size: 13px;border-top: 1px dashed #ccc;padding: 14px;color:#777">
      <div>Copyright © 2017-2018 Flower-Creative6</div>
      <div style="margin-top:3px;">
        <i class="iconfont icon-github"></i>https://github.com/Creative6</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'name',
    data() {
      return {
        scrolled: false
      }
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > 0;
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      if (this.$route.path === '/') {
        console.log('path=/')
        this.$router.push('/Home');
      }
    }
  }

</script>

<style scoped>
  .fucbtn:hover::after {
    left: 0%;
    width: 100%;
  }

  .fucbtn::after {
    content: "";
    width: 0;
    height: 2px;
    background: #fff;
    position: absolute;
    top: 80%;
    left: 50%;
    transition: .3s;
  }

  .fucbtn {
    height: 60px;
    line-height: 60px;
    float: left;
    width: 100px;
    transition: 0.3s;
    font-size: 14px;
    position: relative;
    text-align: center;
    cursor: pointer;
  }

  .topcontentfucbtnbox {
    float: right;
    margin-left: 100px;
  }

  .topcontenttitle {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
    float: left;
  }

  .topcontent {
    width: 1000px;
    height: 60px;
    margin: 0 auto;
    color: #fff;
  }

  .top2 {
    background: rgba(7, 136, 158, 0.9);
  }

  .top {
    position: fixed;
    width: 100%;
    height: 60px;
    z-index: 1;
    transition: 0.3s;
    top: 0px;
    left: 0px;
  }

</style>
