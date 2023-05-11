import React, { useState } from 'react'
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd'
import { connect } from 'umi'
import { hasRole } from 'utils'
import AddManager from './add'

const { Item } = Form


const Filter = ({
  role,
  loading,
  dispatch
}) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (values) => {
    dispatch({
      type: 'manager/queryManager',
      payload: values
    })
  }

  const handleResetField = () => {
    form.resetFields()
    dispatch({
      type: 'manager/queryManager'
    })
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <Form
        name="filter"
        labelAlign="left"
        form={form}
        onFinish={handleFinish}
        {...layout}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Item label="ID" name="id">
              <Input placeholder="管理员ID" />
            </Item>
          </Col>
          <Col span={8}>
            <Item label="用户名" name="username">
              <Input placeholder="管理员用户名" />
            </Item>
          </Col>
          <Col span={8}>
            <Item label="管理员角色" name="role">
              <Select
                placeholder="管理员角色"
                showSearch
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={role.map(i => ({ value: i.id, label: i.name }))}
              />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={16} className='handle-box'>
            <Button type="link" onClick={handleResetField}>重置</Button>
            <Button htmlType="submit" loading={loading.effects['manager/queryManager']}>查询</Button>
            {hasRole([4]) && (<Button type="primary" onClick={showModal}>创建管理员</Button>)}
          </Col>
        </Row>
      </Form>
      <Modal title="创建管理员" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <AddManager role={role} handleOk={handleOk} />
      </Modal>
    </>
  )
}

export default connect(({ manager, loading, dispatch }) => ({ role: manager.role, loading, dispatch }))(Filter)