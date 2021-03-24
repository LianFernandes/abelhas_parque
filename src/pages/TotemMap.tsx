import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";
import { MapModal } from "../components/MapModal";

import { modalInfo } from "../modalinfo.js";
import logo from "../images/logo2.svg";
import mapMarker from "../images/Map_marker.svg";
import beeMarker from "../images/colmeia.svg";

import api from "../services/api";

import "../styles/pages/totem-map.css";

const mapIcon = L.icon({
  iconUrl: mapMarker,
  iconSize: [60, 90],
  iconAnchor: [30, 90],
  popupAnchor: [170, -6],
});

const beeIcon = L.icon({
  iconUrl: beeMarker,
  iconSize: [60, 90],
  iconAnchor: [30, 90],
  popupAnchor: [170, -6],
});

interface Totem {
  latitude: number;
  longitude: number;
  id: string;
  name: string;
}

interface QrParams {
  qrParam: string;
}

function TotemMap() {
  const { qrParam } = useParams<QrParams>();
  console.log(qrParam)
  const { goBack } = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totems, setTotems] = useState<Totem[]>([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [openModalWithParam, setOpenModalWithParam] = useState(false);

  let lati = 0;
  let longi = 0;

  function openModal(totemName: string) {
    setModalIndex(modalInfo.findIndex((o) => o.name === totemName));
    setIsModalOpen(true);
  }

  function openModalParams() {
    setModalIndex(Number(qrParam.split(",")[2]));
    setIsModalOpen(true);
    setOpenModalWithParam(false);
  }

  try {
    lati = Number(qrParam.split(",")[0]);
    longi = Number(qrParam.split(",")[1]);
  } catch (error) { }

  useEffect(() => {
    api.get("totems").then((response) => {
      setTotems(response.data);
    });
  }, [qrParam]);

  console.log("render");
  return (
    <div id="page-map">
      <nav>
        <a href="https://www.institutoabelhanativa.org/">
          <img src={logo} alt="Instituto Abelha Nativa" />
        </a>
        <h2>Instituto Abelha Nativa</h2>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#000" />
        </button>
      </nav>

      <MapContainer
        center={qrParam === undefined ? [-15.8013195, -47.9114457] : [lati, longi]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl />
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
        {/* url={`https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}
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
                <h4>Nome da Espécie: {totem.name}</h4>
                <button onClick={() => openModal(totem.name)}>
                  Saiba mais
                </button>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      {openModalWithParam && openModalParams()}
      {isModalOpen && (
        <MapModal
          name={modalInfo[modalIndex].name}
          sName={modalInfo[modalIndex].sName}
          description={modalInfo[modalIndex].description}
          closeButtonOnClick={() => setIsModalOpen(false)}
        />
      )}
      <footer><span>autoria <a href="https://github.com/lian-fernandes">lian</a></span></footer>
    </div>
  );
}

export default TotemMap;
