import { APP_UPDATE, SEARCH_UPDATE } from '../actions/types'
import { findStations as find } from '../clients/metro-service-client'

const updatePage = (page) => {
    return {
        type: APP_UPDATE,
        payload: { page }
    }
}
 
const findStations = () => {
    return dispatch => {
        return find()
            .then(allStations => {
                dispatch({ type: SEARCH_UPDATE, payload: { allStations } })
            })
            .catch(e => {
                dispatch({ type: SEARCH_UPDATE, payload: { allStations: [] } })
            })
    }
}

export default { updatePage, findStations }