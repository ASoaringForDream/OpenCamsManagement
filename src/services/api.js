
const PATH_MAP = {
  queryRouteList: '/routes',

  queryUserInfo: 'POST /manager/session',
  logoutUser: 'DELETE /manager/logout',
  loginUser: 'POST /manager/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}

export default PATH_MAP
