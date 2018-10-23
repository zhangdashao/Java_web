export default [


  {
    mainText: '文件管理',
    children: [
      {
        path: 'fileList',
        name: 'FileList',
        component: 'FileList',
        meta: {
          title: '用户文件',
          permission: '对应具体权限',
        },
      },
      {
        path: 'userList',
        name: 'UserList',
        component: 'UserList',
        meta: {
          title: '用户管理',
          permission: '对应具体权限',
        },
      },
      {
        path: 'fileList',
        name: 'FileList',
        component: 'FileList',
        meta: {

          title: '文件管理列表',
          permission: '对应具体权限',
          disable: 'true',
        },
      },
      {
        path: 'wasteBox',
        name: 'WasteBox',
        component: 'WasteBox',
        meta: {
          title: '文件恢复',
          permission: '对应具体权限',
        },
      },
      {
        path: 'projectList',
        name: 'ProjectList',
        component: 'ProjectList',
        meta: {
          title: '项目管理',
          permission: '对应具体权限',
        },
      },
    ],
  },
];
