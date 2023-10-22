import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';

import churchIcon from '@/assets/icon/church.svg'
import treeIcon from '@/assets/icon/tree.svg'
import foodIcon from '@/assets/icon/food.svg'

const icon = {
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
  })
}

export default function Map() {

  return (
    <MapContainer 
      center={[-21.138599142642562, -44.26019280483018]}
      zoom={18}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[-21.138599142642562, -44.26019280483018]}
        icon = {icon["food"]}
      >
        <Popup>
          Nome do lugar
        </Popup>
      </Marker>
    </MapContainer>
      
  );
}