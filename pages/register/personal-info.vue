<template>
  <v-app id="inspire">
    <v-main>
      <v-container
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
                <v-toolbar-title>Personal Info</v-toolbar-title>
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
                    label="First name"
                    name="first_name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="first_name"
                  ></v-text-field>

                  <v-text-field
                    label="Age"
                    name="age"
                    prepend-icon="mdi-account"
                    type="number"
                    v-model="age"
                    required
                  ></v-text-field>

                  <v-select
                    prepend-icon="mdi-account"
                    :items="['male', 'female']"
                    label="Gender"
                    v-model="gender"
                    name="gender"
                  ></v-select>

                  <v-text-field
                    label="Country"
                    name="country"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="country"
                    v-if="gender === 'male'"
                  ></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
    data(){
        return {
            first_name: "",
            age: "",
            gender: "",
            country: "",
        }
    },
    methods: {
        async submit(){

            let isValid = false

            if (this.gender === "female"){
              this.country = "Philippines"
            }

            if(this.first_name === ""){
              alert("First Name field is required")
            } else if(this.age === "") {
              alert("Age field is required")
            } else if(this.gender === "") {
              alert("Gender field is required")
            } else if(this.country === "") {
              alert("Country field is required")
            } else {
              isValid = true
            }

            if (isValid){

              let maxGenderIndex = 0
              await this.$store.dispatch('getMaxGenderIndex', { gender: this.gender })
              .then((users) => {
                maxGenderIndex = users.docs[0].data().indexByGender + 1
              })
              
              const fieldsToUpdate = {
                firstName: this.first_name,
                age: this.age,
                gender: this.gender,
                country: this.country,
                indexByGender: maxGenderIndex,
                registrationStepNumber: 3
              }

              this.$store.dispatch('updatePersonalInfoFields', {
                fields: fieldsToUpdate
              })
              .then(() => {
                this.$router.push('/register/fill-photo')
              })
              .catch(err => {
                alert(err.message);
              });

            }

            

            
            
        }
    }
}
</script>

<style>

</style>