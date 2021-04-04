import Vuex from "vuex";
import Vue from "vue";
import { SET_DATA } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: null
  },

  getters: {
    getData: (state) => {
      return state.lists ?? [];
    },
    getCountData: (state, getters) => {
        return getters.getData.length
    }
  },

  mutations: {
    [SET_DATA](state, data) {
      state.lists = data
    },
  },

  actions: {
    setDatas(context, data) {
      context.commit(SET_DATA, data);
    },
  },
});
