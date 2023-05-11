import React, { useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { connect } from 'umi'

const EditCharacter = ({
  roleList,
  initValue,
  dispatch,
  handleOk
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: initValue.name,
      role_ids: initValue.role_ids,
      role_desc: initValue.role_desc,
      
    })
  }, [form, initValue])
  const handleFinish = (values) => {
    dispatch({
      type: 'character/editCharacter',
      payload: {
        ...values,
        role_ids: values.role_ids.join(','),
        id: initValue.id
      },
      cb: () => {
        handleOk()
        form.resetFields()
      }
    })
  }
  const handleChange = (_, option) => {
    if(option.length) {
      let desc = '拥有权限：'
      option.forEach((i, idx) => {
        desc = desc + ' ' + (idx + 1) + ', ' + i.label
      })
      form.setFieldValue('role_desc', desc)
    }
  }
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <Form
      name="nest-messages"
      {...layout}
      style={{
        maxWidth: 600,
      }}
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item
        name="name"
        label="角色名"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="role_ids"
        label="权限列表"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="请选择权限"
          showSearch
          allowClear
          mode="multiple"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={roleList.map(i => ({ value: i.id, label: i.name }))}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        name="role_desc"
        label="描述信息"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea placeholder="请输入描述信息" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({ app, dispatch }) => ({ roleList: app.roleList, dispatch }))(EditCharacter)