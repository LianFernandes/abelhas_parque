import { useState, FormEvent, useEffect } from "react";

import api from "../services/api";
import "../styles/pages/create-totem.css";
import { modalInfo } from "../modalinfo.js";

import QRCode from "qrcode.react";

interface Totem {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

export default function CreateTotem() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [totems, setTotems] = useState<Totem[]>([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [qrString, setQrString] = useState("");

  useEffect(() => {
    api.get("totems").then((response) => {
      console.log(response);
      setTotems(response.data);
      setRefreshPage(false);
    });
  }, [refreshPage]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await api.post("totems", { name, latitude, longitude });
    setRefreshPage(true);
  }

  async function deleteTotem(totemId: string) {
    await api.delete(`totems/${totemId}`);
    setRefreshPage(true);
  }

  function createQR(latitude: number, longitude: number, name: string) {
    const address = process.env.APP_URL || "http://localhost:3000/";
    const newQrString =
      address +
      String(latitude) +
      "," +
      String(longitude) +
      "," +
      String(modalInfo.findIndex((o) => o.name === name));
    setQrString(newQrString);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="create-totem-form">
        <fieldset>
          <legend>Dados</legend>
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </div>
        </fieldset>
        <button className="confirm-button" type="submit">
          Confirmar
        </button>
      </form>
      <div className="qr-and-data-table">

        <table id="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th></th>
            </tr>
          </thead>
          {totems.map((totem) => {
            return (
              <tbody key={totem.id}>
                <tr>
                  <td>{totem.name}</td>
                  <td>{totem.latitude}</td>
                  <td>{totem.longitude}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        createQR(totem.latitude, totem.longitude, totem.name)
                      }
                    >
                      QR
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => deleteTotem(totem.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <QRCode value={qrString} size={400} />
      </div>
    </div>
  );
}
