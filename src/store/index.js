import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/service/EventService.js'

Vue.use(Vuex)

// Changes to state could be unpredictable and untraceable
export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr', },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    todos: [
      { id: 1, text: '...', done: true, },
      { id: 2, text: '...', done: false, },
      { id: 3, text: '...', done: true, },
      { id: 4, text: '...', done: false, },
    ],
    events: [],
    event: {},
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      // activeTodosCount: (state, getters) => {
      // return state.todos.length - getters.doneTodos.length
      return state.todos.filter(todo => !todo.done).length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  // Mutations are used to commit and track state changes.
  // It's the best practice to have actions call mutations.
  // Mutations can update/mutate Vuex State.
  // Mutations are synchronous(happen one right after the other)
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  // Actions are asynchronous
  // (the order in which the code is written within an action,
  // might not be the order in which that code is executed)
  // Actions can wrap business logic around Mutations
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    // Payload: The payload in both Actions and Mutations
    // can be a single variable OR an object.
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          console.log('Total events are ' + response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
  },
  modules: {},
})
