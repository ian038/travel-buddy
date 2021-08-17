import axios from 'axios'
import { Coordinates } from '../components/Map/Map';

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw: any, ne: any) => {
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
                'x-rapidapi-key': 'e692c1b86amsh092043c793b8770p179e09jsn373f0e2a08a8',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        })
        return data
    } catch (error) {
        console.log('Error:', error)
    }
}