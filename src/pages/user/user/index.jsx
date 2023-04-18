import React from 'react'
import { Card } from 'antd'
import Filter from './conponents/filter'
import List from './conponents/list'

const User = () => {
  return (
    <>
      <Card>
        <Filter></Filter>
      </Card>
      <Card style={{
        marginTop:'20px'
      }}>
        <List></List>
      </Card>
    </>
  )
}

export default User