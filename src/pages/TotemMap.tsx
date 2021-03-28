import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.webp';
import '../styles/pages/totem-map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../contexts/AuthContext';
<<<<<<< HEAD
import axios from '../services/httpService';
=======
>>>>>>> c3acc1350dfcfcc2168e6cfe6d088851a117e517

function TotemMap() {
    const { Logout } = useAuth();
    return (
        <div id="page-map">
            <nav>
                <img src={logo} alt="Instituto Abelha Nativa" />
                <h2>Mapa do Parque</h2>
<<<<<<< HEAD
            
=======

                
>>>>>>> c3acc1350dfcfcc2168e6cfe6d088851a117e517
                <button type="button" onClick={Logout}>
                    Sair
                </button>
            </nav>

            <Map
                center={[-15.8048141, -47.9234958]}
                zoom={19}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            </ Map>
        </div>

    )
}

export default TotemMap;