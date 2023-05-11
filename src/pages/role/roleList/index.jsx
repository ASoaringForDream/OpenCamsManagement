import React from 'react'
import { connect } from 'umi'
import { Tag } from 'antd'

const RoleList = ({
  roleList
}) => {

  return (
    <div>
      {roleList.map(i => (
        <Tag color="geekblue" >{i.name}</Tag>
      ))}
    </div>
  )
}

export default connect(({app}) => ({roleList: app.roleList}))(RoleList)