export default [


  {
    mainText: '文件管理',
    children: [
      {
        path: 'commonFile',
        name: 'CommonFile',
        component: 'CommonFile',
        meta: {
          title: '公共文件',
          permission: '对应具体权限',
        },
      },
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
        path: 'wasteBox',
        name: 'WasteBox',
        component: 'WasteBox',
        meta: {
          title: '回收站',
          permission: '对应具体权限',
          disable: 'true',
        },
      },
      {
        path: 'wasteReset',
        name: 'WasteReset',
        component: 'WasteReset',
        meta: {
          title: '用户文件恢复',
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
        path: 'userDetail',
        name: 'UserDetail',
        component: 'UserDetail',
        meta: {
          title: '用户上传文件',
          permission: '对应具体权限',
          disable: 'true',
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
      {
        path: 'createUser',
        name: 'CreateUser',
        component: 'CreateUser',
        meta: {
          title: '创建用户',
          permission: '对应具体权限',
          disable: 'true',
        },
      },
      {
        path: 'fileDetail',
        name: 'FileDetail',
        component: 'FileDetail',
        meta: {
          title: '文件详情',
          permission: '对应具体权限',
          disable: 'true',
        },
      },
    ],
  },
];
