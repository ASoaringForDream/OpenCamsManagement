import React from 'react'
import { connect } from 'umi'
import { Row } from 'antd'
import RoleCard from './conponents/roleCard'

const RoleList = ({
  roleList
}) => {
  const paths = []
  for(let i = 0; i < roleList.length; i++) {
    if(i === 0){
      paths.push(`/${Math.floor(Math.random()*9 + 1)}.jpg`)
    }else{
      let path = `/${Math.floor(Math.random()*9 + 1)}.jpg`
      while(path === paths[paths.length - 1]) {
        path = `/${Math.floor(Math.random()*9 + 1)}.jpg`
      }
      paths.push(path)
    }
  }
  return (
    <Row>
      {roleList.map((i, idx) => (
        <RoleCard role={i} path={paths[idx]} ></RoleCard>
      ))}
    </Row>
  )
}

export default connect(({app}) => ({roleList: app.roleList}))(RoleList)