import Taro, { Component } from '@tarojs/taro'
import {
  AtForm,
  AtButton,
  AtToast,
  AtInput,
  AtCheckbox
} from 'taro-ui'
import { View } from '@tarojs/components'
import './index.scss'

export default class FullModel extends Component {

  state = {
    predictionform: {
      Age: '',
      Respiratory: '',
      HeartRate: '',
      resource: '',
      Neutrophil: '',
      Platelet: '',
      PlateletDecrease: '',
      Procalcitonin: '',
      CRPmg: '',
      CRPincrease: '',
      LDLc: '',
      BUNmg: '',
      BUNincrease: '',
      dimerIncrease: '',
      LymphocyteCount: '',
      LymphocyteDecrease: '',
      NeutrophilCountIncrease: '',
      Ag: '',
      SpO2: '',
      admissionAfter: ''
    },
    resource: [],
    NeutrophilCountIncrease: [],
    PlateletDecrease: [],
    CRPincrease: [],
    admissionAfter: [],
    BUNincrease: [],
    dimerIncrease: [],
    LymphocyteDecrease: [],
    errorMsg: '',
    errorToast: false,
    risk: '', //分数
    checkboxOption: [
      { value: 1, label: 'Yes' },
      { value: 0, label: 'No' },
    ],
  }

  onSubmit = () => {
    let valid = this.validate()
    console.log(valid)
    if (!valid) {
      // 通过验证
      let risk = ''
      let data = this.state.predictionform
      let G = 0
      G =
        data.Age * 0.055186245 +
        data.Respiratory * 0.089486759 +
        data.HeartRate * 0.009657628 +
        data.resource * 0.698292657 +
        data.Neutrophil * 0.109682505 +
        data.NeutrophilCountIncrease * 0.448868176 +
        data.Platelet * -0.002882047 +
        data.PlateletDecrease * 0.571359304 +
        data.Procalcitonin * 0.13573856 +
        data.CRPmg * 0.008832311 +
        data.CRPincrease * 1.717859106 +
        data.LDLc * -0.450696394 +
        data.BUNmg * 0.041689049 +
        data.BUNincrease * 0.66363656 +
        data.dimerIncrease * 0.468010721 +
        data.LymphocyteCount * -0.349485674 +
        data.LymphocyteDecrease * -0.479356627 +
        data.Ag * -0.646192103 +
        data.SpO2 * -0.093958631 +
        data.admissionAfter * -1.039237074 +
        0.808049996
      console.log(G)
      risk = Math.ceil((Math.exp(G) / (1 + Math.exp(G))) * 100) + '%'
      this.setState({
        risk
      })
    } else {
      this.setState({
        errorMsg: `${valid.msg} is Empty`,
        errorToast: true
      })
    }
  }

  validate() {
    let predictionform = this.state.predictionform
    let valid = null
    for (const ele in predictionform) {
      let value = predictionform[ele]
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
      predictionform: {
        Age: '',
        Respiratory: '',
        HeartRate: '',
        resource: '',
        Neutrophil: '',
        Platelet: '',
        PlateletDecrease: '',
        Procalcitonin: '',
        CRPmg: '',
        CRPincrease: '',
        LDLc: '',
        BUNmg: '',
        BUNincrease: '',
        dimerIncrease: '',
        LymphocyteCount: '',
        LymphocyteDecrease: '',
        NeutrophilCountIncrease: '',
        Ag: '',
        SpO2: '',
        admissionAfter: ''
      },
      resource: [],
      NeutrophilCountIncrease: [],
      PlateletDecrease: [],
      CRPincrease: [],
      admissionAfter: [],
      BUNincrease: [],
      dimerIncrease: [],
      LymphocyteDecrease: [],
      risk: '', //分数
      errorMsg: '',
      errorToast: false,
    })
  }

  onChange = (val, type) => {
    console.log(val, type)
    switch (type) {
      case 'Age':
        {
          let Age = val
          let predictionform = Object.assign({}, this.state.predictionform, { Age })
          this.setState({
            predictionform
          })
        }
        break;
      case 'Respiratory':
        {
          let Respiratory = val
          let predictionform = Object.assign({}, this.state.predictionform, { Respiratory })
          this.setState({
            predictionform
          })
        }
        break;
      case 'HeartRate':
        {
          let HeartRate = val
          let predictionform = Object.assign({}, this.state.predictionform, { HeartRate })
          this.setState({
            predictionform
          })
        }
        break;

      case 'Neutrophil':
        {
          let Neutrophil = val
          let predictionform = Object.assign({}, this.state.predictionform, { Neutrophil })
          this.setState({
            predictionform
          })
        }
        break;
      case 'Platelet':
        {
          let Platelet = val
          let predictionform = Object.assign({}, this.state.predictionform, { Platelet })
          this.setState({
            predictionform
          })
        }
        break;

      case 'Procalcitonin':
        {
          let Procalcitonin = val
          let predictionform = Object.assign({}, this.state.predictionform, { Procalcitonin })
          this.setState({
            predictionform
          })
        }
        break;
      case 'CRPmg':
        {
          let CRPmg = val
          let predictionform = Object.assign({}, this.state.predictionform, { CRPmg })
          this.setState({
            predictionform
          })
        }
        break;

      case 'LDLc':
        {
          let LDLc = val
          let predictionform = Object.assign({}, this.state.predictionform, { LDLc })
          this.setState({
            predictionform
          })
        }
        break;
      case 'BUNmg':
        {
          let BUNmg = val
          let predictionform = Object.assign({}, this.state.predictionform, { BUNmg })
          this.setState({
            predictionform
          })
        }
        break;

      case 'LymphocyteCount':
        {
          let LymphocyteCount = val
          let predictionform = Object.assign({}, this.state.predictionform, { LymphocyteCount })
          this.setState({
            predictionform
          })
        }
        break;

      case 'resource':
        {
          let resource = []
          if (val.length > 1) {
            resource = [val[1]]
          } else if (val.length === 1) {
            resource = [val[0]]
          } else {
            resource = []
          }
          let value = resource.length ? resource[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { resource: value })
          this.setState({
            predictionform,
            resource
          })
        }
        break;
      case 'NeutrophilCountIncrease':
        {
          let NeutrophilCountIncrease = []
          if (val.length > 1) {
            NeutrophilCountIncrease = [val[1]]
          } else if (val.length === 1) {
            NeutrophilCountIncrease = [val[0]]
          } else {
            NeutrophilCountIncrease = []
          }
          let value = NeutrophilCountIncrease.length ? NeutrophilCountIncrease[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { NeutrophilCountIncrease: value })
          this.setState({
            predictionform,
            NeutrophilCountIncrease
          })
        }
        break;
      case 'PlateletDecrease':
        {
          let PlateletDecrease = []
          if (val.length > 1) {
            PlateletDecrease = [val[1]]
          } else if (val.length === 1) {
            PlateletDecrease = [val[0]]
          } else {
            PlateletDecrease = []
          }
          let value = PlateletDecrease.length ? PlateletDecrease[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { PlateletDecrease: value })
          this.setState({
            predictionform,
            PlateletDecrease
          })
        }
        break;
      case 'CRPincrease':
        {
          let CRPincrease = []
          if (val.length > 1) {
            CRPincrease = [val[1]]
          } else if (val.length === 1) {
            CRPincrease = [val[0]]
          } else {
            CRPincrease = []
          }
          let value = CRPincrease.length ? CRPincrease[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { CRPincrease: value })
          this.setState({
            predictionform,
            CRPincrease
          })
        }
        break;
      case 'admissionAfter':
        {
          let admissionAfter = []
          if (val.length > 1) {
            admissionAfter = [val[1]]
          } else if (val.length === 1) {
            admissionAfter = [val[0]]
          } else {
            admissionAfter = []
          }
          let value = admissionAfter.length ? admissionAfter[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { admissionAfter: value })
          this.setState({
            predictionform,
            admissionAfter
          })
        }
        break;
      case 'BUNincrease':
        {
          let BUNincrease = []
          if (val.length > 1) {
            BUNincrease = [val[1]]
          } else if (val.length === 1) {
            BUNincrease = [val[0]]
          } else {
            BUNincrease = []
          }
          let value = BUNincrease.length ? BUNincrease[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { BUNincrease: value })
          this.setState({
            predictionform,
            BUNincrease
          })
        }
        break;
      case 'dimerIncrease':
        {
          let dimerIncrease = []
          if (val.length > 1) {
            dimerIncrease = [val[1]]
          } else if (val.length === 1) {
            dimerIncrease = [val[0]]
          } else {
            dimerIncrease = []
          }
          let value = dimerIncrease.length ? dimerIncrease[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { dimerIncrease: value })
          this.setState({
            predictionform,
            dimerIncrease
          })
        }
        break;
      case 'LymphocyteDecrease':
        {
          let LymphocyteDecrease = []
          if (val.length > 1) {
            LymphocyteDecrease = [val[1]]
          } else if (val.length === 1) {
            LymphocyteDecrease = [val[0]]
          } else {
            LymphocyteDecrease = []
          }
          let value = LymphocyteDecrease.length ? LymphocyteDecrease[0] : ''
          let predictionform = Object.assign({}, this.state.predictionform, { LymphocyteDecrease: value })
          this.setState({
            predictionform,
            LymphocyteDecrease
          })
        }
        break;
      case 'Ag':
        {
          let Ag = val
          let predictionform = Object.assign({}, this.state.predictionform, { Ag })
          this.setState({
            predictionform
          })
        }
        break;
      case 'SpO2':
        {
          let SpO2 = val
          let predictionform = Object.assign({}, this.state.predictionform, { SpO2 })
          this.setState({
            predictionform
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

  render() {
    return (
      <View>
        <AtToast
          isOpened={this.state.errorToast}
          text={this.state.errorMsg}
          hasMask
          onClose={this.onToastClose}
        ></AtToast>
        <AtForm>
          <AtInput
            name='Age(y)'
            title='1.Age(y)'
            type='number'
            placeholder='Please input Number...'
            value={this.state.predictionform.Age}
            onChange={(val) => this.onChange(val, 'Age')}
          />
          <AtInput
            name='Heart rate(bpm)'
            title='2.Heart rate(bpm)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.HeartRate}
            onChange={(val) => this.onChange(val, 'HeartRate')}
          />
          <AtInput
            name='Neutrophil count(10e9/L)'
            title='3.Neutrophil count(10e9/L)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.Neutrophil}
            onChange={(val) => this.onChange(val, 'Neutrophil')}
          />
          <AtInput
            name='Platelet (10e9/L)'
            title='4.Platelet(10e9/L)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.Platelet}
            onChange={(val) => this.onChange(val, 'Platelet')}
          />
          <AtInput
            name='Procalcitonin(ug/L)'
            title='5.Procalcitonin(ug/L)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.Procalcitonin}
            onChange={(val) => this.onChange(val, 'Procalcitonin')}
          />
          <AtInput
            name='CRP(mg/L)'
            title='6.CRP(mg/L)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.CRPmg}
            onChange={(val) => this.onChange(val, 'CRPmg')}
          />
          <AtInput
            name='LDL-c(mg/dL)'
            title='7.LDL-c(mg/dL)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.LDLc}
            onChange={(val) => this.onChange(val, 'LDLc')}
          />
          <AtInput
            name='BUN(mg/dL)'
            title='8.BUN(mg/dL)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.BUNmg}
            onChange={(val) => this.onChange(val, 'BUNmg')}
          />
          <AtInput
            name='SpO2%'
            title='9.SpO2%'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.SpO2}
            onChange={(val) => this.onChange(val, 'SpO2')}
          />
          <AtInput
            name='Lymphocyte count(10e9/L)'
            title='10.Lymphocyte count(10e9/L)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.LymphocyteCount}
            onChange={(val) => this.onChange(val, 'LymphocyteCount')}
          />
          <AtInput
            name='A/G'
            title='11.A/G'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.Ag}
            onChange={(val) => this.onChange(val, 'Ag')}
          />
          <AtInput
            name='Respiratory rate(bpm)'
            title='12.Respiratory rate(bpm)'
            type='digit'
            placeholder='Please input Number...'
            value={this.state.predictionform.Respiratory}
            onChange={(val) => this.onChange(val, 'Respiratory')}
          />
        </AtForm>
        <View className='panel'>
          <View className='panel__title'>12.Cerebrovascular disease(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.resource}
                  onChange={(val) => this.onChange(val, 'resource')}
                />
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>13.Neutrophil count% increase(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.NeutrophilCountIncrease}
                  onChange={(val) => this.onChange(val, 'NeutrophilCountIncrease')}
                />
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>14.Platelet decrease(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.PlateletDecrease}
                  onChange={(val) => this.onChange(val, 'PlateletDecrease')}
                />
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>15.CRP increase(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.CRPincrease}
                  onChange={(val) => this.onChange(val, 'CRPincrease')}
                />
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>16.Admission before peak day(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.admissionAfter}
                  onChange={(val) => this.onChange(val, 'admissionAfter')}
                />
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>17.BUN increase(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.BUNincrease}
                  onChange={(val) => this.onChange(val, 'BUNincrease')}
                />
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>18.D-dimer increase(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.dimerIncrease}
                  onChange={(val) => this.onChange(val, 'dimerIncrease')}
                />
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>19.Lymphocyte% decrease(y/n)</View>
          <View className='panel__content no-padding'>
            <View className='example-item'>
              <View className='checkbox-container'>
                <AtCheckbox
                  options={this.state.checkboxOption}
                  selectedList={this.state.LymphocyteDecrease}
                  onChange={(val) => this.onChange(val, 'LymphocyteDecrease')}
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
            <View className='result-label'>risk:</View> <View className='result-value'>{this.state.risk}</View>
          </View>
        </View>
      </View>
    )
  }
}
