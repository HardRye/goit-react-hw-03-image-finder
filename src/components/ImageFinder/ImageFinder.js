import React, { Component, createRef } from 'react';
import Loader from 'react-loader-spinner';
import fetchImagesFunction from '../../helpers/fetchImagesFunction';
import imagesMapper from '../../helpers/imagesMapper';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

class ImageFinder extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    photos: [],
    largeImageURL: '',
    isLoader: false,
    error: null,
  };

  galleryRef = createRef();

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber } = this.state;
    const { scrollHeight } = this.galleryRef.current;

    if (
      prevState.pageNumber !== pageNumber &&
      prevState.searchQuery === searchQuery
    ) {
      fetchImagesFunction(searchQuery, pageNumber)
        .then(({ data }) =>
          this.setState(() => ({
            photos: [...prevState.photos, ...imagesMapper(data.hits)],
          })),
        )
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.handleScroll(scrollHeight);
          this.setState({ isLoader: false });
        });
    }
  }

  handleFormSubmit = input => {
    const { searchQuery } = this.state;
    if (input === searchQuery) return;

    fetchImagesFunction(input)
      .then(({ data }) => {
        this.setState({
          pageNumber: 1,
          searchQuery: input,
          photos: imagesMapper(data.hits),
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.handleScroll();
      });
  };

  handleLoadMoreButton = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
      isLoader: true,
    }));
  };

  handleLargeImage = ({ currentTarget }) => {
    const { photos } = this.state;
    const { id } = currentTarget.dataset;
    const { largeImageURL } = photos.find(photo => photo.id === Number(id));
    this.setState({ largeImageURL });
  };

  handleModalClose = () => {
    this.setState({ largeImageURL: '' });
  };

  handleScroll = (height = 0) => {
    window.scrollTo({
      top: height,
      behavior: 'smooth',
    });
  };

  render() {
    const { photos, largeImageURL, isLoader, error } = this.state;
    return (
      <>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        {photos.length > 0 && (
          <>
            <div ref={this.galleryRef}>
              <ImageGallery
                photos={photos}
                handleLargeImage={this.handleLargeImage}
              />
            </div>
            {isLoader && (
              <div style={{ margin: '0 auto', width: '80px' }}>
                <Loader type="Hearts" color="#3f51b5" height={80} width={80} />
              </div>
            )}
            <Button handleLoadMoreButton={this.handleLoadMoreButton} />
          </>
        )}

        {largeImageURL.length > 0 && (
          <Modal
            largeImageURL={largeImageURL}
            handleModalClose={this.handleModalClose}
          />
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
      </>
    );
  }
}

export default ImageFinder;
