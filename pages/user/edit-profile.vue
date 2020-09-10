<template>
  <v-container v-if="user">

    <v-row>
      <v-col cols="12" sm="12">
        <h1>Edit Page</h1>
      </v-col>
    </v-row>

    <v-row>

      <v-col cols="12" sm="4">
        <v-card
          class="pa-12"
          outlined
          tile
        >

          <v-img
            v-bind:src="user.userProfileMainImageUrl"
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
          <h1>{{ user.firstName }}</h1>
          <h2>{{ user.age }}</h2>

          <br>

            <div v-for="(value, name) in user.personalInfo"  v-bind:key="value.id">
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

        <!-- <v-btn @click="likeUser()">Edit Profile</v-btn> -->
        <v-btn to="/user/edit-profile" nuxt>
          Save Changes
        </v-btn>
        <!-- <v-btn @click="chatUser()">Chat</v-btn> -->
        </v-card>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      uid: this.$store.getters.uid,
      user: null
    };
  },
  methods:{
    getUser(){
      var getUser = this.$store.dispatch("getUserById", {id: this.uid})
      getUser.then(user => {
                this.user = user.data()
              }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
              })
    },
  },
  created(){
    this.getUser()
    
  },
}
</script>

<style>

</style>