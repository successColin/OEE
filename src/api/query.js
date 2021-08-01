/*
 * @Descripttion:
 * @version:
 * @Author: tjf
 * @Date: 2021-04-20 17:15:39
 * @LastEditors: tjf
 * @LastEditTime: 2021-05-25 17:25:53
 */
// const PREFIX = '/api'; // 前缀
// const VERSION = 'v1'; // 版本号，默认为1，后续有其他接口版本号是其他值
import { PREFIX, VERSION } from '@/config';

export default {
  // 角色管理
  GET_ORG_LIST: '/system/org/listSysOrg', // 获取组织列表
  ADD_ORG: '/system/org/addSysOrg', // 新增组织
  DO_UPDATE_ORG: '/system/org/modifySysOrg', // 修改组织
  DELETE_ORG: '/system/org/batchDeleteOrg', // 删除组织
  GET_ROLE_GROUP: '/system/roleGroup/listSysRoleGroup', // 获取角色分组
  DELETE_ROLE_GROUP: '/system/roleGroup/deleteRoleGroup', // 删除角色分组
  ADD_ROLE_GROUP: '/system/roleGroup/add', // 新增角色分组
  DO_UPDATE_ROLE_GROUP: '/system/roleGroup/edit', // 修改角色分组
  DO_SWITCH_ROLE_LOCATION: '/system/roleGroup/switchLocation', // 切换角色分组位置
  DO_GET_ROLE_LIIST: '/system/role/listSysRole', // 角色列表
  DO_ADD_ROLE: '/system/role/addSysRole', // 新增角色
  DO_UPDATE_ROLE: '/system/role/modifySysRole', // 修改角色system/role/batchDeleteRole
  DO_BATCH_DELETE_ROLE: '/system/role/batchDeleteRole', // 批量删除角色system/role/switchLocation
  DO_SWITCH_ROLE: '/system/role/switchLocation', // 切换角色
  DO_GET_ORG_TREE: '/system/org/listSysOrg', // 获取组织
  DO_EDIT_ROLE_AUTH: '/system/role/modifySysRoleAuthority', // 修改角色权限
  DO_FETCH_AUTH_LIST: '/system/role/listDefaultSysRoleAuthority', // 获取权限
  DO_GET_ROLE_DATA_LIST: '/system/dict/listDict', // 获取数据权限
  D0_EDIT_ROLE_DATA_AUTH: '/system/role/modifySysRoleDataAuthority', // 修改角色数据权限
  DO_COPY_ROLE: '/system/role/copyRole', // 复制角色
  DO_GET_BATCH_AUTH: '/system/role/listSysPermissionItem', // 获取批量操作权限项
  GET_USER_PAGE: '/system/user/pageSysUser', // 根据条件获取用户
  GET_ORG_TREE: '/system/role/listDataOrg', // 获取菜单组织
  GET_FUNCTION_BY_MODULES: '/system/role/listSysRoleAuthority', // 根据模块id获取菜单权限
  GET_ROLE_TREE: '/system/role/listSysRoleTree', // 获取角色树
  GET_POSITION_TREE: '/system/userPost/listSysUserPost', // 获取职位树

  // 用户管理
  GET_USER_LIST: '/system/user/pageSysUser', // 条件查询用户列表
  DO_ADD_USER: '/system/user/addSysUser', // 新增用户
  DO_UPDATE_USER: '/system/user/modifySysUser', // 修改用户
  DO_DELETE_USER: '/system/user/batchDeleteUser', // 批量删除用户
  DO_UPDATE_USER_STATE: '/system/user/modifyResign', // 转离职
  DO_RESET_PASSWORD: '/system/user/resetPassword', // 重置密码
  DO_UPDATE_USER_DATA_AUTH: '/system/user/modifySysUserDataAuthority', // 修改用户数据权限
  DO_UPDATE_USER_FUNCTION_AUTH: '/system/user/modifySysUserAuthority', // 修改用户权限
  FETCH_USER_DEFAULT_FUNCTION_AUTH: '/system/user/listDefaultSysUserAuthority', // 获取用户默认权限
  FETCH_USER_FUNCTION_AUTH_BY_ID: '/system/user/listSysUserAuthority', // 根据用户id,一级菜单id查询权限信息
  GET_USER_DATA_ORG: '/system/user/listDataOrg', // 查询用户数据权限
  UPDATE_INHERIT_AUTH: '/system/user/inheritAuthority', // 修改继承权限

  // 职位管理
  ADD_USER_POST: '/system/userPost/addSysUserPost', // 新增职位
  BATCH_DELETE_USER_POST: '/system/userPost/batchDeleteUserPost', // 批量删除职位
  GET_USER_POST: '/system/userPost/getSysUserPost', // 根据id查询职位
  GET_USER_POST_LIST: '/system/userPost/listSysUserPost', // 职位列表
  MODIFY_USER_POST: '/system/userPost/modifySysUserPost', // 职位列表

  // 用户收藏
  ADD_COLLECTION_USER: '/system/org/addCollectionUser', // 收藏用户
  DELETE_COLLECTION_USER: '/system/org/deleteCollectionUser', // 收藏用户
  GET_LIST_COLLECTION_USER: '/system/org/listCollectionUser', // 收藏用户列表

  // 个人中心
  GET_PERSONAL_CENTER_USER: '/system/personalCenter/getSysUser', // 获取用户信息
  SWITCH_PERSONAL_CENTER_TENANT: '/system/personalCenter/switchTenant', // 切换租户
  GET_PERSONAL_CENTER_TENANT_LIST: '/system/personalCenter/listTenantByUserId', // 查询租户列表
  GET_PERSONAL_CENTER_TENANT_INFO: '/system/personalCenter/getTenantInfo', // 查询租户详情
  MODIFY_PERSONAL_CENTER_AVATAR: '/system/personalCenter/modifyAvatar', // 修改头像
  MODIFY_PERSONAL_CENTER_EMAIL: '/system/personalCenter/modifyEmail', // 修改邮箱
  MODIFY_PERSONAL_CENTER_PASSWORD: '/system/personalCenter/modifyPassword', // 修改密码
  MODIFY_PERSONAL_CENTER_SIGNATURE: '/system/personalCenter/modifySignature', // 修改签名
  MODIFY_PERSONAL_CENTER_TELPHONE: '/system/personalCenter/modifyTelephone', // 修改手机号
  MODIFY_PERSONAL_CENTER_NAME: '/system/personalCenter/modifyUsername', // 修改用户名
  BIND_PERSONAL_CENTER_EMAIL: '/system/personalCenter/bindEmail', // 绑定邮箱
  DO_LOGOUT: '/logout', // 退出登录

  // 图标管理
  GET_ICON_LIST: '/system/icon/listIcon', // 获取图标列表
  DELETE_ICON_BY_BATCH: '/system/icon/batchDeleteIcon', //  批量删除图标
  BATCH_UPLOAD_INCON: '/system/icon/batchUpload', // 批量上传图标

  // 知识库
  GET_MENU_CENTER: '/system/sysMenu/menuCenter', // 菜单中心
  GET_KNOWLEDGE_ALL: '/system/konwledge/listFiles', // 获取全部的文件
  ADD_KNOWLEDGE_FOLDER: '/system/konwledge/saveFolder', // 新增文件夹
  EDIT_KNOWLEDGE_FOLDER: '/system/konwledge/updateFolder', // 编辑文件文件夹名称
  GET_KNOWLEDGE_LIST_BY_PAGE: '/system/konwledge/pageFiles', // 分页查询列表
  DEL_KNOWLEDGE_FILES: '/system/konwledge/deleteFile', // 删除文件
  MOVE_KNOWLEDGE_FILES: '/system/konwledge/moveFolder', // 移动文件
  GET_COLLECT_FILES_LIST: '/system/konwledge/listCollection', // 获取收藏列表
  COLLECT_FILES: '/system/konwledge/collect', // 文件收藏
  UNCOLLECT_FILES: '/system/konwledge/cancleCollect', // 取消文件收藏
  VISIT_KNOWLEDGE_FILE: '/system/konwledge/visitRecord', // 访问文件
  LAST_KNOWLEDGE_FILE_LIST: '/system/konwledge/listVisitRecords', // 最新常用列表接口
  SHARE_KNOWLEDGE_FILES: '/system/konwledge/fileShare', // 分享的文件
  GET_SHARE_KNOWLEDGE_FILES_LIST: '/system/konwledge/listShare', // 获取分享的文件
  CANCEL_SHARE_KNOWLEDGE_FILES: '/system/konwledge/cancleShare', // 取消分享
  GET_OTHERS_SHARE_KNOWLEDGE_FILES: '/system/konwledge/listOtherShare', // 获取他人的分享
  DO_SET_KNOWLEDGE_USER: '/system/konwledge/sharedSet', // 修改文件的被分享人
  DO_GET_KNOWLEDGE_SHARE: '/system/konwledge/listSharedUser', // 获取被分享人列表
  GET_KNOWLEDGE_USER_LIST: '/system/konwledge/pageEmpower', // 根据组织职位角色获取用户列表
  DO_KNOWLEDGE_DOWNLOAD: `${PREFIX}/${VERSION}/system/konwledge/downFiles`, // 文件下载
  DO_UPDATE_KNOWLEDGE_AUTH: '/system/konwledge/empowerUpdate', // 修改知识库权限
  DO_FETCH_BUSSINESS: '/system/konwledge/pageBussinessFile', // 获取业务列表
  DO_SEARCH_BUSSINESS: '/system/konwledge/pageBuinessFiles', // 获取业务子文件里面的文件

  // 导入模板配置
  DO_Import_Config: `${PREFIX}/${VERSION}/system/sysImportConfig/downloadTemplate`, // 文件下载
};
