import React, { Component } from 'react';
import authKey from '../../helpers/authKey';
import SearchForm from './SearchForm/SearchForm';
import Gallery from './Gallery/Gallery';

class ImageFinder extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    photos: [],
  };

  handleFormSubmit = input => {
    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${input}&page=1&per_page=12&key=${authKey}`,
    )
      .then(result => result.json())
      .then(data =>
        this.setState({
          pageNumber: 1,
          searchQuery: input,
          photos: data.hits.map(el => ({
            id: el.id,
            webformatURL: el.webformatURL,
            largeImageURL: el.largeImageURL,
            likes: el.likes,
            views: el.views,
            comments: el.comments,
            downloads: el.downloads,
            tags: el.tags,
          })),
        }),
      )
      .catch(error => console.log('error', error));
  };

  handleLoadMoreButton = () => {
    this.setState(
      prevState => ({
        pageNumber: prevState.pageNumber + 1,
      }),
      async () => {
        const { searchQuery, pageNumber } = this.state;
        fetch(
          `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${authKey}`,
        )
          .then(result => result.json())
          .then(data =>
            this.setState(prevState => ({
              photos: [
                ...prevState.photos,
                ...data.hits.map(el => ({
                  id: el.id,
                  webformatURL: el.webformatURL,
                  largeImageURL: el.largeImageURL,
                  likes: el.likes,
                  views: el.views,
                  comments: el.comments,
                  downloads: el.downloads,
                  tags: el.tags,
                })),
              ],
            })),
          )
          .catch(error => console.log('error', error));
      },
    );
  };

  render() {
    const { photos, searchQuery } = this.state;
    return (
      <>
        <SearchForm
          searchQuery={searchQuery}
          handleFormSubmit={this.handleFormSubmit}
        />
        {photos.length > 0 && (
          <Gallery
            photos={photos}
            handleLoadMoreButton={this.handleLoadMoreButton}
          />
        )}
      </>
    );
  }
}

export default ImageFinder;
