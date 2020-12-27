import { Button,Icon,Modal } from "antd"
import React, { Component } from "react"
import screenfull from "screenfull";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'
import dayjs from "dayjs";
import './css/header.less'
import {createDeleteUserAction} from '../../../redux/action_creators/login_action'
import {reqWeather2} from '../../../API/index'


class Header extends Component {

  state = {
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    weather:'',
    temperature:'',
    wea_img:''
  }
  // 点击全屏
  fullScreen = ()=>{
    screenfull.toggle();
  }
  // 给screenfull绑定监听
  componentDidMount (){
    // state = this.state
    screenfull.on('change',()=>{
      let isFull = !this.state.isFull
      this.setState({isFull})
    })
    // 更新时间
    this.timeID = setInterval(()=>{
      this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    },1000)
    // 获取天气情况
    // reqWeather1()
    // .then((result)=>{
    //   this.setState({weather:result.lives[0].weather,temperature:result.lives[0].temperature})
    //   // console.log(result.lives[0].weather);
    // })
    // reqWeather2()
    // .then((result)=>{
    //   this.setState({weather:result.data.dayWeather,temperature:result.data.dayTemp,wea_img:result.data.dayIcon})
    // })
    // reqWeather2()
    // .then((result)=>{
    //   this.setState({weather:result.dayWeather,temperature:result.dayTemp,wea_img:result.dayIcon})
    // })
  }
  // 当组件销毁时 清除state
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 点击退出登录的回调
  logOut = ()=>{
    const { confirm } = Modal;
    let {deleteUser} = this.props
    confirm({
      title: '确定吗？',
      content: '如果退出你将需要重新登陆。',
      cancelText:"取消",
      okText:"确定",
      onOk() {
        deleteUser()
      },
    });
  }
  
  render() {
    let {user} = this.props.user
    return (
      <header className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen}>
            <Icon type={this.state.isFull? 'fullscreen-exit':'fullscreen'} />
          </Button>
          <span className="username">欢迎,{user.username}</span>
          <Button type="link" size="small" onClick = {this.logOut}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {this.props.location.pathname}
          </div>
          <div className="header-bottom-right">
            {this.state.date}
            <img src={this.state.wea_img} alt="天气信息"/>
            {this.state.weather} 温度:{this.state.temperature}
          </div>
        </div>
      </header>
    )
  }
}
// export default connect(state =>{({user:state.userInfo})})(Header)
export default connect((state) => ({user:state.userInfo}), {
  deleteUser: createDeleteUserAction,})(withRouter(Header))