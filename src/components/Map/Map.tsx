import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fix-map-icon";

export const Map = () => {
  return (
    <div className="map">
      <MapContainer center={[50.2657152, 18.9945008]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https:/>/www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[50.2657152, 18.9945008]}>
          <Popup>
            <h2>ADream</h2>
            <p>agencja interaktywna</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
