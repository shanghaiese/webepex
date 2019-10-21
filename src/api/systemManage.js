import { POST, GET } from '@/utils/axios';
export default {
    // --------------------------------------------初始化权限菜单api
    initMenu(data) {
        const url = 'auth/sysrole/userResoure';
        return GET(url,data,{notRecord:true});
    },
    // ----------------------------------------用户管理api
    // 用户查询
    queryUserList(data) {
        const url = 'user/queryUserList';
        return POST(url,data);
    },
    // 用户新增
    addUser(data) {
        const url = 'user/addUser';
        return POST(url,data);
    },
    // 用户编辑
    updateUser(data) {
        const url = 'user/updateUser';
        return POST(url,data);
    },
    // 删除用户
    deleteUser(data) {
        const url = 'user/deleteUser';
        return POST(url,data);
    },
    // 查询机构
    queryUnitList(data) {
        const url = 'unit/queryUnitList';
        return POST(url,data);
    },
    // ------------------------------------------------权限管理api
    // 角色列表
    roleList(data) {
        const url = 'auth/sysrole/roleLists';
        return POST(url,data);
    },
    // 新增角色
    addRole(data) {
        const url = 'auth/sysrole/addRoles';
        return POST(url,data);
    },
    // 删除角色
    deleteRole(data) {
        const url = 'auth/sysrole/deleteRoles';
        return POST(url,data);
    },
    // ------------------------------------------------配置权限api
    // 初始化权限菜单
    menuList(data) {
        const url = 'resmenu/queryResMenuList';
        return POST(url,data);
    },
    // 被选中的菜单
    selectedMenu(data) {
        const url = 'resmenu/queryResMenuListBytRole';
        return POST(url,data);
    },
    // 保存被选中的菜单
    saveConfig(data) {
        const url = 'roleGrant/addBatchRoleGrantList';
        return POST(url,data);
    },
    // -----------------------------------------------配置人员
    // 高亮
    selectedStaff(data) {
        const url = 'auth/queryRoleOfUserList';
        return POST(url,data);
    },
    // 保存配置
    saveStaffconfig(data) {
        const url = '/auth/addUserRole';
        return POST(url,data);
    },
    // -----------------------------------------------系统参数配置
    // 列表
    configDataList(data) {
        const url = 'dataConf/getParamsLists';
        return POST(url,data);
    },
    //新增
    configAddData(data) {
        const url = 'dataConf/paramsAdd';
        return POST(url,data);
    },
    //编辑
    configEdditData(data) {
        const url = 'dataConf/paramsUpdate';
        return POST(url,data);
    },
    //删除
    configDeleteData(data) {
        const url = 'dataConf/paramsDelete';
        return POST(url,data);
    },
    //select框查询
    configSelect(data) {
        const url = 'dataConf/bigParamsLists';
        return POST(url,data);
    },
    // -------------------------------------------登录
    sign(data) {
        const url = 'user/getLoginUser';
        return POST(url,data,{notRecord:true});
    },
    // ------------------------------------------退出登录
    logout(data) {
        const url = 'logout';
        return GET(url,data,{notRecord:true});
    }
}