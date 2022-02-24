import EventService from '@/service/EventService.js'

// All Mutations, Actions, and Getters will be namespaced under 'event
export const namespaced = true

export const state = {
  todos: [
    { id: 1, text: '...', done: true, },
    { id: 2, text: '...', done: false, },
    { id: 3, text: '...', done: true, },
    { id: 4, text: '...', done: false, },
  ],
  events: [],
  eventsTotal: 0,
  event: {},
}

export const getters = {
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
}

// Mutations are used to commit and track state changes.
// It's the best practice to have actions call mutations.
// Mutations can update/mutate Vuex State.
// Mutations are synchronous(happen one right after the other)
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
}

// Actions are asynchronous
// (the order in which the code is written within an action,
// might not be the order in which that code is executed)
// Actions can wrap business logic around Mutations
export const actions = {
  // Accessing another Module's State
  // Use the 'rootState'

  // We call other module's actions just like components.
  // because: Actions, Mutations, and Getters are always
  // registered under the global namespace(aka. the root which is $store)
  // even when using Modules.
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  // Payload: The payload in both Actions and Mutations
  // can be a single variable OR an object.
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message,
        }
        // module/action, payload, allows the dispatcher to go to the root state
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
}
