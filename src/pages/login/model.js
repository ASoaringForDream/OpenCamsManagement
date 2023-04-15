import { history } from 'umi'
import { message } from 'antd'
import api from 'api'
const { pathToRegexp } = require("path-to-regexp")

const { loginUser } = api

const login = {
  namespace: 'login',

  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  effects: {
    *login({ payload }, { put, call, select }) {
      const { errno, errmsg, data } = yield call(loginUser, payload)
      console.log(data);
      if(!errno) {
        history.push('/dashboard')
        message.success('登录成功')
      }else {
        message.error(errmsg)
      }
    }
  },
}


export default login