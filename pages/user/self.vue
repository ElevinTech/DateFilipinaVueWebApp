<template >
  <v-container v-if="user">

    <v-row>

      <!-- Main Profile -->
      <v-col cols="12" sm="4">
       
        <v-card align="center" flat>
          <v-responsive class="">
              <v-avatar size="150">
              <img
                :src="user.userProfileMainImageUrl"
              >
            </v-avatar>
          </v-responsive>

          <v-card-title class="justify-center">{{user.firstName}}, {{user.age}}</v-card-title>
          <v-card-subtitle>{{user.bio}}</v-card-subtitle>
          <v-card-actions class="justify-center">

            <v-btn outlined color="primary" to="/user/edit-profile" nuxt>
              <v-icon left>mdi-cog</v-icon>
              Edit Profile
            </v-btn>
            

          </v-card-actions>
        </v-card>
          

      </v-col>

      <!-- Images -->
      <v-col
        cols="12"
        sm="4"
      >

        <v-card class="pa-2" outlined>
          <v-card-title>Profile Images</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-row class="px-4">
              
              <v-col cols="4" sm="6">
                <v-img aspect-ratio="1" src="https://picsum.photos/500/300?image=15"></v-img>
              </v-col>

              <v-col cols="4" sm="6">
                <v-img aspect-ratio="1" src="https://picsum.photos/500/300?image=15"></v-img>
              </v-col>

              <v-col cols="4" sm="6">
                <v-img aspect-ratio="1" src="https://picsum.photos/500/300?image=15"></v-img>
              </v-col>

              <v-col cols="4" sm="6">
                <v-img aspect-ratio="1" src="https://picsum.photos/500/300?image=15"></v-img>
              </v-col>

              <v-col cols="4" sm="6">
                <v-img aspect-ratio="1" src="https://picsum.photos/500/300?image=15"></v-img>
              </v-col>

              <v-col cols="4" sm="6">
                <v-img aspect-ratio="1" src="https://picsum.photos/500/300?image=15"></v-img>
              </v-col>
            
          </v-row>
        </v-card>

      </v-col>

      <!-- Personal Info -->
      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
        >

        <v-card-title>Personal Info</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <div v-for="(value, name) in user.personalInfo" v-bind:key="value.id" class="mb-2">
              <div class="caption grey--text">{{ name }}</div> 
              <div>{{ value ? value : '-' }}</div>
            </div>
        </v-card-text>

          

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