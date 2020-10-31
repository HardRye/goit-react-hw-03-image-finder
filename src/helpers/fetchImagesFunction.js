import axios from 'axios';

const API_KEY = '13135651-038714fd5931f83068ad66fd3';
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

const fetchImagesFunction = (query, page = 1) =>
  axios.get(`${URL}&q=${query}&page=${page}`);

export default fetchImagesFunction;
