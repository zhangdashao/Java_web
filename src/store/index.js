import Vue from 'vue'; // 引入vue,vuex
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
});
