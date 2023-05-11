import React, { useState } from 'react'
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd'
import { connect } from 'umi'
import { hasRole } from 'utils'
import AddUser from './add'
import { STATE_MAP } from 'utils/constant'

const { Item } = Form


const Filter = ({
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
      type: 'user/queryUser',
      payload: values
    })
  }

  const handleResetField = () => {
    form.resetFields()
    dispatch({
      type: 'user/queryUser'
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
              <Input placeholder="用户ID" />
            </Item>
          </Col>
          <Col span={8}>
            <Item label="用户名" name="username">
              <Input placeholder="用户的用户名" />
            </Item>
          </Col>
          <Col span={8}>
            <Item label="用户状态" name="state">
              <Select
                placeholder="用户账号状态"
                showSearch
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={STATE_MAP}
              />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={16} className='handle-box'>
            <Button type="link" onClick={handleResetField}>重置</Button>
            <Button htmlType="submit" loading={loading.effects['user/queryUser']}>查询</Button>
            {hasRole([9]) && (<Button type="primary" onClick={showModal}>创建用户</Button>)}
          </Col>
        </Row>
      </Form>
      <Modal title="创建用户" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <AddUser handleOk={handleOk} />
      </Modal>
    </>
  )
}

export default connect(({ loading, dispatch }) => ({ loading, dispatch }))(Filter)