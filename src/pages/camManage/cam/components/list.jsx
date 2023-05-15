import React, { useState } from 'react'
import { connect } from 'umi'
import { Button, Table, Popconfirm, Modal, Image, Select, Radio, Row, Pagination, Tooltip } from 'antd'
import { hasRole } from 'utils'
import EditCam from './edit'
import iconMap from 'utils/iconMap'
import CamCard from './camCard'

const List = ({ cam, loading, dispatch }) => {
  const { list, pagination, mainTagList, tagList } = cam
  const [viewType, setViewType] = useState('list')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initValue, setInitValue] = useState({});
  const showModal = (record) => {
    setInitValue(record)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const confirm = (record) => {
    dispatch({
      type: 'cam/deleteCam',
      payload: {
        id: record.id
      }
    })
  }
  const renderActions = (record) => {
    return (
      <>
        {
          hasRole([17]) && (
            <Popconfirm
              title="删除摄像头"
              description="确认要删除摄像头?"
              onConfirm={() => confirm(record)}
              okText="是"
              cancelText="否"
            >
              <Button danger>删除</Button>
            </Popconfirm>
          )
        }
        {
          hasRole([16]) && (
            <Button className='btn-right' type='primary' onClick={() => showModal(record)}>编辑</Button>
          )
        }
      </>
    )
  }
  const handleCateChange = (curr, now, id) => {
    if (curr === +now) {
      return
    }
    dispatch({
      type: 'cam/editCam',
      payload: {
        mainTag: curr,
        id
      },
    })
  }
  const handleTagChange = (value, id) => {
    dispatch({
      type: 'cam/editCam',
      payload: {
        tag: value?.join(',') || '',
        id
      },
    })
  }
  const renderCate = (record, detail) => {
    return (
      <Select
        style={{
          width: '200px'
        }}
        value={+record}
        options={mainTagList?.map(i => ({ value: i.id, label: i.name }))}
        onChange={(curr) => handleCateChange(curr, record, detail.id)}
      />
    )
  }
  const renderTags = (record, detail) => {
    return (
      <Select
        mode='multiple'
        style={{
          width: '200px'
        }}
        allowClear
        value={record}
        options={tagList?.map(i => ({ value: i.id, label: i.name }))}
        onChange={(value) => handleTagChange(value, detail.id)}
      />
    )
  }
  const columns = () => {
    const res = [
      {
        title: 'ID',
        width: 50,
        dataIndex: 'id',
        key: 'id',
        align: 'center'
      },
      {
        title: '标题',
        width: 200,
        dataIndex: 'tit',
        key: 'tit',
        align: 'center'
      },
      {
        title: '描述信息',
        width: 500,
        dataIndex: 'desc',
        key: 'desc',
        align: 'center'
      },
      {
        title: '封面',
        width: 200,
        dataIndex: 'posterImg',
        key: 'posterImg',
        align: 'center',
        render: (record) => (
          <Image
            width='200'
            src={`http://127.0.0.1:3389/manage/img/${record}`}
          />
        )
      },
      {
        title: '标签',
        width: 200,
        dataIndex: 'tag',
        key: 'tag',
        align: 'center',
        render: renderTags
      },
      {
        title: '分类',
        width: 200,
        dataIndex: 'mainTag',
        key: 'mainTag',
        align: 'center',
        render: renderCate
      },
      {
        title: '国家',
        width: 100,
        dataIndex: 'country',
        key: 'country',
        align: 'center',
        render: (record) => record || '--'
      },
      {
        title: '地区',
        width: 80,
        dataIndex: 'state',
        key: 'state',
        align: 'center',
        render: (record) => record || '--'
      },
      {
        title: '城市',
        width: 80,
        dataIndex: 'city',
        key: 'city',
        align: 'center',
        render: (record) => record || '--'
      },
      {
        title: '点赞',
        width: 80,
        dataIndex: 'like',
        key: 'like',
        align: 'center'
      },
      {
        title: '被踩',
        width: 80,
        dataIndex: 'dislike',
        key: 'dislike',
        align: 'center'
      },
      {
        title: '点击',
        width: 80,
        dataIndex: 'clickcount',
        key: 'clickcount',
        align: 'center'
      },
      {
        title: '资源地址',
        width: 300,
        dataIndex: 'source',
        key: 'source',
        align: 'center',
        render: (record) => <a href={record} target='_blank' rel="noreferrer">{record}</a>
      },
      {
        title: '展示类型',
        width: 50,
        dataIndex: 'type',
        key: 'type',
        align: 'center'
      },
    ]
    if (hasRole([16, 17])) {
      res.push(
        {
          title: '操作',
          width: 200,
          dataIndex: '',
          key: 'x',
          render: renderActions,
        }
      )
    }
    return res
  }
  const handlePageChange = (page, pageSize) => {
    dispatch({
      type: 'cam/updateState',
      payload: {
        pagination: {
          ...pagination,
          current: page,
          pageSize
        }
      }
    })
    const { FormData } = cam
    dispatch({
      type: 'cam/queryCams',
      payload: {
        ...FormData,
        page,
        pageSize
      }
    })
  }

  const handleChange = (e) => {
    setViewType(e.target.value)
  }


  return (
    <>
      <div className='handle-box' style={{
        marginBottom: '20px'
      }}>
        <Radio.Group buttonStyle='solid' optionType='button' value={viewType} onChange={handleChange}>
          <Tooltip placement="top" title="列表视图">
            <Radio.Button value="list">{iconMap.listView}</Radio.Button>
          </Tooltip>
          <Tooltip placement="top" title="卡片视图">
            <Radio.Button value="card">{iconMap.cardView}</Radio.Button>
          </Tooltip>
        </Radio.Group>
      </div>

      {viewType === 'list' && (
        <Table
          columns={columns()}
          dataSource={list}
          loading={loading.effects['character/queryCharacter']}
          pagination={{
            ...pagination,
            showTotal: total => `共${total}条数据`,
            onChange: handlePageChange
          }}
          scroll={{
            x: 3000,
          }}
        />
      )}
      {viewType === 'card' && (
        <Row>
          {list.map(i => (
            <CamCard detail={i} mainTagList={mainTagList} tagList={tagList} />
          ))}
          <div className='middle-box'>
            <div>
              <Pagination showQuickJumper {...pagination} onChange={handlePageChange} />
            </div>
          </div>
        </Row>
      )}
      <Modal title="编辑摄像头" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <EditCam initValue={initValue} handleOk={handleOk} mainTagList={mainTagList} />
      </Modal>
    </>
  )
}

export default connect(({ cam, loading, dispatch }) => ({ cam, loading, dispatch }))(List)