import React, { useState } from 'react'
import { connect } from 'umi'
import { Button, Table, Popconfirm, Modal } from 'antd'
import AddCharacter from './add'
import EditCharacter from './edit'
import { hasRole } from 'utils'

const List = ({ character, loading, dispatch }) => {
  const { list, pagination } = character
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [initValue, setInitValue] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal2 = (record) => {
    setInitValue(record)
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const handlePageChange = () => {

  }
  const confirm = (record) => {
    dispatch({
      type: 'character/deleteCharacter',
      payload: {
        id: record.id
      }
    })
  }
  const renderActions = (record) => {
    return (
      <>
        {
          hasRole([13]) && (
            <Popconfirm
              title="删除角色"
              description="确认要删除角色?"
              onConfirm={() => confirm(record)}
              okText="是"
              cancelText="否"
            >
              <Button danger>删除</Button>
            </Popconfirm>
          )
        }
        {
          hasRole([14]) && (
            <Button className='btn-right' type='primary' onClick={() => showModal2(record)}>编辑</Button>
          )
        }
      </>
    )
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
      title: '名称',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '描述',
      width: 500,
      dataIndex: 'role_desc',
      key: 'role_desc',
      align: 'center'
    }
  ]
  if (hasRole([13, 14])) {
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
      <div className='handle-box' style={{
        marginBottom: '20px'
      }}>
        <Button type='primary' onClick={showModal}>新建角色</Button>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        loading={loading.effects['character/queryCharacter']}
        pagination={{
          ...pagination,
          showTotal: total => `共${total}条数据`,
          onChange: handlePageChange
        }}
      />
      <Modal title="创建角色" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <AddCharacter handleOk={handleOk} />
      </Modal>
      <Modal title="编辑角色" open={isModalOpen2} onCancel={handleCancel2} footer={null}>
        <EditCharacter initValue={initValue} handleOk={handleOk2} />
      </Modal>
    </>
  )
}

export default connect(({ character, loading, dispatch }) => ({ character, loading, dispatch }))(List)