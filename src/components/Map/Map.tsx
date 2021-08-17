import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

type Coordinates = {
    lat: number,
    lng: number
}

const Map: React.FC = () => {
    const classes = useStyles()
    const isMobile = useMediaQuery('(min-width: 600px)')

    const coordinates: Coordinates = {
        lat: 0,
        lng: 0
    }

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBn6xZakRQeNMDhC3N_T9SjezHhCWGHIQY' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
            >

            </GoogleMapReact>
        </div>
    )
}

export default Map