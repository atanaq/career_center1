import { CheckIcon } from './Icons';

function Modal({ children, onClose, variant = 'success' }) {
  const isForm = variant === 'form';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal${isForm ? ' modal-form' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isForm ? (
          <>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Закрыть">
              ×
            </button>
            {children}
          </>
        ) : (
          <>
            <div className="modal-icon">
              <CheckIcon />
            </div>
            {children}
            <button className="modal-btn" onClick={onClose}>
              Отлично
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
