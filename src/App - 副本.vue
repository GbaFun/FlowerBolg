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
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* background: url('./assets/TIM截图20180116105356.jpg') no-repeat; */
    background: #eee;
    background-size: cover;
    background-attachment: fixed;
    transition: 0.3s;
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
    background-color: #000000;
  }


  *::-webkit-scrollbar-thumb {
    background-color: rgba(153, 153, 153, 0.4);
  }


  .input {
    border: none;
    background: rgba(0, 0, 0, 0.4);
    outline: none;
    height: 30px;
    width: 100%;
    margin-top: 15px;
    line-height: 30px;
    color: #fff;
    border-radius: 30px;
    text-indent: 15px;
    font-size: 15px;
    color: rgb(180, 180, 180);
    font-family: 'Consolas';
  }

  textarea {
    border: none;
    /* background: rgba(0, 0, 0, 0.4); */
    outline: none;
    /* width: 100%; */
    /* margin-top: 15px; */
    /* line-height: 30px; */
    /* color: #fff; */
    /* border-radius: 5px; */
    /* text-indent: 15px; */
    font-size: 15px;
    /* color: rgb(180, 180, 180); */
    font-family: 'Consolas';
    resize: none;
  }

  .button:hover {
    background: rgba(0, 0, 0, 0.8) !important;
  }

  .button {
    border: none;
    background: rgba(0, 0, 0, 0.6);
    outline: none;
    height: 30px;
    width: 100%;
    margin-top: 15px;
    line-height: 30px;
    color: #fff;
    border-radius: 30px;
    text-indent: 15px;
    font-size: 15px;
    color: rgb(180, 180, 180);
    font-family: 'Consolas';
    cursor: pointer;
    transition: background 0.2s;
  }

  .w-e-toolbar {
    background-color: #141619 !important;
    border: 1px solid #16171a !important;
    margin-top: 10px !important;
  }

  .w-e-text-container {
    border: 1px solid #25282d !important;
    background: rgba(0, 0, 0, 0.3) !important;
  }

  .w-e-text {
    color: #aaa !important;
    font-size: 12px;
  }

  .w-e-text blockquote {
    border-left: 8px solid #868686 !important;
    background-color: #000000 !important;
  }

  .w-e-text code {
    background-color: #000000 !important;
    font-family: 'Consolas' !important;
    color: #00f1ff !important;
    padding: 3px !important;
  }



  pre,
  code {
    background: rgb(86, 86, 86);
    font-family: 'Consolas';
    color: #31ff00;
    padding: 3px !important;
    display: block;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  blockquote {
    border-left: 8px solid #868686 !important;
    background-color: #000000 !important;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    display: block;
  }


  table {
    border-collapse: collapse;
    /* 边框合并属性  */
    width: 100%;
  }

  th {
    border: 1px solid #666666;
    text-align: center;
  }

  td {
    border: 1px solid #666666;
    text-align: center;
  }


  @font-face {
    font-family: qwe;
    src: url('./assets/Hyperspace.ttf');
  }

</style>
