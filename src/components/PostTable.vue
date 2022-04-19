<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, index) in header" :key="index">
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <post-table-row v-for="post in posts" :post="post" :key="post.id" />
    </tbody>
  </table>
</template>

<script>
import PostTableRow from './PostTableRow.vue';

export default {
  name: 'PostTable',
  data() {
    return {
      header: ['id', 'userId', 'title', 'body'],
    };
  },
  props: {
    posts: Array,
  },
  components: {
    PostTableRow,
  },
};
</script>

<style scoped lang='scss'></style>
