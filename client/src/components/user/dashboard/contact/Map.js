import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

import mapStyle from './mapStyle.json'

import MarkerIcon from '../../common/img/marker.png'

import styles from './Contact.module.sass'

const defaultMapOptions = {
  styles: mapStyle,
  disableDefaultUI: true
}

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`,
    loadingElement: <div className={styles['map-loading-element']} />,
    containerElement: <div className={styles['map-container-element']} />,
    mapElement: <div className={styles['map-map-element']} />,
    isMarkerShown: true
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 48.19883, lng: 16.34991 }}
    defaultOptions={defaultMapOptions}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 48.19883, lng: 16.34991 }}
        icon={{
          url: MarkerIcon,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      />
    )}
  </GoogleMap>
))

export default Map
