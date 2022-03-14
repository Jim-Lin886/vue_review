import { createStore } from "vuex";
import i18n from "../i18n";

export default createStore({
  state: {
    lang: "zh_tw",
    isOpenMenu: false,
    objUser: {},
  },
  getters: {
    getLang: (state) => state.lang,
    getIsOpenMenu: (state) => state.isOpenMenu,
    getObjUser: (state) => state.objUser,
    // getObjUser: (state) => JSON.parse(JSON.stringify(state.objUser)),
  },
  mutations: {
    pushLang(state, payload) {
      state.lang = payload;
      i18n.global.locale = payload;
    },
    pushIsOpenMenu(state, payload) {
      state.isOpenMenu = payload;
    },
    pushObjUser(state, payload) {
      state.objUser = payload;
      // console.log(state.objUser);
    },
  },
  actions: {
    commitLang({ commit }, payload) {
      commit("pushLang", payload);
    },
    commitIsOpenMenu({ commit, getters }) {
      let isRever = !getters.getIsOpenMenu;
      commit("pushIsOpenMenu", isRever);
    },
    commitObjUser({ commit }, payload) {
      if (null === payload || {} === payload) {
        commit("pushObjUser", {});
      } else {
        commit("pushObjUser", payload);
      }
    },
  },
  modules: {},
});
