import React, { Component } from "react"
import { Form, Icon, Input, message, Button } from "antd"
import { connect } from "react-redux"
import { reqLogin } from "../../API/index"
import logo from "./imgs/logo.png"
import "./css/login.less"
import { createSaveUserInfoAction } from "../../redux/action_creators/login_action"

class Login extends Component {
  // 点击登录按钮后 的回调
  handleSubmit = (event) => {
    event.preventDefault() //阻止默认行为
    this.props.form.validateFields(async (err, values) => {
      // values的值是：{username：xxxx,password:xxxxx}
      const { username, password } = values
      if (!err) {
        // alert("向服务器发送登录请求")
        // reqLogin(username, password)
        //   .then((result) => {
        //     console.log(result.data.data)
        //   })
        //   .catch((reason) => {
        //     console.log("失败了", reason)
        //   })
        let result = await reqLogin(username, password)
        const { status, msg, data } = result
        // console.log(data)
        if (status === 0) {
          // 1.服务器返回的user信息，交由redux管理
          this.props.saveUserInfo(data)

          // 2.请求成功，跳转到admin页面
          // console.log(data)
          // console.log("跳转页面")
          this.props.history.replace("/admin")
        } else {
          message.warning(msg, 1.5)
        }
      } else {
        message.err("输入的账号或密码错误")
      }
    })
  }

  // 设置自定义密码验证
  pwdvalidator = (rule, value, callback) => {
    if (!value.length) {
      callback("密码必须被输入")
    } else if (value.length < 4) {
      callback("密码长度必须大于等于4位")
    } else if (value.length > 16) {
      callback("密码长度必须小于等于16位")
    } else if (!/^[a-z0-9]+$/i.test(value)) {
      callback("密码必须由字母和数字组成")
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                /**
                 * 用户名、密码的合法性要求
                 * 1、必须输入
                 * 2、长度必须大于等于4位
                 * 3、长度必须小于等于12位
                 * 4、必须有字母，数字，下划线组成
                 */
                rules: [
                  { required: true, message: "用户名必须输入!" },
                  { min: 4, message: "用户名必须不小于4位!" },
                  { max: 12, message: "用户名必须不大于12位!" },
                  {
                    pattern: /^\w+$/,
                    message: "用户名必须有字母，数字，或者下划线组成!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.pwdvalidator }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default connect((state) => ({}), {
  saveUserInfo: createSaveUserInfoAction,
})(Form.create()(Login))
