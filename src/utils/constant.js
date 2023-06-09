export const ROLE_TYPE = {
  ADMIN: 'admin',
  DEFAULT: 'admin',
  DEVELOPER: 'developer',
}

export const CANCEL_REQUEST_MESSAGE = 'cancel request'

export const MENU  = [
  {
    id: '1',
    icon: 'dashboard',
    name: '仪表盘',
    route: '/dashboard',
    role: 1
  },
  {
    id: '2',
    name: '人员管理',
    icon: 'manager',
    route: '/user',
    children: [
      {
        id: '21',
        pid: '2',
        name: '管理员',
        icon: 'team',
        route: '/user/manager',
        role: 2,
      },
      {
        id: '22',
        pid: '2',
        name: '用户',
        icon: 'user',
        route: '/user/user',
        role: 3,
      }
    ]
  },
  {
    id: '3',
    name: '权限管理',
    icon: 'role',
    route: '/role',
    children: [
      {
        id: '31',
        pid: '3',
        name: '角色管理',
        icon: 'character',
        route: '/role/character',
        role: 11,
      },
      {
        id: '32',
        pid: '3',
        name: '权限列表',
        icon: 'roleList',
        route: '/role/roleList',
        role: 3,
      }
    ]
  },
  {
    id: '4',
    name: '摄像机管理',
    icon: 'cam',
    route: '/camManage',
    children: [
      {
        id: '41',
        pid: '4',
        name: '网络摄像头',
        icon: 'internet',
        route: '/camManage/cam',
        role: 11,
      },
      {
        id: '42',
        pid: '4',
        name: '摄像头分类',
        icon: 'tag',
        route: '/camManage/tag',
        role: 3,
      }
    ]
  }
]

export const SEX_MAP = [
  {
    label: '男',
    value: '男'
  },
  {
    label: '女',
    value: '女'
  },
  {
    label: '保密',
    value: '保密'
  }
]

export const STATE_MAP = [
  {
    label: '正常',
    value: '正常'
  },
  {
    label: '封禁',
    value: '封禁'
  }
]