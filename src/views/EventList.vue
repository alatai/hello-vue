<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <!-- only show previous link if not on first page -->
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page-1 }}" rel="pre">
        Prev Page
      </router-link> |
    </template>
      <router-link :to="{ name: 'event-list', query: { page: page+1 }}" rel="next">
        Next Page
      </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

// 1.Watch the page computed property,
// and call fetchEvent when it changes
// OR
// 2.Reload components when the URL changes,
// including query parameters

export default {
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['events'])
  },
}
</script>

<style scoped></style>
