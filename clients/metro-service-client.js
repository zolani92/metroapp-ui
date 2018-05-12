import { get, post } from "axios";

const findStations = async () => {
    const url = 'https://guarded-reaches-74636.herokuapp.com/metro/stations'
    let response = await get(url)
    if (response.status !== 200) {
        throw Error('Error during stations retrieval')
    }
    return response.data
}

const findShortestPath = async (departureStationName, arrivalStationName) => {
    const url = 'https://guarded-reaches-74636.herokuapp.com/metro/shortestpath'
    const payload = { departureStationName, arrivalStationName }
    let response = await post(url, payload)
    if (response.status !== 200) {
        throw Error('Error during shortest path calculation')
    }
    return response.data
}

export {
    findStations, 
    findShortestPath 
}