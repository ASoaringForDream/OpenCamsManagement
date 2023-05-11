import { Card, Col } from 'antd';
import React from 'react';
import styles from './index.less'
const { Meta } = Card;

const RoleCard = ({role, path}) => {
  return (
    <Col span={8}>
      <Card 
        className={styles.card}
        bordered={false}
        cover={
          <img
            alt="example"
            src={path}
          />
        }
      >
        <Meta
          title={role.name}
          description={`拥有权限：${role.name}${role.name.includes('查看') ? '页面' : ''}`}
        />
        
      </Card>
    </Col>
  )
}

export default RoleCard