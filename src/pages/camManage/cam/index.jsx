import React from 'react'
import { Card } from 'antd'
import List from './components/list'
import Filter from './components/filter'

const Cam = () => {
  return (
    <>
      <Card>
        <Filter></Filter>
      </Card>
      <Card style={{
        marginTop: '20px'
      }}>
        <List />
      </Card>
    </>
  )
}

export default Cam