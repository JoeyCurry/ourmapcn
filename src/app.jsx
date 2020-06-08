import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/home'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/home/index',
      'pages/compute/index',
      'pages/fullModel/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'OURMAPCN',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#6e9eea",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/home/index",
        text: "home",
        iconPath: "assets/svg/home.png",
        selectedIconPath: "assets/svg/home_selected.png"
      },
      {
        pagePath: "pages/compute/index",
        text: "compute",
        iconPath: "assets/svg/compute.png",
        selectedIconPath: "assets/svg/compute_selected.png"
      },
      {
        pagePath: "pages/fullModel/index",
        text: "fullModel",
        iconPath: "assets/svg/model.png",
        selectedIconPath: "assets/svg/model_selected.png"
      },
    ]}
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
