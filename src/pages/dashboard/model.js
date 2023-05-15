import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import api from 'api'
import { model } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryDashBoard } = api

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    count: 1
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathToRegexp('/dashboard').exec(pathname) ||
          pathToRegexp('/').exec(pathname)
        ) {
          dispatch({ type: 'queryDashBoard' })
        }
      })
    },
  },
  effects: {
    *queryDashBoard(_, { call, put }) {
      const { errno, errmsg, data } = yield call(queryDashBoard)

      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            allVisitCount: data.allVisitCount,
            camCount: data.camCount,
            tagCount: data.tagCount,
            userAddToday: data.userAddToday,
            userCount: data.userCount,
            visitAdd: data.visitAdd
          }
        })
      } else {
        message.error(errmsg)
      }
    }
  },
})
