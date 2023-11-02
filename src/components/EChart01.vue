<template>
  <div ref="charts01"
       class="echarts charts-01">
  </div>
</template>

<script>
import { image1 } from './tools.js'
import * as echarts from 'echarts'
// import 'echarts-gl'
let T = 36
let N = -12
let Z = false
export default {
  data() {
    return {
      animation: false,
      tData: {
        nameList: ['2019', '2020', '2021', '2022', '2023'],
        data: [37, 43.8, 178.5, 100, 200],
        color: [
          {
            top: ['#DFC5F9', '#C781F5', '#BD52EB'],
            center: ['#D2A5FD', 'rgba(216,216,216,0.00)'],
            bottom: ['#64339A', '#483F7F'],
            zIndexColor: '#A372CC'
          },
          {
            top: ['#FFCAB3', '#FEAC9D', '#E1795B'],
            center: ['#EEBFAC', 'rgba(216,216,216,0.00)'],
            bottom: ['#88596C', '#514564'],
            zIndexColor: '#FEB0A0'
          },
          {
            top: ['#00FEEE', '#02ECD9', '#07B0FE'],
            center: ['#00FEEE', 'rgba(216,216,216,0.00)'],
            bottom: ['#397D90', '#0A497E'],
            zIndexColor: '#14F4E4'
          },
          {
            top: ['#00FEEE', '#02ECD9', '#07B0FE'],
            center: ['#00FEEE', 'rgba(216,216,216,0.00)'],
            bottom: ['#397D90', '#0A497E'],
            zIndexColor: '#14F4E4'
          },
          {
            top: ['#00FEEE', '#02ECD9', '#07B0FE'],
            center: ['#00FEEE', 'rgba(216,216,216,0.00)'],
            bottom: ['#397D90', '#0A497E'],
            zIndexColor: '#14F4E4'
          }
        ],
        serieName: '电商销售'
      }
    }
  },
  methods: {
    time() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      Z = false
      let self = this
      this.timer = setInterval(() => {
        N--
        if (N === -20) {
          N = -12
        }
        self.setChart()
      }, 150)
    },
    setChart() {
      const tData = this.tData
      const options = {
        animation: Z,
        grid: {
          x: '12%',
          x2: '2%',
          y: '15%',
          y2: '15%'
        },
        xAxis: {
          type: 'category',
          data: tData.nameList,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#74ABF2'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)',
              type: 'solid'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#74ABF2'
            }
          }
        },
        series: [
          {
            data: tData.data,
            itemStyle: {
              color: t => {
                return {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: !1,
                  colorStops: [
                    {
                      offset: 0,
                      color: tData.color[t.dataIndex].center[0]
                    },
                    {
                      offset: 1,
                      color: tData.color[t.dataIndex].center[1]
                    }
                  ]
                }
              }
            },
            label: {
              show: false,
              position: 'top',
              fontSize: 13,
              textStyle: {
                fontSize: 14,
                color: '#00FEEE'
              }
            },
            type: 'bar',
            z: 1,
            barWidth: T,
            barGap: '0%'
          },
          {
            name: '',
            type: 'pictorialBar',
            symbol: 'diamond',
            symbolSize: [T - 3, (10 * (T - 3)) / T],
            symbolOffset: ['-0%', '-26%'],
            z: 12,
            min: 0,
            max: 80,
            symbolPosition: 'end',
            itemStyle: {
              color: t => {
                return new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: tData.color[t.dataIndex].top[0]
                    },
                    {
                      offset: 0.73,
                      color: tData.color[t.dataIndex].top[1]
                    },
                    {
                      offset: 1,
                      color: tData.color[t.dataIndex].top[2]
                    }
                  ],
                  false
                )
              }
            },
            data: tData.data
          },
          {
            universalTransition: {
              enabled: false
            },
            type: 'scatter',
            zlevel: 3,
            silent: !1,
            symbolOffset: ['-0%', N + '%'],
            label: {
              show: false
            },
            symbol: 'image://' + image1,
            symbolSize: [77, 25],
            itemStyle: {
              color: 'rgb(255,255,255,1)',
              opacity: 1
            },
            data: tData.data
          }
        ]
      }
      let charts01 = this.charts01
      if (!charts01) {
        const div = this.$refs.charts01
        charts01 = echarts.init(div, null, { renderer: 'svg' })
        let l = function () {
          charts01.resize()
        }
        this.$erd.listenTo(div, l)
        this.charts01 = charts01
      }
      charts01.clear()
      charts01.setOption(options)
      charts01.resize()
    }
  },
  mounted() {
    this.setChart()
    this.time()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>