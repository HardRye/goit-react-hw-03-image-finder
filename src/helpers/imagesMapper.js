const imagesMapper = arr =>
  arr.map(el => ({
    id: el.id,
    webformatURL: el.webformatURL,
    largeImageURL: el.largeImageURL,
    tags: el.tags,
  }));

export default imagesMapper;
