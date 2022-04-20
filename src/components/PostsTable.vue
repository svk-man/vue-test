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
      <tbody class="content-table__tbody">
        <tr class="content-table__row" v-for="post in preparedPosts" :key="post.id">
          <td class="content-table__d-cell">{{ post.id }}</td>
          <td class="content-table__d-cell">{{ post.title }}</td>
          <td class="content-table__d-cell">{{ post.body }}</td>
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
  grid-template-columns: repeat(3, calc(900px / 3));
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
    grid-template-columns: repeat(3, calc(900px / 3));
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
