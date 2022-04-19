import axios from 'axios';

const CATEGORIES = {
  POSTS: 'posts',
  PHOTOS: 'photos',
  USERS: 'users',
};

function getUrl(category) {
  const SERVER_URL = 'https://jsonplaceholder.typicode.com/';
  return `${SERVER_URL}${category}`;
}

export function getPosts() {
  return axios
    .get(getUrl(CATEGORIES.POSTS))
    .then((response) => response.data);
}

export function getUsers() {
  return axios
    .get(getUrl(CATEGORIES.USERS))
    .then((response) => response.data);
}

export function getPhotos() {
  return axios
    .get(getUrl(CATEGORIES.PHOTOS))
    .then((response) => response.data);
}
