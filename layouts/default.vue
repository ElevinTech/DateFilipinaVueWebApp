<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
      const user= this.$store.state.user

      if (user != null){
        this.$router.push('/dashboard')
      } else {
        console.log("user is null")
      }
  },
  computed: {
    
  },
  data () {
    return {
      
    }
  }
}
</script>
