import React, { Component } from "react"
import { connect } from "react-redux"
import { createDome1Action } from "../../redux/action_creators/test_action"

class Admin extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return <div>admin</div>
  }
}

// 如下代码中所有的key是控制容器组件传递给UI组件的key
// 如下代码中所有的value是控制容器组件传递给UI组件的value

export default connect((state) => ({ peiqi: state.test }), {
  dome1: createDome1Action,
})(Admin)
