import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px',
};

// const center = {
//     lat: 38.9072,
//     lng: 77.0369,
// };

const Maps = ({ apiKey, lat, lng }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
    };

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                ><MarkerF position={center} /> </GoogleMap>
            )}
        </>
    );
};

export default React.memo(Maps);
