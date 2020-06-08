import Taro, { Component } from '@tarojs/taro'
import {
  AtButton,
  AtToast,
  AtCheckbox
} from 'taro-ui'
import { View } from '@tarojs/components'
import './index.scss'
// import LineChart from '../../common/lineChart'

export default class Compute extends Component {


  state = {
    oneoption: [
      {
        value: +3,
        label: 'Before the max date of daily new case'
      },
      {
        value: 0,
        label: 'After the max date of daily new case'
      }
    ],
    ReactionOption: [
      {
        value: +5,
        label: '>ULN'
      },
      {
        value: 0,
        label: '≤ULN'
      }
    ],
    Ageoption: [
      {
        value: +3,
        label: '60 and above'
      },
      {
        value: 0,
        label: 'Below 60'
      }
    ],
    Heartoption: [
      {
        value: +2,
        label: 'Above 30(bpm)'
      },
      {
        value: 0,
        label: '30(bpm) and below'
      }
    ],
    SerumUreaNitrogen: [
      {
        value: +2,
        label: '>ULN'
      },
      {
        value: 0,
        label: '≤ULN'
      }
    ],
    Absoluteoption: [
      {
        value: +2,
        label: '>ULN'
      },
      {
        value: 0,
        label: '≤ULN'
      }
    ],
    SaO2option: [
      // sa02
      {
        value: +4,
        label: '<90%'
      },
      {
        value: 0,
        label: '≥90%'
      }
    ],
    Serumoption: [
      {
        value: +2,
        label: '>ULN'
      },
      {
        value: 0,
        label: '≤ULN'
      }
    ],
    ruleForm: {
      region: '',
      Reaction: '',
      Age: '',
      Heart: '',
      SerumUreaNi: '',
      Absolute: '',
      SaO2: '',
      Serum: ''
    },
    region: [],
    Reaction: [],
    Age: [],
    Heart: [],
    SerumUreaNi: [],
    Absolute: [],
    SaO2: [],
    Serum: [],
    errorMsg: '',
    errorToast: false,
    DataNumber: '', //分数
    riskNumber: '', //百分比
  }

  onSubmit = () => {
    var option = {
      // tooltip: {
      //   trigger: 'axis', // 触发类型，默认数据触发，可选为：'item' ¦ 'axis'
      //   axisPointer: {
      //     // 坐标轴指示器，坐标轴触发有效
      //     type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
      //     label: {
      //       backgroundColor: '#6a7985'
      //     }
      //   }
      // },
      // 图例
      legend: {
        right: 0,
        data: ['Low Risk 0-8', 'High Risk 9-12'],
        textStyle: {
          fontSize: 12,
        }
      },
      // 网格
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // X轴中的数据
      xAxis: [
        {
          // name: '分数',
          type: 'category',
          // symbol: 'none',
          // boundaryGap: false,
          data: ['0', '5', '10', '15', '20'],
          axisTick: {
            show: false
          }
        }
      ],
      // y轴中的数据
      yAxis: [
        {
          type: 'value',
          // name: '销售台数',
          nameTextStyle: {
            color: 'rgba(48,194,255,1)'
          },
          axisLine: {
            //坐标轴轴线相关设置
            show: true
            // lineStyle: {
            // 	color: 'rgba(48,194,255,1)',
            // 	width: 2
            // }
          },
          axisTick: {
            show: false
          }, //标记长度
          axisLabel: {
            show: true,
            margin: 10
            // textStyle: {
            // 	color: 'rgba(48,194,255,1)',
            // 	fontSize: 16
            // }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(48,194,255,.5)',
              width: 1,
              type: 'solid'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(48,194,255,.2)', 'rgba(48,194,255,.0)']
            }
          }
        }
      ],
      series: [
        {
          name: 'High Risk 9-12',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          stack: '总量',
          connectNulls: true, //这个是重点，将断点连
          areaStyle: {},
          data: [0, 0.028923, 0.05468, 0.087845, 0.09596, 0.084175]
        },
        {
          name: 'Low Risk 0-8',
          type: 'line',
          stack: '总量',
          smooth: true,
          symbol: 'circle',
          connectNulls: true, //这个是重点，将断点连
          areaStyle: {},
          data: [
            0.066289,
            0.072266,
            0.104078,
            0.064078,
            0.005015,
            0.000326
          ]
        }
      ]
    };
    // console.log(this.myEcharts)
    // this.myEcharts.refresh(option)
    let valid = this.validate()
    console.log(valid)
    if (!valid) {
      // 通过验证
      let theTotal = 0
      console.log(this.state.ruleForm)
      let ruleForm = this.state.ruleForm
      for (const item in ruleForm) {
        theTotal += parseInt(ruleForm[item])
      }
      this.setState({
        DataNumber: theTotal,
      })
      this.getriskNumber(theTotal)
    } else {
      this.setState({
        errorMsg: `${valid.msg} is Empty`,
        errorToast: true
      })
    }
  }

  //计算risk number
  getriskNumber(DataNumber) {
    if (DataNumber == 23) {
      this.setState({
        riskNumber: '100%'
      })
      return
    }
    if (DataNumber <= 10) {
      this.setState({
        riskNumber: '1%'
      })
      return
    }

    this.setState({
      riskNumber: Math.ceil((DataNumber - 10) * (100 / 14)) + '%'
    })
  }

  validate() {
    let ruleForm = this.state.ruleForm
    let valid = null
    for (const ele in ruleForm) {
      let value = ruleForm[ele]
      if (value === '') {
        valid = {
          msg: ele
        }
        break
      }
    }
    return valid
  }

  onReset = () => {
    console.log('onReset')
    this.setState({
      ruleForm: {
        region: '',
        Reaction: '',
        Age: '',
        Heart: '',
        SerumUreaNi: '',
        Absolute: '',
        SaO2: '',
        Serum: ''
      },
      region: '',
      Reaction: '',
      Age: '',
      Heart: '',
      SerumUreaNi: '',
      Absolute: '',
      SaO2: '',
      Serum: '',
      DataNumber: '', //分数
      riskNumber: '', //百分比
      errorMsg: '',
      errorToast: false,
    })
  }

  onChange = (val, type) => {
    console.log(val, type)
    switch (type) {
      case 'region':
      {
        let region = []
        if(val.length > 1) {
          region = [val[1]]
        } else if (val.length === 1) {
          region = [val[0]]
        } else {
          region = []
        }
        let value = region.length ? region[0] : ''
        let ruleForm = Object.assign({}, this.state.ruleForm, { region: value })
        this.setState({
          ruleForm: ruleForm,
          region
        })
      }
        break;
      case 'Reaction':
      {
        let Reaction = []
        if (val.length > 1) {
          Reaction = [val[1]]
        } else if (val.length === 1) {
          Reaction = [val[0]]
        } else {
          Reaction = []
        }
        let value = Reaction.length ? Reaction[0] : ''
        let ruleForm = Object.assign({}, this.state.ruleForm, { Reaction: value })
        this.setState({
          ruleForm: ruleForm,
          Reaction
        })
      }
        break;
      case 'Age':
        {
          let Age = []
          if (val.length > 1) {
            Age = [val[1]]
          } else if (val.length === 1) {
            Age = [val[0]]
          } else {
            Age = []
          }
          let value = Age.length ? Age[0] : ''
          let ruleForm = Object.assign({}, this.state.ruleForm, { Age: value })
          this.setState({
            ruleForm: ruleForm,
            Age
          })
        }
        break;
      case 'Heart':
        {
          let Heart = []
          if (val.length > 1) {
            Heart = [val[1]]
          } else if (val.length === 1) {
            Heart = [val[0]]
          } else {
            Heart = []
          }
          let value = Heart.length ? Heart[0] : ''
          let ruleForm = Object.assign({}, this.state.ruleForm, { Heart: value })
          this.setState({
            ruleForm: ruleForm,
            Heart
          })
        }
        break;
      case 'SerumUreaNi':
        {
          let SerumUreaNi = []
          if (val.length > 1) {
            SerumUreaNi = [val[1]]
          } else if (val.length === 1) {
            SerumUreaNi = [val[0]]
          } else {
            SerumUreaNi = []
          }
          let value = SerumUreaNi.length ? SerumUreaNi[0] : ''
          let ruleForm = Object.assign({}, this.state.ruleForm, { SerumUreaNi: value })
          this.setState({
            ruleForm: ruleForm,
            SerumUreaNi
          })
        }
        break;
      case 'Absolute':
        {
          let Absolute = []
          if (val.length > 1) {
            Absolute = [val[1]]
          } else if (val.length === 1) {
            Absolute = [val[0]]
          } else {
            Absolute = []
          }
          let value = Absolute.length ? Absolute[0] : ''
          let ruleForm = Object.assign({}, this.state.ruleForm, { Absolute: value })
          this.setState({
            ruleForm: ruleForm,
            Absolute
          })
        }
        break;
      case 'SaO2':
        {
          let SaO2 = []
          if (val.length > 1) {
            SaO2 = [val[1]]
          } else if (val.length === 1) {
            SaO2 = [val[0]]
          } else {
            SaO2 = []
          }
          let value = SaO2.length ? SaO2[0] : ''
          let ruleForm = Object.assign({}, this.state.ruleForm, { SaO2: value })
          this.setState({
            ruleForm: ruleForm,
            SaO2
          })
        }
        break;
      case 'Serum':
        {
          let Serum = []
          if (val.length > 1) {
            Serum = [val[1]]
          } else if (val.length === 1) {
            Serum = [val[0]]
          } else {
            Serum = []
          }
          let value = Serum.length ? Serum[0] : ''
          let ruleForm = Object.assign({}, this.state.ruleForm, { Serum: value })
          this.setState({
            ruleForm: ruleForm,
            Serum
          })
        }
        break;

      default:
        break;
    }
  }

  onToastClose = () => {
    this.setState({
      errorToast: false,
      errorMsg: ''
    })
  }

  refEcharts = (node) => this.myEcharts = node

  render() {
    return (
      <View>
        <AtToast
          isOpened={this.state.errorToast}
          text={this.state.errorMsg}
          hasMask
          onClose={this.onToastClose}
        ></AtToast>
          <View className='panel'>
            <View className='panel__title'>1.Current COVID-19 phase of your location</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.oneoption}
                    selectedList={this.state.region}
                    onChange={(val) => this.onChange(val, 'region')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>2.C-reactive protein</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.ReactionOption}
                    selectedList={this.state.Reaction}
                    onChange={(val) => this.onChange(val, 'Reaction')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>3.Age</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.Ageoption}
                    selectedList={this.state.Age}
                    onChange={(val) => this.onChange(val, 'Age')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>4.Respiratory rate(bpm)</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.Heartoption}
                    selectedList={this.state.Heart}
                    onChange={(val) => this.onChange(val, 'Heart')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>5.Serum Urea Nitrogen</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.SerumUreaNitrogen}
                    selectedList={this.state.SerumUreaNi}
                    onChange={(val) => this.onChange(val, 'SerumUreaNi')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>6.Absolute Neutrophil Count</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.Absoluteoption}
                    selectedList={this.state.Absolute}
                    onChange={(val) => this.onChange(val, 'Absolute')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>7.Oxygen saturation(Finger)</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.SaO2option}
                    selectedList={this.state.SaO2}
                    onChange={(val) => this.onChange(val, 'SaO2')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>8.Serum procalcitonin</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.Serumoption}
                    selectedList={this.state.Serum}
                    onChange={(val) => this.onChange(val, 'Serum')}
                  />
                </View>
              </View>
            </View>
          </View>
        <View className='button-container'>
          <AtButton type='primary' size='normal' onClick={this.onSubmit}>submit</AtButton>
          <View style='width: 60px'></View>
          <AtButton type='secondary' size='normal' onClick={this.onReset} >reSet</AtButton>
        </View>
        <View className='result-container'>
          <View className='result-content'>
            <View className='result-label'>score:</View> <View className='result-value'>{this.state.DataNumber}</View>
          </View>
          <View className='result-content' style='margin-top: 12px'>
            <View className='result-label'>risk:</View> <View className='result-value'>{this.state.riskNumber}</View>
          </View>
          <View className='result-content'>
            <View className='result-info'>Note: ULN, upper limit of normal range</View>
          </View>
        </View>
      </View>
    )
        // <View>
        //   <View>OURMAPCN Scores</View>
        //   <View className="line-chart">
        //     <LineChart ref={this.refEcharts} />
        //   </View>
        // </View>
  }
}
