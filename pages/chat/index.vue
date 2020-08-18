<template>
  <div v-if="chats">

    <v-toolbar
    color="deep-purple accent-4"
    dark
    >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Chat Page</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
    </v-btn>
    </v-toolbar>

    <v-row>
      <v-col cols="12" sm="3">
        <v-card
        class="mx-auto"
        >

        <v-list subheader>
        <v-subheader>Recent chat</v-subheader>

        <v-list-item
            v-for="item in chats"
            :key="item.createdDate"
            @click="console.log()"
        >
            <v-list-item-avatar style="margin-right: 10px">
            <v-img :src="item.user.userProfileMainImageUrl"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title v-text="item.user.firstName"></v-list-item-title>
            <v-list-item-subtitle v-text="item.message"></v-list-item-subtitle>
            </v-list-item-content>

            <!-- <p>{{item}}</p> -->

            <v-list-item-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-chat</v-icon>
            </v-list-item-icon>
        </v-list-item>
        </v-list>

        <!-- <v-divider></v-divider>

        <v-list subheader>
        <v-subheader>Previous chats</v-subheader>

        <v-list-item
            v-for="item in items2"
            :key="item.title"
            @click="console.log()"
        >
            <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list> -->
        </v-card>
      </v-col>

      <v-col cols="12" sm="9">
        <h1>User Page</h1>
      </v-col>
    </v-row>

    


  </div>
</template>

<script>
export default {
    data(){
        return{
            items: [
                { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
                { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
                { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
                { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
            ],
            chats: []
        }
    },
    created(){
        var getChatList = this.$store.dispatch("getChatList")

        getChatList
            .then(chatList => {
                console.log(chatList)

                this.chats = chatList.data


            }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
            })
    }
}
</script>

<style>

/* getUserChatList */

</style>