// <!-- 数据存储状态 -->
const state = {
    menuIndex:1 // 激活的导航菜单；
};
const mutations = {
	editIndex(state, payload) {
		state.menuIndex = payload.info;
	}
};
export default {
	state,
	mutations
};
