import { combineReducers } from "redux";
import loginReducer from "./reducers/loginReducer";

export default combineReducers({ login: loginReducer });
