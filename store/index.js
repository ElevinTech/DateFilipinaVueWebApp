import Vuex from 'vuex'
import { auth, db, functions } from '~/plugins/firebase.js'
import createPersistedState from "vuex-persistedstate";
import * as Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    // plugins: [
    //   createPersistedState({
    //       paths: ['user'],
    //       storage: {
    //           getItem: (key) => Cookie.getJSON(key),
    //           setItem: (key, value) => Cookie.set(key, value, { expires: 3, secure: true }),
    //           removeItem: (key) => Cookie.remove(key)
    //       }
    //   })
    // ],

    state: {
      db: db,
      user: null,
      dashboardUsers: [],
      uid: '',
      selectedUser: null 
    },

    getters: {
      uid(state) {
        return state.uid
      },

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
        return getFeaturedUsers({})
      },

      getRegularUsers({ commit }, { gender }){
        var getRegularUsers = functions.httpsCallable('testDatabase');
        return getRegularUsers({gender: gender})
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

      likeUser({ commit }, { currentUser, otherUser }){

        const time = Math.floor((new Date()).getTime() / 1000)

        db.collection('user-likes').doc(currentUser).collection('likes-who').doc(otherUser).set({
          user: otherUser,
          date: time.toString()
        });

        db.collection('user-likes').doc(otherUser).collection('liked-by').doc(currentUser).set({
          user: currentUser,
          date: time.toString()
        });

        alert("User liked!")
        
      },

      getChatConversation({ commit }, { userOne, userTwo }){
        return db
        .collection('user-chat-messages')
        .doc(userOne)
        .collection(userTwo)
        .orderBy('createdDate', 'desc')
        .get()
      },

      chat({ commit }, { message, userOne, userTwo }){
        var sendChat = functions.httpsCallable('chat');

        return sendChat({toId: userTwo, message: message})
        // .then(function(result) {
        //   var isSuccess = result.data

        //   console.log(isSuccess)
        // });
      },

      getLikes({ commit }){
        return db
        .collection('user-likes')
        .doc(this.state.uid)
        .collection('liked-by')
        .get()
      },

      getViews(){
        return db
        .collection('user-visits')
        .doc(this.state.uid)
        .collection('visited-by')
        .get()
      }
    }
  })
}

export default createStore