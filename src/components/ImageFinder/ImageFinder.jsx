import React, { Component } from 'react';
import fetchImagesFunction from '../../helpers/fetchImagesFunction';
import imagesMapper from '../../helpers/imagesMapper';
import SearchForm from './SearchForm/SearchForm';
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';

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
          top: window.scrollY + window.innerHeight,
          behavior: 'smooth',
        });
      },
    );
  };

  handleLargeImage = ({ target }) => {
    const { photos } = this.state;
    const { id } = target.dataset;
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
        <SearchForm handleFormSubmit={this.handleFormSubmit} />
        {photos.length > 0 && (
          <Gallery
            photos={photos}
            handleLoadMoreButton={this.handleLoadMoreButton}
            handleLargeImage={this.handleLargeImage}
          />
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
