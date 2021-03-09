import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import logo from "../images/logo2.svg";
import mapMarker from "../images/Map_marker.svg";
import beeMarker from "../images/colmeia.svg";

import api from "../services/api";

import "../styles/pages/totem-map.css";

const mapIcon = L.icon({
  iconUrl: mapMarker,
  iconSize: [78, 88],
  iconAnchor: [39, 88],
  popupAnchor: [170, -6],
});

const beeIcon = L.icon({
  iconUrl: beeMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, -6],
});

interface Totem {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

function TotemMap() {
  const [totems, setTotems] = useState<Totem[]>([]);

  useEffect(() => {
    api.get("totems").then((response) => {
      setTotems(response.data);
    });
  }, []);

  const { goBack } = useHistory();

  return (
    <div id="page-map">
      <nav>
        <img src={logo} alt="Instituto Abelha Nativa" />
        <h2>Instituto Abelha Nativa</h2>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#000" />
        </button>
      </nav>

      <Map
        center={[-15.804664, -47.923214]}
        zoom={21}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
        {/* url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}

        <Marker icon={mapIcon} position={[-15.804664, -47.923214]}>
          <Popup
            colseButton={false}
            minWidth={240}
            masWidth={240}
            className="map-popup"
          >
            Instituto Abelha Nativa
          </Popup>
        </Marker>

        {totems.map((totem) => {
          return (
            <Marker
              icon={beeIcon}
              position={[totem.latitude, totem.longitude]}
              key={totem.id}
            >
              <Popup
                colseButton={false}
                minWidth={240}
                masWidth={240}
                className="map-popup"
              >
                {totem.name}
              </Popup>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}

export default TotemMap;
