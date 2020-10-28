import React, { Component } from 'react';
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
    error: null,
  };

  handleFormSubmit = input => {
    fetchImagesFunction(input, 1)
      .then(({ data }) =>
        this.setState({
          pageNumber: 1,
          searchQuery: input,
          photos: imagesMapper(data.hits),
        }),
      )
      .catch(error => this.setState({ error }));
  };

  handleLoadMoreButton = () => {
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber + 1,
      }),
      async () => {
        const { searchQuery, pageNumber } = this.state;
        await fetchImagesFunction(searchQuery, pageNumber)
          .then(({ data }) =>
            this.setState(prevState => ({
              photos: [...prevState.photos, ...imagesMapper(data.hits)],
            })),
          )
          .catch(error => this.setState({ error }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      },
    );
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

  render() {
    const { photos, largeImageURL, error } = this.state;
    return (
      <>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        {photos.length > 0 && (
          <>
            <ImageGallery
              photos={photos}
              handleLargeImage={this.handleLargeImage}
            />

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