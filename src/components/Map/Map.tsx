import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        lat?: number | any;
        lng?: number | any
    }
}

export type Coordinates = {
    lat: number
    lng: number
}

export type Bounds = {
    ne: Coordinates
    sw: Coordinates
}

type MapProps = {
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
    setBounds: React.Dispatch<React.SetStateAction<Bounds | any>>
    coordinates: Coordinates
    places: any
}

const Map: React.FC<MapProps> = ({ setCoordinates, setBounds, coordinates, places }) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width: 600px)')

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string) }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                onChange={e => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
            >
                {places.length && places.map((place: any, i: React.Key) => (
                    <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
                        {!isDesktop ? (
                            <LocationOnOutlinedIcon color='primary' fontSize='large' />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant='subtitle2' gutterBottom>{place.name}</Typography>
                                <img className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                    alt={place.name}
                                />
                                <Rating size='small' value={Number(place.rating)} readOnly />
                            </Paper>
                        )}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map