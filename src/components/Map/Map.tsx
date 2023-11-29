import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../utils/fix-map-icon";
import { SearchContext } from "../../context/search.context";
import styled from "styled-components";
import { SimpleAdEntity } from "types";
import { SingleAd } from "./SingleAd";
import { apiUrl } from "../config/api";

const SearchFor = styled.h2`
  position: relative;
  bottom: -80px;
  z-index: 1000000;
  color: white;
  padding: 5px 5px 40px;
`;

export const Map = () => {
  const { search } = useContext(SearchContext);
  const [ads, setAds] = useState<SimpleAdEntity[]>([]);

  useEffect(() => {
    console.log("Make request to search for", search);
    (async () => {
      const res = await fetch(`${apiUrl}/ad/search/${search}`);
      const data = await res.json();

      setAds(data);
    })();
  }, [search]);

  return (
    <div className="map">
      <SearchFor>Search for: {search}</SearchFor>
      <MapContainer center={[50.2657152, 18.9945008]} zoom={20}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors"
        />

        {ads.map((ad) => (
          <Marker key={ad.id} position={[ad.lat, ad.lon]}>
            <Popup>
              <SingleAd id={ad.id} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
