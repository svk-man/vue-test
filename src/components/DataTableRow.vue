<template>
  <tr>
    <td v-for="(value, index) in item" :key="index">
      {{ value }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DataTableRow',
  props: {
    item: Object,
  },
};
</script>

<style scoped lang='scss'></style>
