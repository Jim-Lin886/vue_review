import { createStore } from "vuex";
import i18n from "../i18n";

export default createStore({
  state: {
    lang: "zh_tw",
    isOpenMenu: false,
  },
  getters: {
    getLang: (state) => state.lang,
    getIsOpenMenu: (state) => state.isOpenMenu,
  },
  mutations: {
    pushLang(state, payload) {
      state.lang = payload;
      i18n.global.locale = payload;
      // console.log("i18n111", i18n.global.locale);
    },
    pushIsOpenMenu(state, payload) {
      state.isOpenMenu = payload;
    },
  },
  actions: {
    commitLang({ commit }, payload) {
      commit("pushLang", payload);
    },
    commitIsOpenMenu({ commit, getters }) {
      let isRever = !getters.getIsOpenMenu;
      commit("pushIsOpenMenu", isRever);
      // console.log("commitIsOpenMenu", isRever);
    },
  },
  modules: {},
});
