import React, { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';
import "../styles/pages/create-totem.css";

interface Totem {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

interface TotemParams {
  id: string;
}

export default function CreateTotem() {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [totems, setTotems] = useState<Totem[]>([]);

  useEffect(() => {
    api.get("totems").then((response) => {
      setTotems(response.data);
    });
  }, []);
  
  async function handleSubmit(event: FormEvent) {
      event.preventDefault();
      
      await api.post('totems', {name, latitude, longitude})

  }

  function deleteTotem(totemId: string) {
    console.log(totemId)
    
    api.delete(`totems/${totemId}`).then(api.get("totems").then((response) => {
      setTotems(response.data)}))
    
  };

  return (
    <div id="page-create-totem">
      <main>
        <form onSubmit={handleSubmit} className="create-totem-form">
          <fieldset>
            <legend>Dados</legend>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude"
                value={latitude}
                onChange={event => setLatitude(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude"
                value={longitude}
                onChange={event => setLongitude(event.target.value)}
              />
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">Confirmar</button>
        </form>
        <div>
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
                  <td><button type="button" onClick={() => deleteTotem(totem.id)}>delete</button></td>
                  </tr>
                  </tbody>
                )
              })}
          </table>
        </div>
      </main>
    </div>
  );
}
