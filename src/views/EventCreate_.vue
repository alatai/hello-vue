<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>{{ getEventById(2) }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
// mapState into computed Properties
// we can name our mapState, or not
import { mapState, mapGetters, } from 'vuex'

export default {
  computed: {
    // allow us to write in additional computed properties
    catLength() {
      return this.$store.getters.catLength
    },
    // getEvent() {
    //   return this.$store.getters.getEventById
    // },
    ...mapGetters(['getEventById',]),
    ...mapState(['user', 'categories']),
  }

  // computed: mapState({
    // user: 'user',
      // if we just have a top level state
      // meaning were not using dot notation
      // to access a property on that state
      // can use a string here,
      // 'categories' to refer to that state
    // categories: 'categories'
  // }),
}
</script>

<style scoped></style>
