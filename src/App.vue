<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      
      }
    },
    created() {
      document.body.removeChild(document.getElementById('Loading'));
    }
  }
</script>
<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";     /*深色主题*/
  /*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
  .el-button--mini, .el-button--mini.is-round {
    padding: 5px 7px!important;
  }
  .el-button+.el-button{
    margin-left: 0!important;
  }
  .button_center{
    display:inline-block; padding: 4px 0;
  }
  .el-button.el-button--mini{
    margin-top: 2px!important;
    margin-bottom: 2px!important;
  }
  .tit{
    margin-bottom: 10px;
  }
</style>
