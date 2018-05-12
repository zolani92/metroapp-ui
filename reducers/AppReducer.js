import { APP_UPDATE } from '../actions/types'
import { assign } from 'lodash'

const INITIAL_STATE = {
    page: 'search'
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_UPDATE:
            return assign({}, state, action.payload)
        default:
            return state
    }
}