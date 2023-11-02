<template>
  <div ref="charts01"
       class="echarts charts-01">
  </div>
</template>

<script>
import * as echarts from 'echarts'
// import 'echarts-gl'
let y = []
for (let J = 0; J < 5; ++J) {
  y.push(Math.round(10 * Math.random()))
}
let v = [0, 0],
  x = [12, 12],
  C = [0, -40],
  w = [7, 7],
  S = [-18, -10],
  A = [6, 6],
  z = !0
export default {
  data() {
    return {
      animation: false,
      echartData: {
        nameList: ['2019', '2020', '2021'],
        data: [161.5, 162.48, 153.9],
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
          }
        ],
        serieName: '粮食产量'
      }
    }
  },
  methods: {
    setChart() {
      var t = this.echartData.nameList,
        a = this.echartData.data
      this.echartData.serieName
      let e = this
      this.option = {
        animation: z,
        grid: {
          left: '10%',
          top: '22%',
          right: '5%',
          bottom: '20%'
        },
        legend: {
          show: !0,
          icon: 'circle',
          orient: 'horizontal',
          top: '90.5%',
          right: 'center',
          itemWidth: 16.5,
          itemHeight: 6,
          textStyle: {
            color: '#74ABF2',
            fontSize: 14
          }
        },
        xAxis: [
          {
            data: t,
            axisLabel: {
              textStyle: {
                color: function (t) {
                  let a = 0
                  for (let o = 0; o < e.echartData.nameList.length; o++)
                    if (e.echartData.nameList[o] == t) return (a = o), e.echartData.color[a].zIndexColor
                },
                fontSize: 14
              },
              margin: 12
            },
            axisLine: {
              show: !1
            },
            axisTick: {
              show: !1
            },
            boundaryGap: !0,
            splitLine: {
              show: !1,
              width: 0.08,
              lineStyle: {
                type: 'solid',
                color: '#03202E'
              }
            }
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: !0,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
                type: 'solid'
              }
            },
            axisTick: {
              show: !1
            },
            axisLine: {
              show: !1
            },
            axisLabel: {
              show: !0,
              textStyle: {
                color: '#74ABF2'
              }
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [46, 20],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                color: function (t) {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: e.echartData.color[t.dataIndex].bottom[0]
                    },
                    {
                      offset: 1,
                      color: e.echartData.color[t.dataIndex].bottom[1]
                    }
                  ])
                }
              }
            },
            data: a
          },
          {
            name: '',
            type: 'bar',
            barWidth: 46,
            barGap: '0%',
            itemStyle: {
              normal: {
                color: function (t) {
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
                        color: e.echartData.color[t.dataIndex].center[0]
                      },
                      {
                        offset: 1,
                        color: e.echartData.color[t.dataIndex].center[1]
                      }
                    ]
                  }
                }
              }
            },
            label: {
              normal: {
                show: !0,
                position: 'top',
                fontSize: 13,
                textStyle: {
                  fontSize: 14,
                  color: '#00FEEE'
                }
              }
            },
            data: a
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [46, 14],
            symbolOffset: [0, 4],
            z: 15,
            itemStyle: {
              normal: {
                color: function (t) {
                  return e.echartData.color[t.dataIndex].zIndexColor
                }
              }
            },
            data: a
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [46, 20],
            symbolOffset: [0, -8],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: function (t) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: e.echartData.color[t.dataIndex].top[0]
                      },
                      {
                        offset: 0.73,
                        color: e.echartData.color[t.dataIndex].top[1]
                      },
                      {
                        offset: 1,
                        color: e.echartData.color[t.dataIndex].top[2]
                      }
                    ],
                    !1
                  )
                }
              }
            },
            data: a
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
      this.setRadiusAnimation()
      charts01.setOption(this.option)
      charts01.resize()
    },
    setRadiusAnimation() {
      let t = this
      this.option.series.unshift(
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: x,
          symbolOffset: v,
          z: 20,
          itemStyle: {
            color: function (a) {
              var e = [
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(209,164,253)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(209,164,253)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(209,164,253)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(202,166,163)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(202,166,163)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(202,166,163)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0,254,238)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(0,254,238)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(0,254,238)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: '#fed6ee'
                  },
                  {
                    offset: 0.5,
                    color: '#fd359c'
                  },
                  {
                    offset: 1,
                    color: '#fd359c'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: '#fefdf9'
                  },
                  {
                    offset: 0.5,
                    color: '#aa2cbd'
                  },
                  {
                    offset: 1,
                    color: '#aa2cbd'
                  }
                ])
              ]
              return e[a.dataIndex]
            }
          },
          symbolPosition: 'end',
          data: y
        },
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: w,
          symbolOffset: C,
          z: 20,
          itemStyle: {
            color: function (a) {
              var e = [
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(209,164,253)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(209,164,253)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(209,164,253)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(202,166,163)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(202,166,163)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(202,166,163)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0,254,238)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(0,254,238)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(0,254,238)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: '#fed6ee'
                  },
                  {
                    offset: 0.5,
                    color: '#fd359c'
                  },
                  {
                    offset: 1,
                    color: '#fd359c'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: '#fefdf9'
                  },
                  {
                    offset: 0.5,
                    color: '#aa2cbd'
                  },
                  {
                    offset: 1,
                    color: '#aa2cbd'
                  }
                ])
              ]
              return e[a.dataIndex]
            }
          },
          symbolPosition: 'end',
          data: y
        },
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: A,
          symbolOffset: S,
          z: 18,
          itemStyle: {
            color: function (a) {
              var e = [
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(209,164,253)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(209,164,253)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(209,164,253)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(202,166,163)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(202,166,163)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(202,166,163)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0,254,238)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(0,254,238)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(0,254,238)'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: '#fed6ee'
                  },
                  {
                    offset: 0.5,
                    color: '#fd359c'
                  },
                  {
                    offset: 1,
                    color: '#fd359c'
                  }
                ]),
                new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: '#fefdf9'
                  },
                  {
                    offset: 0.5,
                    color: '#aa2cbd'
                  },
                  {
                    offset: 1,
                    color: '#aa2cbd'
                  }
                ])
              ]
              return e[a.dataIndex]
            }
          },
          symbolPosition: 'end',
          data: y
        }
      )
    },
    getOffset() {
      let t = !1
      setInterval(() => {
        ;(z = !1),
          (v[1] = v[1] - 0.3),
          (C[1] = C[1] - 0.2),
          (S[1] = S[1] - 0.4),
          (x[0] = x[0] - 0.02),
          (x[1] = x[1] - 0.02),
          v[1] <= -80 && ((v[1] = -9), (x = [0, 0]), (t = !0)),
          t &&
            (setTimeout(() => {
              x = [12, 12]
            }, 2e3 * Math.random()),
            (t = !1)),
          C[1] <= -80
            ? ((C[1] = -9), (w = [0, 0]))
            : setTimeout(() => {
                w = [7, 7]
              }, 2e3 * Math.random()),
          S[1] <= -80
            ? ((S[1] = -9), (A = [0, 0]))
            : setTimeout(() => {
                A = [6, 6]
              }, 2e3 * Math.random()),
          this.setChart()
      }, 20)
    }
  },
  mounted() {
    this.setChart()
    this.getOffset()
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