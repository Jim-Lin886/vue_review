export default {
  namespaced: true,
  state: {
    apiMsg: [],
  },
  getters: {
    getApiMsg(state) {
      return state.apiMsg;
    },
  },
  mutations: {
    pushApiMsg(state, payload) {
      state.apiMsg.push(payload);
    },
  },
  actions: {
    commitApiMsg({ commit }, payload) {
      commit("pushApiMsg", payload);
    },
  },
};
