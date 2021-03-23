import React from 'react';

import '../styles/components/mapModal.css';
import close from "../images/close.svg";

interface MapModalProps {
  closeButtonOnClick: () => void;
  name: string;
  sName: string;
  description: string;
}

export function MapModal(props: MapModalProps) {

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <div id="modal-text">
            <h2>{props.name}</h2>
            <span>{props.sName}</span>
          </div>
          <img
            src={`imgtest/${props.name}.jpeg`}
            alt="zumzum"
            width="200"
            height="200"
          />
        </div>
        <p>
          {props.description}
            </p>
        <div className="input-group actions">
          <button onClick={props.closeButtonOnClick}>
            <img src={close} alt="Fechar" />
          </button>
        </div>
      </div>
    </div>
  )
}
