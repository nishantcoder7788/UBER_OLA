import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 40.7128, lng: -74.0060 };

export default function Map({ marker, role }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" 
  });

  return isLoaded ? (
    <GoogleMap 
      mapContainerStyle={containerStyle} 
      center={marker || center} 
      zoom={14} 
      options={{ disableDefaultUI: true, styles: mapStyles }}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <div className="h-full bg-gray-200 animate-pulse flex items-center justify-center">
      <span className="text-gray-400 font-medium">Loading Map...</span>
    </div>
  );
}

const mapStyles = [
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] }
];