<template>
  <todos-table :todos=todos />
</template>

<script>
import * as Api from '../api/axios';
import TodosTable from '../components/TodosTable.vue';

export default {
  components: { TodosTable },
  name: 'TodosView',
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    getTodos() {
      Api.getTodos()
        .then((todos) => {
          this.todos = todos.map((todo) => (
            {
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
            }
          ));
        });
    },
  },
  mounted() {
    this.getTodos();
  },
};
</script>

<style lang='scss'></style>
