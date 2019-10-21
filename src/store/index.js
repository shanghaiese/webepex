import Vue from 'vue';
import Vuex from 'vuex';
import states from './modules/states';
import cancelTask from './modules/cancelTask';
import page from './modules/page'
Vue.use(Vuex);
// eslint-disable-next-line no-undef
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
	modules: {
        states,
        cancelTask,
        page
	},
	strict: debug
});
