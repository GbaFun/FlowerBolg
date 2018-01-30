<template>
  <router-view/>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>
  body,
  html {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* background: url('./assets/TIM截图20180116105356.jpg') no-repeat; */
    background: #eee;
    background-size: cover;
    background-attachment: fixed;
    transition: 0.3s;
  }

  * {
    margin: 0px;
    padding: 0px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to
  /* .fade-leave-active below version 2.1.8 */

  {
    opacity: 0;
  }

  .closebtn:hover {
    background: #3eb8ce;
  }

  .closebtn {
    position: absolute;
    width: 25px;
    height: 25px;
    background: #1d92a6;
    text-align: center;
    line-height: 18px;
    border-radius: 25px;
    color: #fff;
    border: 2px solid #fff;
    right: -13px;
    top: -13px;
    transition: 0.2s;
    cursor: pointer;
  }

  .back {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .bg2 {
    background: url('./assets/bg16.png') no-repeat !important;
  }

  div {
    box-sizing: border-box;
    word-break: break-all;
    word-wrap: break-word;
  }

  *::-webkit-scrollbar {
    width: 10px;
    background-color: #eee;
  }


  *::-webkit-scrollbar-thumb {
    background-color: rgba(153, 153, 153, 0.4);
  }

  @font-face {
    font-family: qwe;
    src: url('./assets/Hyperspace.ttf');
  }

  .btn:active {
    color: #ccc;
  }

  .btn:hover {
    background: #2aafc7;
  }

  .btn {
    width: 100px;
    background: #1d92a6;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    margin: 10px 0px;
    float: left;
    border-radius: 2px;
    transition: 0.2s;
    cursor: pointer;
    user-select: none;
  }

  .yuan {
    width: 30px;
    border-radius: 30px;
  }

  .useless {
    background: #ccc !important;
    cursor: not-allowed;
  }
  /* blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  pre {
    background: #000 !important;
    color: #21c58a !important;
    padding: 5px !important;
    border-left: 5px solid #487751 !important;
    font-size: 14px !important;
  }

  code {
    background-color: #000 !important;
    border-radius: 0px !important;
    padding: 0px !important;
    margin: 0px !important;
  } */
  /* table 样式 */

  table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
  }

  th {
    border: 1px solid #ccc;
    padding:3px;
  }

  td {
    border: 1px solid #ccc;
    padding:3px;
  }
  /* blockquote 样式 */

  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  /* code 样式 */

  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
    font-family: 'Consolas' !important;
  }

  pre code {
    display: block;
  }
  /* ul ol 样式 */

  ul,
  ol {
    margin: 10px 0 10px 20px;
  }

</style>
