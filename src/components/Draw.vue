<template>
  <div>
    <!-- <img v-for="item in p" :src="item" alt=""> -->
    <!-- <div class="f" v-for="item in p" :style="{'background':'url(' +item+ ')'}"></div> -->
    <div class="b" v-for="(item,i) in p" @click="select(item)">
      <img v-lazy="item.small" alt="" class="bimg">
    </div>
    <transition name="fade">
      <div class="back" v-if="flg" @click="flg=false">
        <img v-lazy="nowsrc" alt="">
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'name',
    data() {
      var p = [];
      for (var i = 0; i < 26; i++) {
        p.push({
          small: 'http://101.132.128.112:8088/img/bg' + (i + 1) + 's.png',
          big: 'http://101.132.128.112:8088/img/bg' + (i + 1) + '.png'
        });
      }

      return {
        p: p,
        nowsrc: '',
        flg: false
      }
    },
    methods: {
      select(item) {
        this.flg = true;
        this.nowsrc = item.big;
      },
      load(t) {
        console.log(t)
      }
    }
  }

</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .back img {
    max-width: 1000px;
    max-height: 700px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .back {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1001;
  }

  .bimg:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }

  .bimg {
    max-width: 400px;
    max-height: 400px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: 0.3s;
  }


  .b {
    width: 200px;
    height: 200px;
    float: left;
    overflow: hidden;
    position: relative;
    margin-right: 30px;
    margin-bottom: 30px;
    box-shadow: 0px 1px 5px #000;
  }

</style>
