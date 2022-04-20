<template>
  <div class="table">
    <div class="table__filter table-filter">
      <label for="id" class="table-filter__item table-filter__label-item label-item">
        <input class="label-item__input"
          v-model.number="idFilter" type="text" placeholder="id" name="id" />
        <span class="label-item__sort-button"
          @click="setSortById" @keydown="setSortById">⬍</span>
      </label>
      <label for="name" class="table-filter__item table-filter__label-item label-item">
        <input class="label-item__input"
          v-model="nameFilter" type="text" placeholder="name" name="name" />
        <span class="label-item__sort-button"
          @click="setSortByName" @keydown="setSortByName">⬍</span>
      </label>
      <select v-model="cityFilter" class="table-filter__item table-filter__select-item select-item">
        <option class="select-item__option"
          value="">Cities</option>
        <option class="select-item__option"
          v-for="(city, index) in uniqueCities" :key="index">{{ city }}</option>
      </select>
    </div>
    <table class="table__content content-table">
      <thead class="content-table__thead">
        <tr class="content-table__row">
          <th class="content-table__h-cell">id</th>
          <th class="content-table__h-cell">name</th>
          <th class="content-table__h-cell">username</th>
          <th class="content-table__h-cell">email</th>
          <th class="content-table__h-cell">city</th>
          <th class="content-table__h-cell">phone</th>
        </tr>
      </thead>
      <tbody class="content-table__tbody">
        <tr class="content-table__row" v-for="user in preparedUsers" :key="user.id">
          <td class="content-table__d-cell">{{ user.id }}</td>
          <td class="content-table__d-cell">{{ user.name }}</td>
          <td class="content-table__d-cell">{{ user.username }}</td>
          <td class="content-table__d-cell">{{ user.email }}</td>
          <td class="content-table__d-cell">{{ user.address.city }}</td>
          <td class="content-table__d-cell">{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
    <div class="table__pagination pagination">
      <div class="pagination__item"
        v-for="(page, index) in pages" :key="index"
        :class="{'pagination__item--active': page === currentPage}"
        @click="showPage(page)"
        @keydown="showPage(page)"
        >{{ page }}</div>
    </div>
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
      sort: 'id',
      idSortAsc: true,
      nameSortAsc: false,
    };
  },
  computed: {
    preparedUsers() {
      switch (this.sort) {
        case 'name':
          this.sortByName();
          break;
        default:
          this.sortById();
          break;
      }

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
    sortById() {
      const compareIds = (a, b) => (this.idSortAsc
        ? a.id - b.id
        : b.id - a.id);

      this.nameSortAsc = false;
      this.filteredUsers.sort(compareIds);
    },
    sortByName() {
      const compareName = (a, b) => (this.nameSortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name));

      this.idSortAsc = false;
      this.filteredUsers.sort(compareName);
    },
    setSortById() {
      this.idSortAsc = !this.idSortAsc;
      this.sort = 'id';
    },
    setSortByName() {
      this.nameSortAsc = !this.nameSortAsc;
      this.sort = 'name';
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
* {
  box-sizing: border-box;
}

.table {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-size: 12px;
}

.table-filter {
  display: grid;
  grid-template-columns: repeat(6, calc(900px / 6));
}

.label-item {
  display: flex;
  column-gap: 5px;

  &__input {
    width: 70%;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 0;
    outline: none;
    transition: .3s;

    &:hover {
      border-color: blueviolet;
    }
  }
  &__sort-button {
    font-size: 16px;
    width: 30px;
    line-height: 30px;
    border: 1px solid white;
    transition: .3s;

    &:hover {
      cursor: pointer;
      border-color: blueviolet;
    }
  }
}

.select-item {
  padding: 5px;
  border: 1px solid gray;
  border-radius: 0;
  outline: none;
  transition: .3s;

  &:hover {
    border-color: blueviolet;
  }
}

.content-table {
  &__row {
    display: grid;
    grid-template-columns: repeat(6, calc(900px / 6));
    padding: 5px 0;
    border-bottom: 1px solid gray;
    text-align: left;
    overflow-wrap: break-word;
  }

  &__d-cell {
    padding: 5px;
  }
}

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
      border-color: blueviolet;
    }

    &--active {
      border-color: blueviolet;
    }
  }

}
</style>
