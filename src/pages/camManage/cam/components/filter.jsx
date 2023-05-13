import React from 'react'
import { Form, Input, Row, Col, Button, Select } from 'antd'
import { connect } from 'umi'

const { Item } = Form


const Filter = ({
  mainTagList,
  loading,
  dispatch
}) => {

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    dispatch({
      type: 'cam/queryCams',
      payload: values
    })
    dispatch({
      type: 'cam/updateState',
      payload: {
        FormData: values
      }
    })
  }

  const handleResetField = () => {
    form.resetFields()
    dispatch({
      type: 'cam/queryCams'
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
              <Input placeholder="摄像头ID" />
            </Item>
          </Col>
          <Col span={8}>
            <Item label="摄像头名称" name="tit">
              <Input placeholder="摄像头名称" />
            </Item>
          </Col>
          <Col span={8}>
            <Item label="分类" name="mainTag">
              <Select
                placeholder="摄像头分类"
                showSearch
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={mainTagList.map(i => ({ value: i.id, label: i.name }))}
              />
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={16} className='handle-box'>
            <Button type="link" onClick={handleResetField}>重置</Button>
            <Button type='primary' htmlType="submit" loading={loading.effects['cam/queryCams']}>查询</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default connect(({ cam, loading, dispatch }) => ({ mainTagList: cam.mainTagList, loading, dispatch }))(Filter)