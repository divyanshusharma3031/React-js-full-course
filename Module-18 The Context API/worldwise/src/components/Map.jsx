import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvent } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const [mapPosition, setmapPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();
  const [lat,lng]=useUrlPosition();
  useEffect(()=>{
    if(lat)
      setmapPosition([lat,lng]);
  },[lat,lng]);
  const {isLoading:isLoadingPosition,position:geoLocationPosition,getPosition}=useGeolocation();
  useEffect(()=>{
    if(geoLocationPosition)
    {
      setmapPosition([geoLocationPosition.lat,geoLocationPosition.lng])
    }
  },[geoLocationPosition]);
  return (
    <div
      className={styles.mapContainer}
    >
      <Button type="position" onClick={getPosition}>
          {isLoadingPosition && "Loading"}
          {!isLoadingPosition && "use Your Position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (<Marker position={[city.position.lat,city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.name}</span>
            </Popup>
          </Marker>)
        })}
        <DetectClick/>
        <ChangeView position={mapPosition}/>
      </MapContainer>
    </div>
  );
}

function ChangeView({position})
{
  const map=useMap();
  map.setView(position);
  return null;
}

function DetectClick()
{
  const navigate = useNavigate();
  useMapEvent({
    click:(e)=>{
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  })
}

export default Map;
