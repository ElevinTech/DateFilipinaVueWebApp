import Vuex from 'vuex'
import { auth, db } from '~/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      db: db,
      user: '',
      dashboardUsers: []
    },

    getters: {
      user(state) {
        return state.user
      },
    
      isAuthenticated(state) {
        return !!state.user
      },

      randomUser(state) {
        return state.user
      }
      
    },

    mutations: {
      setUser(state, payload) {
        state.user = payload
      },

      ADD_USER(state, payload){
        state.users.push(payload)
      },

      SET_USER(state, { user } ){
        state.dashboardUsers.push(user.data())
      }
    },

    actions: {
      signUp({ commit }, { email, password }) {
        return auth.createUserWithEmailAndPassword(email, password)
      },
    
      signInWithEmail({ commit }, { email, password }) {
        return auth.signInWithEmailAndPassword(email, password)
      },

      signOut() {
        return auth.signOut()
      },

      getUsers ({ commit }) {
        commit('ADD_USER', { firstName: 'andrew ford', lastName: 'medina' })
        commit('ADD_USER', { firstName: 'richie', lastName: 'horsie' })
      },

      async getRandomUsers ({ commit, rootState }) {

        let randomIndex = []
        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))
        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))
        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))

        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))
        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))
        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))

        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))
        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))
        randomIndex.push(Math.floor(Math.random() * (523 - 0) + 0))

        this.state.dashboardUsers = []

        
        let userRef = db.collection('users').where('indexByGender', 'in', randomIndex).limit(9)
        let users = await userRef.get()
        users.forEach(user => commit('SET_USER', { user }))
      }
    }
  })
}

export default createStore