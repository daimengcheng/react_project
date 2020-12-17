import React,{Component} from 'react'
import {Button,message} from 'antd'
import { Switch,Route } from "react-router-dom"
import Admin from './pages/admin/admin'
import Login from './pages/login/login'

export default class App extends Component{

  render(){
    return (
      <div className='app'>
        <Switch>
          <Route path="/admin" component={Admin}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    )
  }
}