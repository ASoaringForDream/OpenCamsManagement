import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryManagerList, queryRole, addManager, deleteManager, editManager } = api

const manager = modelExtend(pageModel, {
  namespace: 'manager',

  state: {
    role: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/user/manager').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryManager',
            payload
          })
          dispatch({
            type: 'queryRole'
          })
        }
      })
    },
  },
  effects: {
    *queryManager({ payload }, { put, call }) {
      const { errno, errmsg, data } = yield call(queryManagerList, {
        id: payload?.id,
        username: payload?.username,
        role: payload?.role,
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
    *queryRole(_, {put, call}) {
      const { errno, data } = yield call(queryRole)
      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            role: data
          }
        })
      }
    },
    *addManager({ payload, cb }, { call, put }) {
      const { errno, errmsg } = yield call(addManager, payload)
      if(!errno) {
        cb && cb()
        message.success('创建成功')
        yield put({
          type: 'queryManager',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *delManager({ payload }, { call, put }) {
      const { errno, errmsg } = yield call(deleteManager, payload)
      if(!errno) {
        message.success('删除成功')
        yield put({
          type: 'queryManager',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *editManager({ payload, cb }, { call, put }) {
      const { errno, errmsg } = yield call(editManager, payload)
      if(!errno) {
        cb && cb()
        message.success('更新成功')
        yield put({
          type: 'queryManager',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    }
  },
})


export default manager