const state = {
    source: null //存放取消axios请求对象
}
const mutations = {
    setSource(state, status) {
        state.source = status;
    }
}
const actions = {
    setSourceAsync({ state, dispatch, commit }, payload) {
        commit('setSource', payload);
    }
}
export default {
	state,
	mutations,
	actions
};
