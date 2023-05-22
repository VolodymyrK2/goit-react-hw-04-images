import PropTypes from 'prop-types'
import { useState, useEffect, useRef} from "react";
import css from './ImageGallery.module.css'
import Api from '../../services/api'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'
import Modal from 'components/Modal/Modal';
const INITIAL_STATE = {
    page: 1,
    totalImg: 0,
    error: null,
    isLoading: false,
    showModal: false,
    modalImageUrl: '',
    modalAltTitle: ''
}
const ImageGallery = ({ imageName }) => {
  const [stateGallery, setStateGallery] = useState(INITIAL_STATE);
  const [images, setImages] = useState([]);
  const handleClickLoadMore = () => {
  setStateGallery(prev => ({...prev, page: prev.page + 1 }))
  }
const resetImageGallery = () => {
  setStateGallery(INITIAL_STATE);
  setImages([]);
  }
const handleShowModal = (largeImageURL, altTitle) => {
  setStateGallery(prev => ({
      ...prev,
      showModal: true,
      modalImageUrl: largeImageURL,
      modalAltTitle: altTitle
    }))
  }
const closeModal = () => {
  setStateGallery(prev => ({
    ...prev,
    showModal: false
  })
  )
  }
  
  const prevImageName = useRef('');
  useEffect(() => {
     if (imageName==='') {
      return resetImageGallery();
    }
    if (prevImageName.current !== imageName&&stateGallery.page>1) {
      prevImageName.current = imageName;
     return resetImageGallery();
    }
     setStateGallery(prev => ({
         ...prev,
         isLoading: true,
         }))
     Api.getImages(imageName, stateGallery.page).then((data) => {
            const newImages = data.hits.map(el => {
            const { id, webformatURL, largeImageURL } = el
            const result = { id, webformatURL, largeImageURL }
            return result
          })
       setStateGallery(prev => ({
         ...prev,
         totalImg: data.totalHits,
         }))
        setImages(prev=>([...prev, ...newImages]))    
        }).catch(error => {
          setStateGallery(prev => ({
         ...prev,
         error
       }))
        }).finally(() => {
           setStateGallery(prev => ({
         ...prev,
         isLoading:false
           }))
        
          prevImageName.current = imageName;
        }) 
      }, [imageName, stateGallery.page])
   const { totalImg, page,error,isLoading,showModal, modalImageUrl, modalAltTitle } = stateGallery;
    const lastPage = Math.ceil(totalImg / Api.PER_PAGE);
    const isHiddenButton = (totalImg === 0 || page === lastPage);
return (
      <>
        {isLoading && <Loader />} 
        {error && alert("Something went wrong, please try again") }
        <ul id='gallery' className={css.gallery}>
          {images && images.map(image => (<ImageGalleryItem
            key={image.id}
            urlImage={image.webformatURL}
            altTitle={imageName}
            onClick={()=>handleShowModal(image.largeImageURL,imageName)}
          />))}
          </ul>
        {!isHiddenButton && <Button onClick={handleClickLoadMore} />}
        {showModal && <Modal
                srcImage={modalImageUrl}
          altTitle={modalAltTitle}
          closeModal = {closeModal}
    />}
    </>
    )
}

ImageGallery.propTypes = {
imageName: PropTypes.string
}
export default ImageGallery