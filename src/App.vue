<template>
  <data-table :items=postsItems :titles=postsTitles />
</template>

<script>
import * as Api from './api/axios';
import DataTable from './components/DataTable.vue';

export default {
  components: { DataTable },
  name: 'App',
  data() {
    return {
      postsTitles: [],
      postsItems: [],
      photosTitles: [],
      photosItems: [],
      usersTitles: [],
      usersItems: [],
    };
  },
  methods: {
    getPosts() {
      Api.getPosts()
        .then((posts) => {
          this.postsTitles = ['userId', 'id', 'title', 'body'];
          this.postsItems = posts;
        });
    },
    getUsers() {
      Api.getUsers()
        .then((users) => {
          this.usersTitles = ['id', 'name', 'username', 'email', 'city'];
          this.usersItems = users.map((user) => (
            {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              city: user.address.city,
            }));
        });
    },
    getPhotos() {
      Api.getPhotos()
        .then((photos) => {
          this.photosTitles = ['id', 'title', 'url'];
          this.photosItems = photos.map((photo) => (
            {
              id: photo.id,
              title: photo.title,
              url: photo.url,
            }));
        });
    },
  },
  mounted() {
    this.getPosts();
    this.getUsers();
    this.getPhotos();
  },
};
</script>

<style lang='scss'></style>
