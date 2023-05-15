import React from 'react'
import ReactEcharts from 'echarts-for-react'

const ColumnChart = ({
  tagCount
}) => {
  const data = tagCount.map(i => i.count)
  const xAxis = tagCount.map(i => i.name)
  const getOtion = () => {
    const option = {
      title: {
        text: '摄像机分类',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}的数量: {c}',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      legend: {},
      color:['#9fe080'],
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLabel: {
          rotate: -45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          radius: '55%',
          center: ['50%', '60%'],
          data: data,
          showBackground: true,
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

export default ColumnChart