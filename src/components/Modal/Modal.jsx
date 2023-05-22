import { useEffect } from 'react';
import PropTypes from 'prop-types'
import css from './Modal.module.css'

const Modal = ({ srcImage, altTitle, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    window.removeEventListener('keydown', handleKeyDown)  
    }
  })
const   handleKeyDown = e => {
          if (e.code === 'Escape') {
        closeModal();
      }
  }
const  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
return (
      <div onClick={handleOverlayClick} className={css.overlay}>
        <div className={css.modal}>
          <img src={srcImage} alt={altTitle} />
        </div>
      </div>
    )
}
Modal.propTypes = {
  srcImage: PropTypes.string,
  altTitle: PropTypes.string,
  closeModal: PropTypes.func
}
export default Modal