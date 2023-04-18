import React, { useState } from 'react'
import { connect } from 'umi'
import { Table, Avatar, Button, Popconfirm, Modal, Select } from 'antd';
import moment from 'moment';
import { hasRole } from 'utils'
import EditUser from './edit'
import { STATE_MAP } from 'utils/constant'

const List = ({ user, loading, dispatch }) => {
  const { list, pagination } = user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initValue, setInitValue] = useState();
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

  const renderActions = (record) => {
    return (
      <>
        {
          hasRole(['7']) && (
            <Popconfirm
              title="删除用户"
              description="确认要删除用户?"
              onConfirm={() => confirm(record)}
              okText="是"
              cancelText="否"
            >
              <Button danger>删除</Button>
            </Popconfirm>
          )
        }
        {
          hasRole(['10']) && (
            <Button className='btn-right' type='primary' onClick={() => showModal(record)}>编辑</Button>
          )
        }
      </>
    )
  }
  const confirm = (record) => {
    dispatch({
      type: 'user/delUser',
      payload: {
        id: record.id
      }
    })
  }
  const handlePageChange = (page, pageSize) => {
    dispatch({
      type: 'user/updateState',
      payload: {
        pagination: {
          ...pagination,
          current: page,
          pageSize
        }
      }
    })
    dispatch({
      type: 'user/queryUser',
      payload: {
        page,
        pageSize
      }
    })
  }
  const handleChange = (value, record) => {
    dispatch({
      type: 'user/banUser',
      payload: {
        id: record.id,
        state: value
      }
    })
  }

  const columns = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: '头像',
      width: 50,
      dataIndex: 'userpic',
      key: 'userpic',
      align: 'center',
      render: (val) => (<Avatar src={val} />)
    },
    {
      title: '用户名',
      width: 100,
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '账号状态',
      width: 200,
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (val, record) => (
        <>
          {
            hasRole(['8']) ? (
              <Select
                value={val}
                options={STATE_MAP}
                onChange={(val) => handleChange(val, record)}
              />
            ) : (
              STATE_MAP.find(i => i.value === val)?.label || '未知'
            )
          }
        </>
      )
    },
    {
      title: '名字',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '性别',
      width: 100,
      dataIndex: 'sex',
      key: 'sex',
      align: 'center'
    },
    {
      title: '电话',
      width: 100,
      dataIndex: 'telephone',
      key: 'telephone',
      align: 'center'
    },
    {
      title: '邮箱',
      width: 200,
      dataIndex: 'mailbox',
      key: 'mailbox',
      align: 'center'
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'creattime',
      key: 'creattime',
      render: (val) => moment(val).subtract(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '年龄',
      width: 150,
      dataIndex: 'birth',
      key: 'birth',
      align: 'center',
      render: (val) => moment().diff(moment(val).subtract(8, 'hours'), 'years')
    },
  ]
  if (hasRole(['7', '10'])) {
    columns.push(
      {
        title: '操作',
        width: 200,
        dataIndex: '',
        key: 'x',
        render: renderActions,
      }
    )
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={list}
        loading={loading.effects['user/queryUser']}
        pagination={{
          ...pagination,
          showTotal: total => `共${total}条数据`,
          onChange: handlePageChange
        }}
        scroll={{
          x: 1500,
        }}
      />
      <Modal title="编辑管理员" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <EditUser initValue={initValue} handleOk={handleOk} />
      </Modal>
    </>
  )
}

export default connect(({ user, loading, dispatch }) => ({ user, loading, dispatch }))(List)