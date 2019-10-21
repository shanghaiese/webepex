import { POST, GET } from '@/utils/axios';
export default {
    // ----------------------------------------接口服务监控api
    //接口服务详情
    interfaceList(data) {
        const url = 'ApiInterfaceQuery/queryApiInterfaceList';
        return POST(url,data);
    },
    //接口服务异常
    warningList(data) {
        const url = 'ApiInterfaceQuery/queryApiInterfaceDetailList';
        return POST(url,data);
    },
    // 系统下拉菜单
    systemOps(data) {
        const url = 'ApiInterfaceQuery/queryApiSysCodeList';
        return POST(url,data);
    },
    // 接口下拉菜单
    interfaceOps(data) {
        const url = 'ApiInterfaceQuery/queryApiInterfaceCodeList';
        return POST(url,data);
    }      
}