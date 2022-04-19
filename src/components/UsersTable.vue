<template>
  <div>
    <label for="id">
      <input v-model.number="idFilter" type="text" placeholder="id" name="id" />
    </label>
    <label for="name">
      <input v-model="nameFilter" type="text" placeholder="name" name="name" />
    </label>
    <select v-model="cityFilter">
      <option value="">Cities</option>
      <option v-for="(city, index) in uniqueCities" :key="index">{{ city }}</option>
    </select>
  </div>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>username</th>
        <th>email</th>
        <th>city</th>
        <th>phone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{  user.id }}</td>
        <td>{{  user.name }}</td>
        <td>{{  user.username }}</td>
        <td>{{  user.email }}</td>
        <td>{{  user.address.city }}</td>
        <td>{{  user.phone }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UsersTable',
  data() {
    return {
      idFilter: '',
      nameFilter: '',
      cityFilter: '',
    };
  },
  computed: {
    filteredUsers() {
      return this.users
        .filter((user) => {
          const isIdExist = user.id === this.idFilter;
          const isFilterPossible = typeof this.idFilter === 'number';
          return isFilterPossible ? isIdExist : true;
        })
        .filter((user) => {
          const isFilterPossible = this.nameFilter.trim() !== '';
          const isNameExist = user.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
          return isFilterPossible ? isNameExist : true;
        })
        .filter((user) => {
          const isFilterPossible = this.cityFilter !== '';
          const isCityExist = user.address.city === this.cityFilter;
          return isFilterPossible ? isCityExist : true;
        });
    },
    uniqueCities() {
      const cities = new Set();
      this.users.forEach((user) => cities.add(user.address.city));
      return Array.from(cities);
    },
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang='scss'></style>
