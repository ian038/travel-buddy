import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Place from '../Place/Place'
import useStyles from './styles';

type PlacesProps = {
    childClicked: number
    places: any
    loading: boolean
}

const List: React.FC<PlacesProps> = ({ childClicked, places, loading }) => {
    const classes = useStyles()
    const [type, setType] = useState<string | unknown>('attractions')
    const [rating, setRating] = useState<number | unknown>(0)
    const [elRefs, setElRefs] = useState<any>([])

    useEffect(() => {
        const refs: any = Array(places?.length).fill(undefined).map((_, i) => elRefs[i] || createRef())
        console.log(refs)
        setElRefs(refs)
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Attractions, Hotels and Restaurants around you</Typography>
            {loading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem' />
                </div>
            ) : (
                <>
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
                        {places?.map((place: any, i: React.Key) => (
                            <Grid item key={i} xs={12} >
                                <Place
                                    place={place}
                                    selected={childClicked === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}

export default List