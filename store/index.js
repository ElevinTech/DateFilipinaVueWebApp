import Vuex from 'vuex'
import { auth, db, functions } from '~/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      db: db,
      user: '',
      dashboardUsers: [],
      uid: '',
      selectedUser: null
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

      SET_DASHBOARD_USERS(state, { users }){
        users.forEach(user => state.dashboardUsers.push(user))
      },

      SET_SELECTED_USER(state, user){
        state.selectedUser = user
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

      getFeaturedUsers({ commit }){
        var getFeaturedUsers = functions.httpsCallable('getFeaturedUsers');
        getFeaturedUsers({}).then(function(result) {
          var users = result.data
          commit('SET_DASHBOARD_USERS', { users })
        });
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

      },

      getUserById({ commit }, { id }){
        return db
        .collection('users')
        .doc(id)
        .get()
      },

      setSelectedUser({ commit }, { user }){
        commit('SET_SELECTED_USER', user )
      },

      getChatList({ commit }){
        var getUserChatList = functions.httpsCallable('getUserChatList');
        return getUserChatList({});
      },
    }
  })
}

export default createStore