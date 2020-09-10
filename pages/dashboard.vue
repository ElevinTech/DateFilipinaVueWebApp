<template>
    <!-- <h1 v-if="user">Welcome {{ user.firstName }} - {{ user.email }}</h1> -->
      <v-container>

      <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="user in dashboardUsers" :key="user.id">
                <!-- <v-card
                >
                  <v-img
                    v-bind:src="user.userProfileMainImageUrl"
                    height="200px"
                    @click="viewUser(user)"
                  ></v-img>

                  <v-card-title>
                    {{ user.firstName }}
                  </v-card-title>

                  <v-card-subtitle>
                    Age: {{ user.age }}
                  </v-card-subtitle>

                  <v-card-actions>
                    <v-btn text @click="chatUser(user)">
                      <v-icon left>mdi-message</v-icon>
                       Chat
                    </v-btn>

                    <v-btn text @click="likeUser(user.uid)">
                      <v-icon left>mdi-thumb-up</v-icon>
                      Like
                    </v-btn>

                    <v-spacer></v-spacer>
                    
                  </v-card-actions>
                </v-card> -->

                <v-card>
                  <v-img
                    @click="viewUser(user)"
                    v-bind:src="user.userProfileMainImageUrl"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <v-card-title>{{ user.firstName }}, {{ user.age }} </v-card-title>
                  </v-img>

                  <v-card-actions>

                    <v-btn text @click="chatUser(user)">
                      <v-icon left>mdi-message</v-icon>
                      Chat
                    </v-btn>
                    <v-spacer></v-spacer>
                    

                    <v-btn text @click="likeUser(user.uid)">
                      <v-icon left>mdi-thumb-up</v-icon>
                      Like
                    </v-btn>

                    

                    
                  </v-card-actions>
                </v-card>
            </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn @click="reloadUsers" x-large color="success" dark block>View More</v-btn>
        </v-col>
      </v-row>
      
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: 'default',
  methods:{
    
  },
  data(){
    return {
      user: {},
      firstName: '',
      dashboardUsers: [],
      dashboardUsersUid: [],
    }
  },
  mounted(){
    this.getUser()
  },
  methods:{
    getUser(){
      const userID = this.$store.getters.uid

      var getUser = this.$store.dispatch("getUserById", {id: userID})
      getUser.then(user => {
                console.log(user.data())

                if(!user.data()){
                  alert("new user redirect to create profile page")
                }

                else {
                  this.user = user.data()
                  this.getDashboardUsers()
                }

                
              }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
              })
    },

    reloadUsers(){
      this.getDashboardUsers()
    },

    viewUser(user){

      this.$store.dispatch("setSelectedUser", { user: user })
      this.$router.push({
          path: 'user/' + user.uid
      })
    },

    chatUser(user){
      this.$router.push({
          path: 'chat/' + user.uid
      })
    },

    getDashboardUsers(){
      
      const gender = this.user.gender

      if (gender == "female"){

          this.$store
              .dispatch("getRegularUsers", { gender: "female"})
              .then(result => {
                  result.data.forEach(user =>{
                    this.dashboardUsers.push(user)
                  });
              });

      } else {

          this.$store
              .dispatch("getFeaturedUsers")
              .then(result => {
                  result.data.forEach(user =>{
                    this.dashboardUsers.push(user)
                  });
              });
      }
    },

    likeUser(otherUser){
      this.$store.dispatch("likeUser", {currentUser: this.$store.getters.uid, otherUser: otherUser})
    }
  }
}
</script>

<style>
  body{
      background-image: none !important;
  }

  .v-application {
    background: white !important;
  }
</style>