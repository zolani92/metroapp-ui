import { SEARCH_UPDATE } from './types'

const updateSearch = (searchCriteria) => {
    return {
        type: SEARCH_UPDATE,
        payload: searchCriteria
    }
}

export default { updateSearch }