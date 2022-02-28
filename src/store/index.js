import { createStore } from "vuex";

export default createStore({
  state: {
    isOpenMenu: false,
  },
  getters: {
    getIsOpenMenu: (state) => state.isOpenMenu,
  },
  mutations: {
    pushIsOpenMenu(state, payload) {
      state.isOpenMenu = payload;
      // console.log("pushIsOpenMenu", state.isOpenMenu);
      //987
      //654
    },
  },
  actions: {
    commitIsOpenMenu({ commit, getters }) {
      let isRever = !getters.getIsOpenMenu;
      commit("pushIsOpenMenu", isRever);
      // console.log("commitIsOpenMenu", getters.getIsOpenMenu);
    },
  },
  modules: {},
});
