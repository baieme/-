import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Vue from 'vue';
dayjs.locale('zh-cn')  //全局使用
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
//全局定义一个过滤器
Vue.filter('formatTime',function(value){
  return dayjs(value).from(dayjs()) //
})

