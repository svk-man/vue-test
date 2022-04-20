<template>
  <users-table :users=users />
</template>

<script>
import * as Api from '../api/axios';
import UsersTable from '../components/UsersTable.vue';

export default {
  components: { UsersTable },
  name: 'UsersView',
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getUsers() {
      Api.getUsers()
        .then((users) => {
          this.users = users;
        });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style lang='scss'></style>
