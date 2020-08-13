import Vuex from 'vuex'
import { auth, db } from '~/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      db: db,
      user: '',
      dashboardUsers: [],
      uid: ''
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
      SET_USER(state, user){
        state.user = user
      },

      SET_UID(state, uid){
        state.uid = uid
      },

      ADD_USER(state, { user } ){
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
        users.forEach(user => commit('ADD_USER', { user }))
      },

      async getMaxGenderIndex({ commit }, { gender }){

        return db
          .collection('users')
          .where('gender', '==', gender)
          .orderBy('indexByGender', 'desc')
          .limit(1)
          .get()
          
      },

      updatePersonalInfoFields({ commit }, { fields }){

        return db
          .collection('users')
          .doc(this.state.uid)
          .update(fields)
          
      },

      async getUser({ commit }){

        let uid = this.state.uid
        let userRef = db.collection('users').doc(uid)
        await userRef.get()
          .then((user) => {
            commit('SET_USER', user.data())
          })

      }
    }
  })
}

export default createStore