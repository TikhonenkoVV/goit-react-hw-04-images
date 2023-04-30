import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ImgWrapper, LargeImage, Overlay } from './Modal.styled';

export const Modal = ({ onClose, largeImageUrl, alt }) => {
    useEffect(() => {
        const onEscPress = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', onEscPress);
        return () => window.removeEventListener('keydown', onEscPress);
    }, [onClose]);

    const onBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <ModalBackdrop onClick={onBackdropClick}>
            <ImgWrapper>
                <LargeImage src={largeImageUrl} alt={alt} />
                <Overlay>{alt}</Overlay>
            </ImgWrapper>
        </ModalBackdrop>,
        document.getElementById('modal-root')
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};
