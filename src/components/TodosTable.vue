<template>
  <div class="table">
    <div class="table__filter table-filter">
      <label for="id" class="table-filter__item table-filter__label-item label-item">
        <input class="label-item__input"
          v-model.number="idFilter" type="text" placeholder="id" name="id" />
        <span class="label-item__sort-button"
          @click="setSortById" @keydown="setSortById">⬍</span>
      </label>
      <label for="title" class="table-filter__item table-filter__label-item label-item">
        <input class="label-item__input"
          v-model="titleFilter" type="text" placeholder="title" name="title" />
        <span class="label-item__sort-button"
          @click="setSortByTitle" @keydown="setSortByTitle">⬍</span>
      </label>
    </div>
    <table class="table__content content-table">
      <thead class="content-table__thead">
        <tr class="content-table__row">
          <th class="content-table__h-cell">id</th>
          <th class="content-table__h-cell">title</th>
          <th class="content-table__h-cell">completed</th>
        </tr>
      </thead>
      <tbody class="content-table__tbody">
        <tr class="content-table__row" v-for="todo in preparedTodos" :key="todo.id">
          <td class="content-table__d-cell">{{ todo.id }}</td>
          <td class="content-table__d-cell">{{ todo.title }}</td>
          <td class="content-table__d-cell">{{ todo.completed }}</td>
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
  name: 'TodosTable',
  data() {
    return {
      idFilter: '',
      titleFilter: '',
      pagesPerPage: 10,
      currentPage: 1,
      sort: 'id',
      idSortAsc: true,
      titleSortAsc: false,
    };
  },
  computed: {
    preparedTodos() {
      switch (this.sort) {
        case 'title':
          this.sortByTitle();
          break;
        default:
          this.sortById();
          break;
      }

      return this.getTodosOnCurrentPage();
    },
    filteredTodos() {
      return this.todos
        .filter((todo) => {
          const isIdExist = todo.id === this.idFilter;
          const isFilterPossible = typeof this.idFilter === 'number';
          return isFilterPossible ? isIdExist : true;
        })
        .filter((todo) => {
          const isFilterPossible = this.titleFilter.trim() !== '';
          const isTitleExist = todo.title.toLowerCase()
            .indexOf(this.titleFilter.toLowerCase()) !== -1;
          return isFilterPossible ? isTitleExist : true;
        });
    },
    pages() {
      return Math.ceil(this.filteredTodos.length / this.pagesPerPage);
    },
  },
  methods: {
    getTodosOnCurrentPage() {
      this.currentPage = (this.currentPage > this.pages) ? 1 : this.currentPage;
      const begin = (this.currentPage - 1) * this.pagesPerPage;
      const end = this.pagesPerPage * this.currentPage;
      return this.filteredTodos.slice(begin, end);
    },
    showPage(page) {
      this.currentPage = page;
    },
    sortById() {
      const compareIds = (a, b) => (this.idSortAsc
        ? a.id - b.id
        : b.id - a.id);

      this.titleSortAsc = false;
      this.filteredTodos.sort(compareIds);
    },
    sortByTitle() {
      const compareTitle = (a, b) => (this.titleSortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title));

      this.idSortAsc = false;
      this.filteredTodos.sort(compareTitle);
    },
    setSortById() {
      this.idSortAsc = !this.idSortAsc;
      this.sort = 'id';
    },
    setSortByTitle() {
      this.titleSortAsc = !this.titleSortAsc;
      this.sort = 'title';
    },
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang='scss'>
  @import "../assets/scss/table.scss";
  $table-columns: 3;

  .table-filter {
    grid-template-columns: repeat($table-columns, calc(900px / $table-columns));
  }

  .content-table {
    &__row {
      grid-template-columns: repeat($table-columns, calc(900px / $table-columns));
    }
  }
</style>
