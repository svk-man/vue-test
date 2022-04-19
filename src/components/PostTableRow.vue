<template>
  <tr>
    <td>{{ post.id }}</td>
    <td>{{ post.userId }}</td>
    <td>{{ post.title }}</td>
    <td>{{ post.body }}</td>
  </tr>
</template>

<script>
export default {
  name: 'PostTableRow',
  props: {
    post: Object,
  },
};
</script>

<style scoped lang='scss'></style>
