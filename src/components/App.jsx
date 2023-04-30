import { useEffect, useState } from 'react';
import { Searchbar } from './search-bar/SearchBar';
import { Container, Button } from './App.styled';
import { Gallary } from './image-gallery/ImageGallery';
import { getImages } from 'services/image-service';
import { animateScroll } from 'react-scroll';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const App = () => {
    const [largeImageUrl, updLargeImageUrl] = useState('');
    const [alt, updAlt] = useState('');
    const [query, updQuery] = useState('');
    const [page, updPage] = useState(1);
    const [images, updImages] = useState([]);
    const [showButton, updShowButton] = useState(false);
    const [isLoading, updIsLoading] = useState(false);

    useEffect(() => {
        if (!query) return;
        updIsLoading(true);
        getImages(query, page)
            .then(data => {
                if (!data.hits.length) {
                    toast('Sorry. There are no images ... 😭');
                    return;
                }
                updImages(image => [...image, ...data.hits]);
                updShowButton(page < Math.ceil(data.total / 12));
                if (page >= Math.ceil(data.total / 12))
                    toast(
                        `We're sorry, but you've reached the end of search results.`
                    );
            })
            .catch(err => {
                toast(err.message);
            })
            .finally(() => {
                updIsLoading(false);
            });
    }, [query, page]);

    const onSubmit = query => {
        updQuery(query);
        updPage(1);
        updImages([]);
        updShowButton(false);
        updIsLoading(false);
    };

    const scrollOnMoreButton = () => {
        animateScroll.scrollToBottom({
            duration: 1000,
            delay: 10,
            smooth: 'linear',
        });
    };

    const loadMore = () => {
        updPage(obj => obj + 1);
        scrollOnMoreButton();
    };

    const toggleModal = (largeImageUrl = '', alt = '') => {
        updLargeImageUrl(largeImageUrl);
        updAlt(alt);
        if (largeImageUrl) disableBodyScroll(document.body);
        else enableBodyScroll(document.body);
    };

    return (
        <Container>
            <Searchbar onSubmit={onSubmit} />
            <Gallary onCardClick={toggleModal} images={images} />
            {showButton && (
                <Button type="button" onClick={loadMore}>
                    Load more
                </Button>
            )}
            {isLoading && <Loader />}
            {largeImageUrl && (
                <Modal
                    largeImageUrl={largeImageUrl}
                    alt={alt}
                    onClose={toggleModal}
                />
            )}
            <ToastContainer />
        </Container>
    );
};
