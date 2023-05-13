import { Card, Col, Tag } from 'antd';
import React from 'react';
import styles from './index.less'
const { Meta } = Card;

const CamCard = ({
  detail,
  mainTagList,
  tagList
}) => {
  const randerDescription = () => {
    return (
      <>
        {detail.tag.map(i => (
          <Tag color="orange">{tagList?.find(item => item.id === i)?.name}</Tag>
        ))}
        <div style={{
          display: "-webkit-box",
          overflow: "hidden",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        }}>
          {detail.desc}
        </div>
      </>
    )
  }
  return (
    <Col span={12}>
      <Card 
        className={styles.card}
        bordered={false}
        cover={
          <img
            alt="example"
            src={`http://127.0.0.1:3389/manage/img/${detail.posterImg}`}
          />
        }
      >
        <Meta
          title={`${detail.tit}---${mainTagList?.find(i => i.id === detail.mainTag)?.name}`}
          description={randerDescription()}
        />
        
      </Card>
    </Col>
  )
}

export default CamCard