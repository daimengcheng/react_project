import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect,Route,Switch } from "react-router-dom"
import { Layout } from "antd"
import { reqGetCategory } from "../../API"
import {} from "../../redux/action_creators/login_action"

import Header from "./header/header.jsx"
import "./css/admin.less"
import Home from "../../components/home/home"
import Category from "../category/category"
import Product from "../products/products"
import User from "../user/user"
import Role from "../role/role"
import Bar from "../bar/bar"
import Line from "../line/line"
import Pie from "../pie/pie"

const { Footer, Sider, Content } = Layout
class Admin extends Component {
  componentDidMount() {
    // console.log(this.props)
  }

  // 获取商品列表
  getManageCategory = async (pageNum, pageSize) => {
    let result = await reqGetCategory(pageNum, pageSize)
    console.log(result)
  }
  render() {
    const {  isLogin } = this.props.userInfo
    if (!isLogin) {
      return <Redirect to="/login" />
    } else {
      return (
        <Layout className="admin">
          <Sider className="sider">Sider</Sider>
          <Layout>
            <Header />
            <Content className='content'>
              <Switch>
                <Route path= "/admin/home" component={Home}/>
                <Route path= "/admin/prod_about/category" component={Category}/>
                <Route path = "/admin/prod_about/product" component={Product}/>
                <Route path ="/admin/user" component={User}/>
                <Route path="/admin/role" component={Role}/>
                <Route path="/admin/chart/bar" component={Bar}/>
                <Route path="/admin/chart/line" component={Line}/>
                <Route path="/admin/chart/Pie" component={Pie}/>
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer">
              推荐使用谷歌浏览器，获取最佳用户体验
            </Footer>
          </Layout>
        </Layout>   
      )
    }
  }
}

// 如下代码中所有的key是控制容器组件传递给UI组件的key
// 如下代码中所有的value是控制容器组件传递给UI组件的value

export default connect(
  (state) => ({
    userInfo: state.userInfo,
  }),
)(Admin)
