import React from 'react'
import { Row } from 'antd'
import { connect } from 'umi'
import CamTagCard from './components/camTagCard'

const CamTag = ({
  list,
  tags
}) => {
  return (
    <>
      <div className='block-box'>分类</div>
      <Row>
        {list.map(i => (
          <CamTagCard tag={i} ></CamTagCard>
        ))}
      </Row>
      <div className='block-box'>标签</div>
      <Row>
        {tags.map(i => (
          <CamTagCard tag={i} ></CamTagCard>
        ))}
      </Row>
    </>
  )
}

export default connect(({ camTag }) => ({ list: camTag.list, tags: camTag.tags }))(CamTag)