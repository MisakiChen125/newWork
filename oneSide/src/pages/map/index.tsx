import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Map,Button } from '@tarojs/components'

import './index.scss'
type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '一面而就'
  }

  state={
    location: {
      longitude: 0,
      latitude: 0
    }
  }
  componentDidShow () {
    Taro.getLocation({
      type: 'wgs84',
      success: (res)=>{
        this.setState({
          location: res
        })
      }
    })
  }
  componentWillUnmount () { }
  componentDidMount(){
    console.log('小程序微信生命周期')
  }

  componentDidHide () { }

  render () {
    let {latitude,longitude} =this.state.location
    return (
      <View className='map-page'>
        <Map longitude={longitude} latitude={latitude} show-location/>
        <Button>添加面试</Button>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
