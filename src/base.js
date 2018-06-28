// 全局函数
exports.install = function (Vue, options) {
    // 时间
    function formatDate(time){
      return time<10 ? time='0'+time : time;
    }
    Vue.prototype.getDate = function(ns) {
      let d = new Date(ns);
      if(ns!==0 && ns!== null && ns!== ''){
        return [ d.getFullYear(), formatDate(d.getMonth() + 1), formatDate(d.getDate()) ].join('-')
          + ' ' + [ formatDate(d.getHours()), formatDate(d.getMinutes()), formatDate(d.getSeconds()) ].join(':');
      }else{
        return null;
      }
    }
    // 时间转时间戳
    Vue.prototype.getTimeStamp = function(year,month,day){
      let date = new Date(year,month-1,day);
      return date.getTime();
    }
    // 时间戳转时间（yyyy:mm:dd）
    Vue.prototype.getTimeDate = function (time){
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth()+1;
      var d = date.getDate();
      return y + '-' + m + '-' + d;
    }
};
