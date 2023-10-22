import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import {useMapEvents} from "react-leaflet";

import { City, Spot } from "@/types/types";

import churchIcon from '@/assets/icon/church.svg'
import treeIcon from '@/assets/icon/tree.svg'
import foodIcon from '@/assets/icon/food.svg'

interface ICON {
  church : L.Icon, 
  tree : L.Icon, 
  food : L.Icon,
  city : L.Icon
}

const icon : ICON = {
  "church" : new L.Icon({
    iconUrl: churchIcon,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
  }),
  "tree" : new L.Icon({
    iconUrl: treeIcon,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
  }),
  "food" : new L.Icon({
    iconUrl: foodIcon,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
  }),
  "city" : new L.Icon({
    iconUrl: foodIcon,
    iconSize: new L.Point(80, 80),
    className: 'leaflet-div-icon'
  })
}

interface ZoomProviderI {
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>
}

function ZoomProvider(props: ZoomProviderI) {
  const mapEvents = useMapEvents({
    zoomend: () => {
        props.setZoomLevel(mapEvents.getZoom());
    },
  });
  return null;
}

interface MapI {
  cities : City[],
  spots: Spot[]
}

export default function Map(props : MapI) {
  const [zoomLevel, setZoomLevel] = useState(18);

  useEffect(() => {
    console.log(zoomLevel);
  }, [zoomLevel])

  return (
    <MapContainer 
      center={[-21.138599142642562, -44.26019280483018]}
      zoom={18}
    >
      <ZoomProvider setZoomLevel={setZoomLevel}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        zoomLevel < 13 ?
        props.cities.map(city => (
          <Marker 
            key={city.id}
            position={[-21.138599142642562, -44.26019280483018]}
            icon = {icon["city"]}>
          <Popup>{city.name}</Popup>
          </Marker>
        )) : 
        props.spots.map(spot => (
          <Marker 
            key={spot.id}
            position={[-21.138599142642562, -44.26019280483018]}
            icon = {icon[spot.type as keyof ICON]}>
          <Popup>{spot.name}</Popup>
          </Marker>
        ))
      }
      
    </MapContainer>
      
  );
}