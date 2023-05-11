
const PATH_MAP = {
  queryUserInfo: 'POST /manager/session',
  logoutUser: 'DELETE /manager/logout',
  loginUser: 'POST /manager/login',

  queryManagerList: '/manager/managers',
  addManager: 'POST /manager/addmanager',
  deleteManager: 'DELETE /manager/deletemanager',
  editManager: 'POST /manager/editmanager',

  queryRole: '/manager/roles',
  queryRoleList: '/manager/rolelist',

  queryUserList: '/manager/users',
  addUser: 'POST /manager/adduser',
  deleteUser: 'DELETE /manager/deleteuser',
  editUser: 'POST /manager/edituser',
  banUser: 'POST /manager/banuser',

  queryCharacter: '/manager/characters',
  addCharacter: 'POST /manager/addcharacter',
  deleteCharacter: 'DELETE /manager/deletecharacter',
  editCharacter: 'POST /manager/editcharacter',
}

export default PATH_MAP
