<template>
  <div>
    <h1>Inspire Page</h1>
    <button @click="logout">Log out</button>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      this.$store.dispatch("signOut")
      .then(() => {
        alert("logging out bois")
        this.$router.push("/")
      }).catch(err => {
        alert(err.message);
      });
    }
  }
}
</script>

<style>

</style>