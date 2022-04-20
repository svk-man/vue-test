import axios from 'axios';

const CATEGORIES = {
  POSTS: 'posts',
  TODOS: 'todos',
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

export function getTodos() {
  return axios
    .get(getUrl(CATEGORIES.TODOS))
    .then((response) => response.data);
}
