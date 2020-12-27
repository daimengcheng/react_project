import { SAVE_USER_INFO,DELETE_USER_INFO } from "../action_types";

let user = JSON.parse(localStorage.getItem('user'))
let id = localStorage.getItem('id')

let initState = {
  user: user,
  id:id || '',
  isLogin:user && id ? true:false
}

export default function test(preState=initState,action){
  const {type,data} = action
  let newState
  switch (type){
    case SAVE_USER_INFO:
      newState = {user:data,id:data._id,isLogin:true}
      return newState
    case DELETE_USER_INFO:
      newState = {user:'',id:'',isLogin:false}
      return newState
    default:
      return preState
  }
}