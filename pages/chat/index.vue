<template>
  <div v-if="chats && userSelf">

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
            @click="getChatConversation(item.fromId, item.toId)"
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
        <div v-if="userOther != null">
            <v-avatar>
            <img
                v-bind:src="userOther.userProfileMainImageUrl"
            >
            </v-avatar>
            <span>{{ userOther.firstName }}</span>
        </div>

        <h1 v-else>Select user to chat with</h1>
        <!-- <ChatConversation /> -->

        <!-- <ul id="example-1">
        <li v-for="item in individualConversation" :key="item.id">
            {{ item.message }}
        </li>
        </ul> -->
        <div>
            <!-- <v-app-bar color="blue" app>
            <v-app-bar-nav-icon>
            <v-icon color="white">mdi-arrow-left</v-icon>    
            </v-app-bar-nav-icon> -->
            <!-- <v-toolbar-title class="white--text">{{user.firstName}} </v-toolbar-title> -->
            <!-- </v-app-bar> -->
            <v-container class="fill-height">
            <v-row class="fill-height pb-14" align="end">
                <v-col>
                <div v-for="(item, index) in individualConversation" :key="index" style="margin-bottom: 10px">

                    <span v-if="item.fromId == userSelf.uid" style="background-color: blue; float: right; padding: 10px; color: white; margin-right: 70px">
                        {{ item.message }}
                    </span>

                    <span v-else style="background-color: red; float: left; padding: 10px; color: white">
                        {{ item.message }}
                    </span>

                    <br>
                    <br>
                    <br>


<!-- 
                    <h1 v-if="awesome">Vue is awesome!</h1>
                    <h1 v-else>Oh no 😢</h1> -->

                    <!-- <span v-if="item.from == 'user'" class="blue--text mr-3">{{ item.msg }}</span>
                    <v-avatar :color="item.from == 'user' ? 'indigo': 'red'" size="36">
                    <span class="white--text">{{ item.from[0] }}</span>
                    </v-avatar>
                    <span v-if="item.from != 'user'" class="blue--text ml-3">{{ item.msg }}</span> -->
                </div>
                </v-col>
            </v-row>
            </v-container>
            <v-container class="ma-0 pa-0">
                <v-row no-gutters>
                <v-col sm="11">

                    <v-text-field v-model="message" placeholder="Type Something" @keypress.enter="sendChat()"></v-text-field>

                </v-col>

                <v-col sm="1">

                    <v-btn icon @click="sendChat()"><v-icon>mdi-send</v-icon></v-btn>

                </v-col>


                </v-row>
            </v-container>
        </div>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import ChatConversation from '../../components/ChatConversation'

export default {
    components: {
        ChatConversation
    },
    data(){
        return{
            userSelf: {},
            items: [
                { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
                { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
                { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
                { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
            ],
            chats: [],
            individualConversation: [],
            userOtherID: "",
            userOther: null,
            message: ""
        }
    },
    created(){
        var getChatList = this.$store.dispatch("getChatList")

        getChatList
            .then(chatList => {
                this.chats = chatList.data
            }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
            })

    },
    mounted(){
        this.getUser()
    },
    // computed: {
    //     currentUser(){
    //         return this.$store.getters.user
    //     }
    // },
    methods:{
        getUser(){
            const userID = this.$store.getters.uid

            var getUser = this.$store.dispatch("getUserById", {id: userID})
            getUser.then(user => {
                        this.userSelf = user.data()
                        this.getDashboardUsers()
                    }, error =>{
                        console.error("Got nothing from server. Prompt user to check internet connection and try again")
                    })
        },
        getChatConversation(userOne, userTwo){
            
            var currentUser = this.userSelf.uid
            var otherUser = ""

            if (userOne == currentUser){
                otherUser = userTwo
            } else{
                otherUser = userOne
            }

            this.userOtherID = otherUser

            var getChatConversation = this.$store.dispatch("getChatConversation", {userOne: currentUser, userTwo: otherUser})
            getChatConversation
                .then(chatConversations => {

                    this.individualConversation = [];
                    chatConversations.docs.reverse().forEach(chatConversation => {
                        this.individualConversation.push(chatConversation.data())
                        this.userOther = chatConversation.data().user
                    });

                }, error =>{
                    console.error("Got nothing from server. Prompt user to check internet connection and try again")
                })
        },

        sendChat(){

            const userSelfID = this.$store.getters.uid
            const userOtherID = this.userOtherID
            const message = this.message

            if (userOtherID == ""){ alert("no user selected") } 
            else if (message == "") { alert("no message typed") }
            else {
                var sendChat = this.$store.dispatch("chat", {message: message, userOne: userSelfID, userTwo: userOtherID})
                sendChat.then(isSuccess => {
                            this.message = ""
                        }, error =>{
                            alert("Got nothing from server. Prompt user to check internet connection and try again")
                        })
            }

        }
    }
}
</script>

<style>

/* getUserChatList */

</style>