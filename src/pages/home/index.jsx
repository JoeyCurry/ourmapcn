import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import './index.scss'

export default class Home extends Component {

  render() {
    return (
      <View className='container'>
        <View className='main-title'>What is OURMAPCN</View>
        <View className='label'>The pandemic of COVID-19 have rapidly spread worldwide. The surge of COVID19 patients at this unprecedented scale quickly depleted the limited medical resources. Therefore, a specific, sensitive and clinically applicable risk assessment tool to identify COVID19 patients with high risk of severe complications and death will assist frontline clinicians to optimize medical treatment with limited resources.</View>
        <View className='label' style='margin-top: 12px'>OURMAPCN is a composite score developed by Wuhan University, Institute of Model Animal to project the risk of death for COVID-19 patients, where O for Oxygen saturation, U for blood Urea nitrogen, R for Respiratory rate, M for before the Max date of daily new case, A for Age, P for Procalcitonin, C for C-reactive protein, and N for absolute Neutrophil counts.</View>
        <View className='main-title' style='margin-top: 24px'>Computing OURMAPCN</View>
        <View className='label'>The tab "Compute OURMAPCN" computes the OURMAPCN score that defined by the level of the eight factors.</View>
    </View>)
  }
}
