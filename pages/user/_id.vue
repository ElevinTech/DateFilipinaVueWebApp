<template >
  <v-container class="grey lighten-5" v-if="otherUser">

    <v-row>
      <v-col cols="12" sm="12">
        <h1>User Page</h1>
      </v-col>
    </v-row>

    <v-row>

      <v-col cols="12" sm="4">
        <v-card
          class="pa-12"
          outlined
          tile
        >

        <!-- v-bind:src="otherUser.userProfileMainImageUrl" -->
          <v-img
            
            height="600px"
          ></v-img>
        
        </v-card>

        

      </v-col>

      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <h1>{{ otherUser.firstName }}</h1>
          <h2>{{ otherUser.age }}</h2>

          <br>

            <div v-for="(value, name) in otherUser.personalInfo"  v-bind:key="value.id">
              {{ name }}: {{ value }}
            </div>


          

        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >

        <v-btn @click="likeUser()">Like</v-btn>
        <v-btn @click="chatUser()">Chat</v-btn>
        </v-card>
      </v-col>


    </v-row>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      uid: this.$route.params.id,
      otherUser: this.$store.state.selectedUser,
      currentUser: this.$store.state.user
    };
  },
  methods:{
    getUser(){
      
    },
    chatUser(){
        // console.log(this.user)
        // this.$store.dispatch("setSelectedUser", { user: user })
        this.$router.replace({
            path: '../chat/' + this.otherUser.uid
        })
    },
    likeUser(){
      this.$store.dispatch("likeUser", {currentUser: this.currentUser, otherUser: this.otherUser})
    }

  },
  created(){
    // console.log(this.user)
    // var getUser = this.$store.dispatch("getUserById", {id: this.uid})

    // getUser.then(user => {
    //           this.user = user.data()
    //         }, error =>{
    //           console.error("Got nothing from server. Prompt user to check internet connection and try again")
    //         })
    
  },

}
</script>

<style>

</style>