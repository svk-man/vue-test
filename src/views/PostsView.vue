<template>
  <posts-table :posts=posts />
</template>

<script>
import * as Api from '../api/axios';
import PostsTable from '../components/PostsTable.vue';

export default {
  components: { PostsTable },
  name: 'PostsView',
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getPosts() {
      Api.getPosts()
        .then((posts) => {
          this.posts = posts.map((post) => (
            {
              id: post.id,
              title: post.title,
              body: post.body,
            }
          ));
        });
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style lang='scss'></style>
