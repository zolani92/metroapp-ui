import { combineReducers } from 'redux'
import AppReducer from './AppReducer'
import SearchReducer from './SearchReducer'
import ResultReducer from './ResultReducer'

export default combineReducers({
    app: AppReducer,
    search: SearchReducer,
    result: ResultReducer
})