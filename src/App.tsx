import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api';
import { Coordinates, Bounds } from './components/Map/Map';

const initialBounds: Bounds = {
  ne: { lat: 0, lng: 0 },
  sw: { lat: 0, lng: 0 }
}

const App: React.FC = () => {
  const [places, setPlaces] = useState<any>([])
  const [coordinates, setCoordinates] = useState<Coordinates | any>({})
  const [bounds, setBounds] = useState<Bounds>(initialBounds)
  const [childClicked, setChildClicked] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    getPlacesData(bounds.sw, bounds.ne).then(data => {
      setPlaces(data)
      setLoading(false)
    })
  }, [coordinates, bounds])

  console.log(places)

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
