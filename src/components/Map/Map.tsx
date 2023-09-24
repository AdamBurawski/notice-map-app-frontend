import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fix-map-icon";
import { SearchContext } from "../../context/search.context";
import styled from "styled-components";

const SearchFor = styled.h2`
  position: relative;
  bottom: -80px;
  z-index: 1000000;
  color: white;
  padding: 5px 5px 40px;
`;

export const Map = () => {
  const { search } = useContext(SearchContext);

  useEffect(() => {
    console.log("Make reqest to search for", search);
  }, [search]);

  return (
    <div className="map">
      <SearchFor>Search for: {search}</SearchFor>
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
