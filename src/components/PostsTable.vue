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
          <th class="content-table__h-cell">body</th>
        </tr>
      </thead>
      <tbody class="content-table__tbody" v-if="preparedPosts.length">
        <tr class="content-table__row" v-for="post in preparedPosts" :key="post.id">
          <td class="content-table__d-cell">{{ post.id }}</td>
          <td class="content-table__d-cell">{{ post.title }}</td>
          <td class="content-table__d-cell">{{ post.body }}</td>
        </tr>
      </tbody>
      <tbody class="content-table__tbody" v-else >
        <tr class="content-table__row">
          <td class="content-table__d-cell" colspan="3">Nothing to show</td>
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
  name: 'PostsTable',
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
    preparedPosts() {
      switch (this.sort) {
        case 'title':
          this.sortByTitle();
          break;
        default:
          this.sortById();
          break;
      }

      return this.getPostsOnCurrentPage();
    },
    filteredPosts() {
      return this.posts
        .filter((post) => {
          const isIdExist = post.id === this.idFilter;
          const isFilterPossible = typeof this.idFilter === 'number';
          return isFilterPossible ? isIdExist : true;
        })
        .filter((post) => {
          const isFilterPossible = this.titleFilter.trim() !== '';
          const isTitleExist = post.title.toLowerCase()
            .indexOf(this.titleFilter.toLowerCase()) !== -1;
          return isFilterPossible ? isTitleExist : true;
        });
    },
    pages() {
      return Math.ceil(this.filteredPosts.length / this.pagesPerPage);
    },
  },
  methods: {
    getPostsOnCurrentPage() {
      this.currentPage = (this.currentPage > this.pages) ? 1 : this.currentPage;
      const begin = (this.currentPage - 1) * this.pagesPerPage;
      const end = this.pagesPerPage * this.currentPage;
      return this.filteredPosts.slice(begin, end);
    },
    showPage(page) {
      this.currentPage = page;
    },
    sortById() {
      const compareIds = (a, b) => (this.idSortAsc
        ? a.id - b.id
        : b.id - a.id);

      this.titleSortAsc = false;
      this.filteredPosts.sort(compareIds);
    },
    sortByTitle() {
      const compareTitle = (a, b) => (this.titleSortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title));

      this.idSortAsc = false;
      this.filteredPosts.sort(compareTitle);
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
    posts: {
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
