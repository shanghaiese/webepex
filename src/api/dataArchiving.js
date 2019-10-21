import { POST, GET } from '@/utils/axios';
export default {
    // ----------------------------------------数据归档api-归档参数配置
    //表单数据
    dataList(data) {
        const url = 'dataConf/getGuiDangParamsLists';
        return POST(url,data);
    },
    // 删除
    deleteData(data) {
        const url = 'dataConf/guiDangParamsDelete';
        return POST(url,data);
    },
    // 新增
    addData(data) {
        const url = 'dataConf/guiDangParamsAdd';
        return POST(url,data);
    },
    // 修改
    edditData(data) {
        const url = 'dataConf/guiDangParamsUpdate';
        return POST(url,data);
    },
    // 下拉菜单
    getSelect(data) {
        const url = 'dataConf/getGuiDangParamsFourLists';
        return POST(url,data);
    },
    // ---------------------------------------------数据归档api-应用空间使用情况
    // 离线库存数据集市
    getSpaceOffline(data) {
        const url = 'hueQuery/queryHiveSpace';
        return POST(url,data);
    },
    // ES集群应用空间使用占比
    getSpaceES(data) {
        const url = 'es/esResource';
        return POST(url,data);
    }
}