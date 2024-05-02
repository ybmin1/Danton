import { combineReducers } from "redux";
import cartInfo from "./cartInfo";

//각각의 reducer를 합치는 rootReducer
const rootReducer = combineReducers({ cartInfo });

export default rootReducer;
