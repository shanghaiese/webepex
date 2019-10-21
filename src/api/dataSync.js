import { POST, GET } from '@/utils/axios';
export default {
    // ----------------------------------------数据同步监控api-数据同步详情
    //表单数据
    dataList(data) {
        const url = 'dataConf/getHiveDataLists';
        return POST(url,data);
    },
    //失败数
    totalError(data) {
        const url = 'dataConf/getHiveDataErrTotal';
        return POST(url,data);
    },
    // ----------------------------------------数据同步监控api-源头表数据展示
    //下拉菜单表数据
    tableList(data) {
        const url = 'dataConf/resourceTableLists';
        return POST(url,data);
    },
    //echarts图数据
    echartsData(data) {
        const url = 'dataConf/resourceDataLists';
        return POST(url,data);
    }
}