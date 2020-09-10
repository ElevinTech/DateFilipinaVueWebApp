<template>
  <v-container>
    <h1>Likes Page</h1>

    <center>
        <h2>{{ likeCount }} users have liked you!</h2>

        <br>

        <ul>
            <li v-for="like in likesList" :key="like.user">

                <span>uid: {{ like.user }}</span>

            </li>
        </ul>
    </center>



    


  </v-container>
</template>

<script>
export default {
    data(){
        return {
            likesList: [],
            likeCount: 0
        }
    },    
    mounted(){
        this.getLikes()
    },
    methods:{
        getLikes(){
            this.$store
              .dispatch("getLikes")
              .then(result => {

                    this.likeCount = result.docs.length

                    result.docs.forEach(user =>{
                        
                        this.likesList.push(user.data())
                        // console.log(user.data())
                    });
              });
        }
    }
}
</script>

<style>

</style>