// 最核心的管理者
// 从redux中引入createStore，用于创建最核心的store
import { createStore,applyMiddleware } from "redux";
// 引入reducer
import reducer from "./reducers/index.js";
// 引入redux-thunk
import thunk from "redux-thunk";
// 引入redux-devtools-extension，用于支持redux开发者工具调试
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))