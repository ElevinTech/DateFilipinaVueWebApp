<template>
      <!-- <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn style="width: 100%" @click="login" color="primary">Login</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn style="width: 100%" @click="loginUsingGoogle" >Login using google</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container> -->
    <v-container fill-height>
      <v-row>
          <v-col cols="12" sm="8" md="6" lg="5">
            
            <v-card align="center" class="text-center px-4">
              
              <v-responsive class="pt-4">
                <v-avatar size="100">
                  <img src="https://lh3.googleusercontent.com/LnmfqNG7ftI3oJPkEepH4LCYEGAR6BpoVbvHzMrSAClfSiNBmiiBhCqRpTUTR045lw=s180-rw"/>
                </v-avatar>
              </v-responsive>
              <v-card-title class="text-h4 justify-center mb-1">Connect with filipinas</v-card-title>
              <v-card-subtitle class="text-h5">The highest response rate you've ever experienced</v-card-subtitle>
              <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nesciunt perspiciatis labore consectetur dolorem molestiae culpa voluptatibus repudiandae? Debitis, minima dignissimos dolorem in eligendi magnam tempore nobis eaque ipsum voluptate.</v-card-text>
              <v-card-actions>

              <v-row>
                <v-col>
                  <v-form>
                    <v-text-field
                      label="Login"
                      name="email"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="password"
                    ></v-text-field>

                    <v-btn block class="mb-2" large color="primary" @click="login">Login</v-btn>
                    <v-btn block large @click="loginUsingGoogle">
                      <v-icon left>mdi-google</v-icon>
                      Login Using Google
                    </v-btn>
                  </v-form>
                  
                  
                </v-col>


              </v-row>


              </v-card-actions>
              
              <v-card-text align="center" class="text-caption">By signing in you agree to our Terms and Privacy Policy</v-card-text>



            </v-card>

            <!-- <v-btn block>puta</v-btn> -->

          </v-col>

      </v-row>
    </v-container>

</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
  layout: 'login',
  data() {
    return {
      email: "",
      password: "",
      thisComponent: this
    };
  },
  props: {
  },
  components: {

  },
  mounted(){
    this.checkIfLoggedIn()
    
  },
  methods: {
    login(){

      this.$store
        .dispatch("signInWithEmail", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.email = "";
          this.password = "";

          this.$router.push('/dashboard')
        })
        .catch(err => {
          alert(err.message);
        });

    },

    loginUsingGoogle(){
      var thisComponent = this

      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        
        // The signed-in user info.
        var user = result.user;

        // Check if first time user
        thisComponent.$store.dispatch("getUserById", {id: user.uid}).then(user => {

              // new user
              if(!user.data()){
                this.$router.push('/register/personal-info')
              } 
              
              // existing user
              else {
                this.$router.push('/dashboard')
              }


        }, error =>{
          console.error("Got nothing from server. Prompt user to check internet connection and try again")
        })

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },

    checkIfLoggedIn(){
      const userID = this.$store.getters.uid
      
      if(userID != ""){
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style>
  body{
      background-image: url(https://s1.1zoom.me/b5761/146/Asian_Swing_Dress_517073_1920x1080.jpg);
      background-size: cover;
  }
    
  .v-application {
    background: none !important;
  }
</style>