export default [
  {
    mainText: '文件管理',
    children: [
      {
        path: 'fileList',
        name: 'FileList',
        component: 'FileList',
        meta: {
          title: '我的文件',
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
        },
      },


    ],
  },
]
;
