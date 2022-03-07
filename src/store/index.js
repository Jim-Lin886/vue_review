import { createStore } from "vuex";
import { useI18n } from "vue-i18n";

export default createStore({
  state: {
    lang: "tw",
    isOpenMenu: false,
  },
  getters: {
    getLang: (state) => state.lang,
    getIsOpenMenu: (state) => state.isOpenMenu,
  },
  mutations: {
    pushLang(state, payload0) {
      state.lang = payload;
      const { t, locale } = useI18n({ useScpoe: "global" });
      locale.value = payload;
    },
    pushIsOpenMenu(state, payload) {
      state.isOpenMenu = payload;
      // console.log("pushIsOpenMenu", state.isOpenMenu);
      //123
      //456
      //test branch:feature/tabbar
    },
  },
  actions: {
    commitLang({ commit }, payload) {
      commit("pushLang", payload);
    },
    commitIsOpenMenu({ commit, getters }) {
      let isRever = !getters.getIsOpenMenu;
      commit("pushIsOpenMenu", isRever);
      // console.log("commitIsOpenMenu", getters.getIsOpenMenu);
    },
  },
  modules: {},
});
