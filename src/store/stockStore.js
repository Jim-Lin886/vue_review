export default {
  namespaced: true,
  state: {
    saleList: [],
  },
  getters: {
    getSaleList: (state) => {
      let cloneList = [];
      for (var i = 0; i < state.saleList.length; i++) {
        cloneList.push({ ...state.saleList[i] });
      }
      return cloneList;
    },
  },
  mutations: {
    pushSaleList(state, payload) {
      state.saleList = payload;
    },
  },
  actions: {
    setSaleList({ commit }, payload) {
      console.log("setSaleList", payload);
      commit("pushSaleList", payload);
    },
    clanSaleList({ commit }) {
      commit("pushSaleList", []);
    },
  },
};
