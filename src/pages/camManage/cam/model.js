import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
const { pathToRegexp } = require("path-to-regexp")

const { queryCams, deleteCam, editCam, queryCamTags } = api

const cam = modelExtend(pageModel, {
  namespace: 'cam',
  state: {
    mainTagList: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/camManage/cam').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryCams',
            payload
          })
          dispatch({
            type: 'queryCamTags'
          })
        }
      })
    },
  },
  effects: {
    *queryCams({ payload }, { select, put, call }) {
      const { pagination } = yield select(app => app.cam)
      const { errno, errmsg, data } = yield call(queryCams, {
        id: payload?.id,
        tit: payload?.tit,
        mainTag: payload?.mainTag,
        current: Number(payload?.page) || pagination.current || 1,
        pageSize: Number(payload?.pageSize) || pagination.pageSize || 10,
      })

      if(!errno) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload?.page) || pagination.current || 1,
              pageSize: Number(payload?.pageSize) || 10,
              total: data.total,
            },
          }
        })
      }else {
        message.error(errmsg)
      }
    },
    *queryCamTags(_, { put, call }) {
      const { errno, data } = yield call(queryCamTags)

      if(!errno) {
        yield put({
          type: 'updateState',
          payload: {
            mainTagList: data.data,
            tagList: data.tags
          }
        })
      }
    },
    *deleteCam({ payload }, { select, call, put }) {
      const { errno, errmsg } = yield call(deleteCam, payload)
      const { pagination } = yield select(app => app.cam)
      if(!errno) {
        message.success('删除成功')
        yield put({
          type: 'queryCams',
          payload: { page: pagination.current || 1, pageSize: pagination.pageSize || 10 }
        })
      } else {
        message.error(errmsg)
      }
    },
    *editCam({ payload, cb }, { select, call, put }) {
      const { errno, errmsg } = yield call(editCam, payload)
      const { pagination } = yield select(app => app.cam)
      if(!errno) {
        cb && cb()
        message.success('更新成功')
        yield put({
          type: 'queryCams',
          payload: { page: pagination.current || 1, pageSize: pagination.pageSize || 10 }
        })
      } else {
        message.error(errmsg)
      }
    }
  },
})


export default cam