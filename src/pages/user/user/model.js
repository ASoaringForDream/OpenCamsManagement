import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryUserList, addUser, deleteUser, eidtUser, banUser } = api

const user = modelExtend(pageModel, {
  namespace: 'user',

  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/user/user').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryUser',
            payload
          })
        }
      })
    },
  },
  effects: {
    *queryUser({ payload }, { put, call }) {
      const { errno, errmsg, data } = yield call(queryUserList, {
        id: payload?.id,
        username: payload?.username,
        state: payload?.state,
        current: Number(payload?.page) || 1,
        pageSize: Number(payload?.pageSize) || 10,
      })

      if(!errno) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload?.page) || 1,
              pageSize: Number(payload?.pageSize) || 10,
              total: data.total,
            },
          }
        })
      }else {
        message.error(errmsg)
      }
    },
    *addUser({ payload, cb }, { call, put }) {
      const { errno, errmsg } = yield call(addUser, payload)
      if(!errno) {
        cb && cb()
        message.success('创建成功')
        yield put({
          type: 'queryUser',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *delUser({ payload }, { call, put }) {
      const { errno, errmsg } = yield call(deleteUser, payload)
      if(!errno) {
        message.success('删除成功')
        yield put({
          type: 'queryUser',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *editUser({ payload, cb }, { call, put }) {
      const { errno, errmsg } = yield call(eidtUser, payload)
      if(!errno) {
        cb && cb()
        message.success('更新成功')
        yield put({
          type: 'queryUser',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *banUser({ payload }, { call, put }) {
      const { errno, errmsg } = yield call(banUser, payload)
      if(!errno) {
        message.success('更新成功')
        yield put({
          type: 'queryUser',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    }
  },
})


export default user