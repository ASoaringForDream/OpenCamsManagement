import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryCamTags } = api

const camTag = modelExtend(pageModel, {
  namespace: 'camTag',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/camManage/tag').exec(location.pathname)) {
          dispatch({
            type: 'queryCamTags'
          })
        }
      })
    },
  },
  effects: {
    *queryCamTags(_, { put, call }) {
      const { errno, errmsg, data } = yield call(queryCamTags)

      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            list: data.data,
            tags: data.tags
          }
        })
      }else {
        message.error(errmsg)
      }
    }
  },
})


export default camTag