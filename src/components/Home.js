import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import NavBar from './NavBar';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

function Home() {
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDk7tn9tpSTXL0dwRxX9KnVmK9-GzwANQE"
})

// eslint-disable-next-line
const [map, setMap] = React.useState(null)

const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
}, [])

const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
}, [])

return isLoaded ? (
    <><h1>
        Home
    </h1><>
    <><GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
    >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
    </GoogleMap>
        <div /></><NavBar />
        </></>
        

) : <></>
}

export default Home