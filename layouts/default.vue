<template>
<v-app v-if="user">
  <div>
    <v-app-bar app color="primary" dark>
      

      <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light">Date</span>
          <span>Filipina</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="/chat" icon nuxt>
        <v-icon>mdi-chat</v-icon>
      </v-btn>

      <v-btn to="#" icon nuxt>
        <v-icon>mdi-bell-ring</v-icon>
      </v-btn>

            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

<!-- 
      

      <v-btn to="/user/self" text nuxt>
        <v-icon left>mdi-account</v-icon>
        John
      </v-btn> -->

      

      

      <!-- <v-btn to="/likes" icon nuxt>
        <v-icon>mdi-thumb-up
      </v-icon>
      </v-btn>

      <v-btn to="/views" icon nuxt>
        <v-icon>mdi-eye
      </v-icon>
      </v-btn>

      <v-btn to="/chat" icon nuxt>
        <v-icon>mdi-chat</v-icon>
      </v-btn>

      <v-btn @click="logout()" icon>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn> -->

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      
      temporary
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.userProfileMainImageUrl">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.firstName }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        
        <v-list-item to="/dashboard" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/user/self" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Your Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item to="/views" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-eye</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Views</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/likes" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-thumb-up</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Likes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item @click="logout()" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    
    
    <br>

    <v-main>
        <nuxt />
    </v-main>
    

    <!-- <v-footer
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
      <center>
         <strong>Date Filipina (all rights reserved) {{ new Date().getFullYear() }}</strong>
        </center>
      </v-col>
    </v-footer> -->
  </div>
</v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted() {
      const user= this.$store.state.user
      this.getUser()
      // if (user != null){
      //   this.$router.push('/dashboard')
      // } else {
      //   console.log("user is null")
      // }
  },
  computed: {
    
  },
  data () {
    return {
      drawer: false,
      user: {},
    }
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
    logout(){
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          alert(err.message);
        });
    },
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
