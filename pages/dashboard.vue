<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Date Filipina Web App</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-chat</v-icon>
      </v-btn>

      <v-btn @click="logout" icon>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-toolbar>
    <br>
    <h1>Welcome {{ $store.state.user.firstName }} - {{ $store.state.user.email }}</h1>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >

      <v-flex d-flex>
        <v-layout wrap>
            <v-flex md2 v-for="user in dashboardUsers" :key="user.id">
                <v-card
                  class="mx-auto"
                  style="marginBottom: 25px; marginRight: 5px; marginLeft: 5px;"
                >

                <!-- comment out image loading temporarily - mahina internet ko -->
                <!--  -->
                  <v-img
                    v-bind:src="user.userProfileMainImageUrl"
                    height="400px"
                    @click="viewUser(user)"
                  ></v-img>

                  <v-card-title>
                    {{ user.firstName }}
                  </v-card-title>

                  <v-card-subtitle>
                    Age: {{ user.age }}
                  </v-card-subtitle>

                  <v-card-actions>
                    <v-btn @click="chatUser(user)">Chat</v-btn>

                    <v-btn
                      
                    >
                      Like
                    </v-btn>

                    <v-spacer></v-spacer>
                    
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>

                      <v-card-text>
                        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
            </v-flex>
        </v-layout>
      </v-flex>
      <center>
<v-btn @click="reloadUsers" x-large color="success" dark>Get another batch</v-btn>
      </center>
  </v-container>
      </v-main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods:{
    
  },
  data(){
    return {
      firstName: '',
      dashboardUsers: [],
      dashboardUsersUid: []
    }
  },
  created(){
    this.getDashboardUsers()
    this.dashboardUsers = this.$store.state.dashboardUsers
  },
  methods:{
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

    reloadUsers(){
      this.getDashboardUsers()
    },

    viewUser(user){
      console.log(user)
      this.$store.dispatch("setSelectedUser", { user: user })
      this.$router.push({
          path: 'user/' + user.uid
      })
    },

    chatUser(user){
      console.log(user)
      this.$store.dispatch("setSelectedUser", { user: user })
      this.$router.push({
          path: 'chat/' + user.uid
      })
    },

    getDashboardUsers(){
      this.$store.dispatch("getFeaturedUsers")
    }
  }
}
</script>

<style>

</style>