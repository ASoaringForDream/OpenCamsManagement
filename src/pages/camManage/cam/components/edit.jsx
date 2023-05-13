import React, { useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { connect } from 'umi'
const { TextArea } = Input

const EditCam = ({
  initValue,
  dispatch,
  handleOk,
  mainTagList
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      tit: initValue.tit,
      desc: initValue.desc,
      mainTag: initValue.mainTag,
    })
  }, [form, initValue])
  const handleFinish = (values) => {
    dispatch({
      type: 'cam/editCam',
      payload: {
        ...values,
        id: initValue.id
      },
      cb: () => {
        handleOk()
        handleReset()
      }
    })
  }
  const handleReset = () => {
    form.setFieldsValue({
    })
  }
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  return (
    <Form
      name="nest-messages"
      {...layout}
      style={{
        maxWidth: 800,
      }}
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item
        name="tit"
        label="摄像头标题"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="desc"
        label="描述信息"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        name="mainTag"
        label="分类"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="摄像头分类"
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={mainTagList.map(i => ({ value: i.id, label: i.name }))}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 16,
        }}
      >
        <div className='handle-box'>
          <Button type="link" onClick={handleReset}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default connect(({ dispatch }) => ({ dispatch }))(EditCam)