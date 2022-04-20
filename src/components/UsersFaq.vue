<template>
  <div class="faq">
    <ul class="faq__items">
      <li class="faq__item" v-for="user in users" :key="user.id">
        <button class="faq__item-button" @click="user.showed = !user.showed">{{ user.id }}</button>
        <transition name="fade">
          <div class="faq__item-text" v-show=user.showed >{{ userText(user) }}</div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UsersFaq',
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    userText(user) {
      return `${user.name} (${user.email}) from ${user.city}, phone: ${user.phone}`;
    },
  },
};
</script>

<style scoped lang='scss'>
  .faq {
    &__items {
      width: 600px;
      margin: 0 auto;
      padding: 0 30px;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      list-style: none;
    }

    &__item {
      width: inherit;

      &-button {
        width: inherit;
        transition: .3s;

        &:hover {
          cursor: pointer;
        }
      }

      &-text {
        margin-top: 10px;
        text-align: left;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
