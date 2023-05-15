import React from 'react'
import { Col, Row, Statistic, Card } from 'antd';
import PropTypes from 'prop-types'
import CountUp from 'react-countup';
import { connect } from 'umi'
import LineChart from './components/lineChart';
import ColumnChart from './components/columnChart';


const Dashboard = ({
  dashboard,
  loading
}) => {
  const { allVisitCount, camCount, tagCount, userAddToday, userCount, visitAdd } = dashboard
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      <Row>
        <Col span={6}>
          <Card bordered={false} style={{
            margin: '0 10px'
          }}>
            <Statistic title="网站总点击量" value={allVisitCount} formatter={formatter} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{
            margin: '0 10px'
          }}>
            <Statistic title="摄像头总数" value={camCount} formatter={formatter} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{
            margin: '0 10px'
          }}>
            <Statistic title="用户总数" value={userCount} formatter={formatter} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{
            margin: '0 10px'
          }}>
            <Statistic title="今日新增用户" value={userAddToday} formatter={formatter} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
      </Row>
      <Row style={{
        marginTop: 30
      }}>
        <Col span={12}>
          <Card style={{
            marginRight: 10
          }}>
            <LineChart visitAdd={visitAdd} />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{
            marginLeft: 10
          }}>
            <ColumnChart tagCount={tagCount} />
          </Card>
        </Col>
      </Row>
    </>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({
  dashboard,
  loading,
}))(Dashboard)
