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
      <tr v-for="user in preparedUsers" :key="user.id">
        <td>{{  user.id }}</td>
        <td>{{  user.name }}</td>
        <td>{{  user.username }}</td>
        <td>{{  user.email }}</td>
        <td>{{  user.address.city }}</td>
        <td>{{  user.phone }}</td>
      </tr>
    </tbody>
  </table>
  <div class="pagination">
    <div class="pagination__item"
      v-for="(page, index) in pages" :key="index"
      :class="{'pagination__item--active': page === currentPage}"
      @click="showPage(page)"
      @keydown="showPage(page)"
      >{{ page }}</div>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  data() {
    return {
      idFilter: '',
      nameFilter: '',
      cityFilter: '',
      pagesPerPage: 2,
      currentPage: 1,
    };
  },
  computed: {
    preparedUsers() {
      return this.getUsersOnCurrentPage();
    },
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
    pages() {
      return Math.ceil(this.filteredUsers.length / this.pagesPerPage);
    },
  },
  methods: {
    getUsersOnCurrentPage() {
      this.currentPage = (this.currentPage > this.pages) ? 1 : this.currentPage;
      const begin = (this.currentPage - 1) * this.pagesPerPage;
      const end = this.pagesPerPage * this.currentPage;
      return this.filteredUsers.slice(begin, end);
    },
    showPage(page) {
      this.currentPage = page;
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

<style scoped lang='scss'>
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &__item {
    width: 30px;
    height: 30px;
    border: 1px solid darkgray;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    transition: .3s;

    &:hover {
      cursor: pointer;
    }

    &--active {
      border-color: blueviolet;
    }
  }

}
</style>
