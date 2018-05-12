import { RESULT_UPDATE, APP_UPDATE, SEARCH_UPDATE } from './types'
import { findShortestPath as find } from '../clients/metro-service-client'

const updateResult = (result) => {
    return {
        type: RESULT_UPDATE,
        payload: result
    }
}

const findShortestPath = (origin, destination) => {
    return dispatch => {
        dispatch({ type: SEARCH_UPDATE, payload: { loading: true } })
        return find(origin, destination)
            .then(shortestPath => {
                dispatch({ type: RESULT_UPDATE, payload: { shortestPath } })
                dispatch({ type: APP_UPDATE, payload: { page: 'result' } })
                dispatch({ type: SEARCH_UPDATE, payload: { loading: false } })
            })
            .catch(e => {
                dispatch({ type: RESULT_UPDATE, payload: { shortestPath: {} } })
                dispatch({ type: SEARCH_UPDATE, payload: { loading: false } })
            })
    }
}

export default { updateResult, findShortestPath }