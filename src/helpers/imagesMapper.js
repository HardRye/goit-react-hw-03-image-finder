const imagesMapper = arr =>
  arr.map(el => ({
    id: el.id,
    webformatURL: el.webformatURL,
    largeImageURL: el.largeImageURL,
    likes: el.likes,
    views: el.views,
    comments: el.comments,
    downloads: el.downloads,
    tags: el.tags,
  }));

export default imagesMapper;
