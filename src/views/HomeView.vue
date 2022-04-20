<template>
  <div class="home">
    <users-faq :users=users />
  </div>
</template>

<script>
import * as Api from '../api/axios';
import UsersFaq from '../components/UsersFaq.vue';

export default {
  name: 'HomeView',
  components: { UsersFaq },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getUsers() {
      Api.getUsers()
        .then((users) => {
          this.users = users.map((user) => (
            {
              id: user.id,
              name: user.name,
              email: user.email,
              city: user.address.city,
              phone: user.phone,
              showed: false,
            }
          ));
        });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
