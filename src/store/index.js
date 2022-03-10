import { createStore } from "vuex";
// import { useRouter } from "vue-router";
import router from "../store";
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
      // const router = useRouter();
      // console.log(router);
      if (null === payload || {} === payload) {
        // console.log("xx");
        // router.push("/");
        commit("pushObjUser", {});
      } else {
        // console.log("oo");
        // router.push({ path: "/main" });
        commit("pushObjUser", payload);
      }
    },
  },
  modules: {},
});
