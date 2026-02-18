import { CheckIcon } from './Icons';

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <CheckIcon />
        </div>
        {children}
        <button className="modal-btn" onClick={onClose}>
          Отлично
        </button>
      </div>
    </div>
  );
}

export default Modal;
