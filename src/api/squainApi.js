import { POST, GET } from './api';
export default {
    // -------------------------------我的项目
    projectList(data) {
        const url = '/greenland/apartment/get-myProject';
        return POST(url,data);
    },
    projectDetail(data) {
        const url = '/greenland/apartment/get-myProjectDetail';
        return POST(url,data);
    },
    //------------------------------康养公寓
    // 列表
    queryLayout(data) {
        const url = '/greenland/apartment/query-layout';
        return POST(url,data);
    },
    // 详情
    getMyLayoutDetail(data) {
        const url = '/greenland/apartment/getlayoutDetail';
        return POST(url,data);
    },
    // 下单
    order(data) {
        const url = '/greenland/order/buy-add';
        return POST(url,data);
    }
}