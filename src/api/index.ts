import axios from 'axios'
import { Coordinates } from '../components/Map/Map';

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw: Coordinates, ne: Coordinates) => {
    try {
        const { data: { data } } = await axios.get(url, {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        })
        return data
    } catch (error) {
        console.log('Error:', error)
    }
}