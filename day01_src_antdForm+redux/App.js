import React,{Component} from 'react'
import { Switch,Route } from "react-router-dom"
import Admin from './container/admin/admin'
import Login from './container/login/login'

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