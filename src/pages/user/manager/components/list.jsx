import React, { useState } from 'react'
import { connect } from 'umi'
import { Table, Avatar, Button, Popconfirm, Modal } from 'antd';
import moment from 'moment';
import { hasRole } from 'utils'
import EditManager from './edit'

const List = ({ manager, loading, dispatch }) => {
  const { list, pagination, role } = manager
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
          hasRole([5]) && (
            <Popconfirm
              title="删除管理员"
              description="确认要删除管理员?"
              onConfirm={() => confirm(record)}
              okText="是"
              cancelText="否"
            >
              <Button danger>删除</Button>
            </Popconfirm>
          )
        }
        {
          hasRole([6]) && (
            <Button className='btn-right' type='primary' onClick={() => showModal(record)}>编辑</Button>
          )
        }
      </>
    )
  }
  const confirm = (record) => {
    dispatch({
      type: 'manager/delManager',
      payload: {
        id: record.id
      }
    })
  }
  const handlePageChange = (page, pageSize) => {
    dispatch({
      type: 'manager/updateState',
      payload: {
        pagination: {
          ...pagination,
          current: page,
          pageSize
        }
      }
    })
    dispatch({
      type: 'manager/queryManager',
      payload: {
        page,
        pageSize
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
      title: '权限角色',
      width: 200,
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (val) => role.find(i => i.id === val)?.name || '未知角色'
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
  if (hasRole([5, 6])) {
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
        loading={loading.effects['manager/queryManager']}
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
        <EditManager initValue={initValue} role={role} handleOk={handleOk} />
      </Modal>
    </>
  )
}

export default connect(({ manager, loading, dispatch }) => ({ manager, loading, dispatch }))(List)