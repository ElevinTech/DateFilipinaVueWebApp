<template>
  <div v-if="userOne && userTwo">
      <v-app-bar color="blue" app>
      <v-app-bar-nav-icon>
       <v-icon color="white">mdi-arrow-left</v-icon>    
      </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <v-avatar>
          <img
            v-bind:src="userTwo.userProfileMainImageUrl"
          >
        </v-avatar>
        {{ userTwo.firstName }}</v-toolbar-title>
    </v-app-bar>
    <v-container class="fill-height" style="margin-top: 50px;">
      <v-row class="fill-height pb-14" align="end">
        <v-col>
          <div v-for="(item, index) in individualConversation" :key="index" style="margin-bottom: 10px">

            <span v-if="item.fromId == userOne.uid" style="background-color: blue; float: right; padding: 10px; color: white; margin-right: 70px">
                {{ item.message }}
            </span>

            <span v-else style="background-color: red; float: left; padding: 10px; color: white">
                {{ item.message }}
            </span>

            <br>
            <br>
            <br>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-container class="ma-0 pa-0">
        <v-row no-gutters>
          <v-col>
            <div class="d-flex flex-row align-center">
              <v-text-field v-model="message" placeholder="Type Something" @keypress.enter="sendChat"></v-text-field>
              <v-btn icon class="ml-4" @click="sendChat"><v-icon>mdi-send</v-icon></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data(){
      return {
        userOne: {},
        userTwo: {},
        individualConversation: [],
        message: ""
      }
  },
  mounted(){
    this.getUserOne()
    this.getUserTwo()
    this.getChats()
  },
  methods: {
    getChats(){
      const userOneID = this.$store.getters.uid
      const userTwoID = this.$route.params.id
      var vm = this;

      db.collection("user-chat-messages").doc(userOneID).collection(userTwoID)
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    vm.individualConversation.push(change.doc.data())
                }
            });
      });

    },
    getUserOne(){
      const userOneID = this.$store.getters.uid

      var getUser = this.$store.dispatch("getUserById", {id: userOneID})
      getUser.then(user => {
                this.userOne = user.data()
              }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
              })
    },
    getUserTwo(){
      const userTwoID = this.$route.params.id

      var getUser = this.$store.dispatch("getUserById", {id: userTwoID})
      getUser.then(user => {
                this.userTwo = user.data()
              }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
              })
    },
    sendChat(){
        const userOneID = this.$store.getters.uid
        const userTwoID = this.$route.params.id
        const message = this.message

        var sendChat = this.$store.dispatch("chat", {message: message, userOne: userOneID, userTwo: userTwoID})
        sendChat.then(isSuccess => {
                    this.message = ""
                }, error =>{
                    alert("Got nothing from server. Prompt user to check internet connection and try again")
                })
            

    }
  }
}
</script>

<style>

</style>