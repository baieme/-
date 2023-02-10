import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '@/utils/storage.js'
Vue.use(Vuex);
const USER_KEY = 'user';

export default new Vuex.Store({
  state: {
    user:getItem(USER_KEY)
  },
  getters: {
  },
  mutations: {
    getUser(state,content){
      state.user = content;
      setItem(USER_KEY,state.user);
    }
  },
  actions: {
  },
  modules: {
  }
})
