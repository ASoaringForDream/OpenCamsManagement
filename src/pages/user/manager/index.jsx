import React from 'react'
import { Card } from 'antd'
import Filter from './components/filter'
import List from './components/list'

const Manager = () => {
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

export default Manager