import { POST, GET } from '@/utils/axios';
export default {
    // ----------------------------------------hue-api-数据表查看
    // 所有表名
    tableNameList(data) {
        const url = 'hueQuery/queryTableNameList';
        return POST(url,data);
    },
    // 通过表名查字段
    queryFilds(data) {
        const url = 'hueQuery/queryTableColumnList';
        return POST(url,data);
    },
    // 执行查询
    operateQuery(data) {
        const url = 'hueQuery/queryBySql';
        return POST(url,data,{timeout: 1000 * 60 * 20});
    },
    // 生成文件
    makeFile(data) {
        const url = 'hueQuery/queryBySql';
        return POST(url,data);
    },
    // 终止查询
    cancalQuery(data) {
        const url = 'hueQuery/cancelQueryOperator';
        return POST(url,data);
    },
    // 查询预存sql
    savedSql(data) {
        const url = '/HUE/hueSqlQuery';
        return POST(url,data);
    },
    // 保存sql
    toSaveSql(data) {
        const url = '/HUE/hueSqlSave';
        return POST(url,data);
    },
    // 删除sql
    toDeleteSql(data) {
        const url = 'HUE/deleteHueSql';
        return POST(url,data);
    },
    // ------------------------------------------sql语句执行记录
    // 日志查询列表
    logList(data) {
        const url = '/HUE/hueSqlLogsList';
        return POST(url,data);
    },
    // ------------------------------------------文件下载列表
    // 列表
    fileDownloadList(data) {
        const url = '/HUE/hueDowloadQueryList';
        return POST(url,data);
    },
    // 下载文件
    downloadFile(data) {
        const url = '/hueQuery/downloadFile';
        return GET(url,data);
    },
    getStr(data) {
        const url = '/hueQuery/getQueryUuid';
        return POST(url,data);
    }
}