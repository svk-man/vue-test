<template>
  <table>
    <thead>
      <tr>
        <th v-for="(title, index) in titles" :key="index">
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <data-table-row v-for="item in items" :key="item.id" :item="item" />
    </tbody>
  </table>
</template>

<script>
import DataTableRow from './DataTableRow.vue';

export default {
  name: 'DataTable',
  props: {
    items: {
      type: Array,
      required: true,
    },
    titles: {
      type: Array,
      required: true,
    },
  },
  components: {
    DataTableRow,
  },
};
</script>

<style scoped lang='scss'></style>
