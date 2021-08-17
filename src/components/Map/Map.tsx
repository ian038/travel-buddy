import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

export type Coordinates = {
    lat: number,
    lng: number
}

export type Bounds = {
    ne: Coordinates,
    sw: Coordinates
}

type MapProps = {
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
    setBounds: React.Dispatch<React.SetStateAction<Bounds | any>>
    coordinates: Coordinates
}

const Map: React.FC<MapProps> = ({ setCoordinates, setBounds, coordinates }) => {
    const classes = useStyles()
    const isMobile = useMediaQuery('(min-width: 600px)')

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBn6xZakRQeNMDhC3N_T9SjezHhCWGHIQY' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                onChange={e => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
            >

            </GoogleMapReact>
        </div>
    )
}

export default Map