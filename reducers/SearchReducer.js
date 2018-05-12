import { SEARCH_UPDATE } from '../actions/types'
import { assign } from 'lodash'

const INITIAL_STATE = {
    origin: "",
    destination: "",
    loading: false,
    stationsQuery: "",
    allStations: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_UPDATE:
            return assign({}, state, action.payload)
        default:
            return state
    }
}