<template>
  <v-container>
    <h1>Views Page</h1>

    <center>
        <h2>{{ viewCount }} users have visited you!</h2>

        <br>

        <ul>
            <li v-for="view in viewsList" :key="view.user">

                <span>uid: {{ view.user }}</span>

            </li>
        </ul>
    </center>



    


  </v-container>
</template>

<script>
export default {
    data(){
        return {
            viewsList: [],
            viewCount: 0
        }
    },    
    mounted(){
        this.getViews()
    },
    methods:{
        getViews(){
            this.$store
              .dispatch("getViews")
              .then(result => {

                    this.viewCount = result.docs.length

                    result.docs.forEach(user =>{
                        
                        this.viewsList.push(user.data())
                        // console.log(user.data())
                    });
              });
        }
    }
}
</script>

<style>

</style>