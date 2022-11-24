import { createStore } from "redux";
import combinedReducers from "./combineReducers";

export default createStore(combinedReducers);
