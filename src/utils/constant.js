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
    role: '1'
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
        role: '2',
      },
      {
        id: '22',
        pid: '2',
        name: '用户',
        icon: 'user',
        route: '/user/user',
        role: '3',
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