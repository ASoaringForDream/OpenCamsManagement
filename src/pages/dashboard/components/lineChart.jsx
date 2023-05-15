import React from 'react'
import ReactEcharts from 'echarts-for-react'
import moment from 'moment'

const LineChart = ({
  visitAdd
}) => {
  const getOtion = () => {
    const option = {
      title: {
        text: '用户访问量',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} 访问量: {c}',
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: [
          moment().subtract(4, 'days').format('YYYY-MM-DD'),
          moment().subtract(3, 'days').format('YYYY-MM-DD'),
          moment().subtract(2, 'days').format('YYYY-MM-DD'),
          moment().subtract(1, 'days').format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD'),
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          smooth: true,
          radius: '55%',
          center: ['50%', '60%'],
          data: visitAdd,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    return option
  }

  return (
    <div className="examples">
      <ReactEcharts
          option={getOtion()}
          style={{ height: 300 }}
        />
    </div>
  )
}

export default LineChart