import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Place from '../Place/Place'
import useStyles from './styles';

type PlacesProps = {
    places: any
}

const List: React.FC<PlacesProps> = ({ places }) => {
    console.log(places)
    const classes = useStyles()
    const [type, setType] = useState<string | unknown>('attractions')
    const [rating, setRating] = useState<number | unknown>(0)

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Attractions, Hotels and Restaurants around you</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select name='type' value={type} onChange={e => setType(e.target.value)}>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={e => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place: any, i: React.Key | null | undefined) => (
                    <Grid item key={i} xs={12} >
                        <Place place={place} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default List