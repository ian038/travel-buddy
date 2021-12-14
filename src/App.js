import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api';

const initialBounds = {
  ne: { lat: 0, lng: 0 },
  sw: { lat: 0, lng: 0 }
}

const App = () => {
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [places, setPlaces] = useState([])
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(initialBounds)
  const [childClicked, setChildClicked] = useState(0)
  const [loading, setLoading] = useState(false)

  const [weatherData, setWeatherData] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [autocomplete, setAutocomplete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    getPlacesData(bounds.sw, bounds.ne).then(data => {
      setPlaces(data)
      setLoading(false)
    })
  }, [bounds])

  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()

    setCoords({ lat, lng })
  }

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setCoordinates={setCoords}
            setBounds={setBounds}
            coordinates={coords}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
