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
            id="modal-img"
            src={`imgtest/${props.name}.png`}
            alt="zumzum"
          />
        </div>
        <div className="description">
        <p>
          {props.description}
        </p>
        </div>
        <div className="input-group actions">
          <button onClick={props.closeButtonOnClick}>
            <img src={close} alt="Fechar" />
          </button>
        </div>
      </div>
    </div>
  )
}
