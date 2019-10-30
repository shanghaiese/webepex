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
    }
}