<template>
  <post-table :posts=posts />
</template>

<script>
import PostTable from './components/PostTable.vue';

export default {
  components: { PostTable },
  name: 'App',
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.posts = response.data;
      });
  },
};
</script>

<style lang='scss'></style>
