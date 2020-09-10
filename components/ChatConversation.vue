<template>
  <h1>Chat Conversation</h1>
</template>

<script>
export default {
  data() {
    return {
      otherUser: this.$store.state.selectedUser,
      currentUser: this.$store.state.user,
      chatConversation: []
    };
  },
  methods:{

  },
  mounted(){
      // console.log("otherUser")
      // console.log(this.otherUser)

      // console.log("------------")

      // console.log("currentUser")
      // console.log(this.currentUser)

      var getChatConversation = this.$store.dispatch("getChatConversation", {userOne: "03bPCThAGkdMTcNovBJDa3U3kwA2", userTwo: "0qetOd2ZqiT9YywFuxE9DHUx1az2"})

      getChatConversation.then(chatConversations => {
                
                chatConversations.docs.forEach(chatConversation => 
                  console.log(chatConversation.data())
                );

              }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
              })


  }
}
</script>

<style>

</style>