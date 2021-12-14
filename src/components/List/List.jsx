import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Place from '../Place/Place'
import useStyles from './styles';

const List = ({  type, setType, rating, setRating, childClicked, places, loading }) => {
    const classes = useStyles()
    const [elRefs, setElRefs] = useState([])

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()))
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
                        {places?.map((place, i) => (
                            <Grid ref={elRefs[i]} item key={i} xs={12} >
                                <Place
                                    place={place}
                                    selected={Number(childClicked) === i}
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