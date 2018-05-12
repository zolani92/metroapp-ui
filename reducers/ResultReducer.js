import { RESULT_UPDATE } from '../actions/types'
import { assign } from 'lodash'

const INITIAL_STATE = {
    shortestPath: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESULT_UPDATE:
            return assign({}, state, action.payload)
        default:
            return state
    }
}