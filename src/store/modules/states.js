// <!-- 数据存储状态 -->
const state = {
    // common左上角的title
    commonTitle: '',
    // downLoadUrl: 'http://172.18.19.179:8082/m2vds/hueQuery/downloadFile'
    // downLoadUrl: 'http://172.21.51.81:8082/m2vds/hueQuery/downloadFile'
    // downLoadUrl: 'http://172.21.51.79:8082/m2vds/hueQuery/downloadFile',
    // downLoadUrl: 'http://20.13.50.115:8088/m2vds/hueQuery/downloadFile',
    // downLoadUrl: 'http://20.13.50.116:8088/m2vds/hueQuery/downloadFile',
    // downLoadUrl: 'http://19.13.50.115:8088/m2vds/hueQuery/downloadFile',
    // downLoadUrl: 'http://19.13.50.116:8088/m2vds/hueQuery/downloadFile',
    // downLoadUrl: 'http://172.21.51.81:8888/m2vds/hueQuery/downloadFile',
    downLoadUrl: 'http://172.21.51.82:8888/m2vds/hueQuery/downloadFile',
    // baseUrl:'http://172.21.51.81:8888/m2vds',
    // baseUrl:'http://20.13.50.115:8088/m2vds'
    // baseUrl:'http://20.13.50.116:8088/m2vds'
    // baseUrl:'http://19.13.50.115:8088/m2vds'
    // baseUrl:'http://19.13.50.116:8088/m2vds'
    // baseUrl:'http://172.21.51.81:8888/m2vds'
    baseUrl:'http://172.21.51.82:8888/m2vds'
};
const mutations = {
	editCommonTitle(state, payload) {
		state.commonTitle = payload.info;
	}
};
export default {
	state,
	mutations
};
