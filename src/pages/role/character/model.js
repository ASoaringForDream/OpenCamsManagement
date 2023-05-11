import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryCharacter, addCharacter, deleteCharacter, editCharacter } = api

const character = modelExtend(pageModel, {
  namespace: 'character',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/role/character').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryCharacter',
            payload
          })
        }
      })
    },
  },
  effects: {
    *queryCharacter({ payload }, { put, call }) {
      const { errno, errmsg, data } = yield call(queryCharacter, {
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
    *addCharacter({ payload, cb }, { put, call }) {
      const { errno, errmsg } = yield call(addCharacter, payload)
      if(!errno) {
        cb && cb()
        message.success('创建成功')
        yield put({
          type: 'queryCharacter',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *deleteCharacter({ payload }, { call, put }) {
      const { errno, errmsg } = yield call(deleteCharacter, payload)
      if(!errno) {
        message.success('删除成功')
        yield put({
          type: 'queryCharacter',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *editCharacter({ payload, cb }, { call, put }) {
      const { errno, errmsg } = yield call(editCharacter, payload)
      if(!errno) {
        cb && cb()
        message.success('更新成功')
        yield put({
          type: 'queryCharacter',
          payload: { page: 1, pageSize: 10 }
        })
      } else {
        message.error(errmsg)
      }
    }
  },
})


export default character