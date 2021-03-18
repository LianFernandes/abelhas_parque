import React, { useEffect, useState } from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";
import { MapModal } from "../components/MapModal";

import { modalInfo } from '../modalinfo.js'
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

interface ModalInfo {
  name: string;
  sName: string;
  description: string;
}

interface Totem {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

interface TotemParams {
  coordinates: string;
}

function TotemMap() {
  const { coordinates } = useParams<TotemParams>();
  let lati = 0;
  let longi = 0;

  try {
    lati = Number(coordinates.split(", ")[0]);
    longi = Number(coordinates.split(" ")[1]);
  } catch (error) { }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totems, setTotems] = useState<Totem[]>([]);
  const { goBack } = useHistory();

  // const getData = () => {
  //   fetch("modalinfo.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //       console.log(myJson);
  //       setModalInfo(myJson)
  //     });
  // };

  function openModal(totemName: string) {
    console.log(modalInfo)
    const index = modalInfo.findIndex(o => o.name == totemName)
    console.log(index)
    setIsModalOpen(true);
  }

  useEffect(() => {
    api.get("totems").then((response) => {
      setTotems(response.data);
    });
  }, []);

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
        center={
          coordinates === undefined ? [-15.8013195, -47.9114457] : [lati, longi]
        }
        zoom={15}
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
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            <h3>Instituto Abelha Nativa</h3>
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
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {/* <img src={`imgtest/${totem.name}.jpeg`} alt=""/> */}
                <br></br>
                <h4>Nome da Espécie: {totem.name}</h4>
                <button onClick={() => openModal(totem.name)}>Saiba mais</button>
              </Popup>
            </Marker>
          );
        })}
      </Map>
      {isModalOpen &&
        <MapModal
          name={modalInfo[0].name}
          sName={modalInfo[0].sName}
          description={modalInfo[0].description}
          closeButtonOnClick={() => setIsModalOpen(false)}
        />}
    </div>
  );
}

export default TotemMap;
