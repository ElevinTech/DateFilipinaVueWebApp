<template>
  <div v-if="stripeSession">
      <h1>Subscribe Page</h1>
<!-- 
      <v-btn to="/subscribe/one-month" nuxt>1 month</v-btn>

      <v-btn to="/subscribe/three-months" nuxt>3 month</v-btn>

      <v-btn to="/subscribe/twelve-months" nuxt>12 month</v-btn> -->

      <div class="center">

        <div class="property-card" @click="checkout()">
          <a href="#">
            <div class="property-image">
              <div class="property-image-title">
                <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. -->
              </div>
            </div></a>
          <div class="property-description">
            <h5> Basic Plan </h5>
            <h6>$9.99 / month</h6>
            <br>
            <p>Lorem Ipsum Dipsum hortata. Mixcall Horcho. Mixwell Chingo. More Bingo. Lorem Ipum doth be hard.</p>
          </div>
          <a href="#">
            <div class="property-social-icons">
              <!-- I would usually put multipe divs inside here set to flex. Some people might use Ul li. Multiple Solutions -->
            </div>
          </a>
        </div>

        <div class="property-card">
          <a href="#">
            <div class="property-image">
              <div class="property-image-title">
                <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. -->
              </div>
            </div></a>
          <div class="property-description">
            <h5> Gold Plan </h5>
            <h6> $25 for 3 months </h6>
            <br>
            <p>Lorem Ipsum Dipsum hortata. Mixcall Horcho. Mixwell Chingo. More Bingo. Lorem Ipum doth be hard.</p>
          </div>
          <a href="#">
            <div class="property-social-icons">
              <!-- I would usually put multipe divs inside here set to flex. Some people might use Ul li. Multiple Solutions -->
            </div>
          </a>
        </div>

        <div class="property-card">
          <a href="#">
            <div class="property-image">
              <div class="property-image-title">
                <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. -->
              </div>
            </div></a>
          <div class="property-description">
            <h5> Platinum Plan </h5>
            <h6> $85 for 1 year </h6>
            <br>
            <p>Lorem Ipsum Dipsum hortata. Mixcall Horcho. Mixwell Chingo. More Bingo. Lorem Ipum doth be hard.</p>
          </div>
          <a href="#">
            <div class="property-social-icons">
              <!-- I would usually put multipe divs inside here set to flex. Some people might use Ul li. Multiple Solutions -->
            </div>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
import { functions } from '~/plugins/firebase.js'

export default {
  data(){
    return {
      stripeSession: null
    }
  },
  methods:{
    createStripeSession(){
      var getFeaturedUsers = functions.httpsCallable('createStripeSession');
      getFeaturedUsers({}).then(session => {
                
                this.stripeSession = session.data
                console.log(session.data)
              }, error =>{
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
              })
    },
    checkout(){
      var stripe = Stripe('pk_test_51HOoYuCeUV8ZnzYh9eLMSPq3cmHGyASGOA26374bz0vEdO5ZMCf5ECNQHdnBcNIQpgm3d1liqMDquLbJWhBIFmyu00mRIwrTYh');
      stripe.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as argument here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: this.stripeSession.id
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
    }
  },
  created(){
    this.createStripeSession()
  }
}
</script>

<style>
body
{
  background-color:#f2f2f2;
  font-family: 'RobotoDraft', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
}

*
{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

h5
{
  margin:0px;
  font-size:1.4em;
  font-weight:700;
}

p
{
  font-size:12px;
}

.center
{
  /* height:100vh; */
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* End Non-Essential  */

.property-card
{
  margin-left: 5px;
  margin-right: 5px;
  height:18em;
  width:14em;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
  -ms-flex-direction:column;
  flex-direction:column;
  position:relative;
  -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius:16px;
  overflow:hidden;
  -webkit-box-shadow:  15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
  box-shadow:  15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
}
/* ^-- The margin bottom is necessary for the drop shadow otherwise it gets clipped in certain cases. */

/* Top Half of card, image. */

.property-image
{
  height:6em;
  width:14em;
  padding:1em 2em;
  position:Absolute;
  top:0px;
  -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  background-image:url('https://cdn.photographylife.com/wp-content/uploads/2017/01/What-is-landscape-photography.jpg');
  background-size:cover;
  background-repeat:no-repeat;
}

/* Bottom Card Section */

.property-description
{
  background-color: #FAFAFC;
  height:12em;
  width:14em;
  position:absolute;
  bottom:0em;
  -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0.5em 1em;
  text-align:center;
}

/* Social Icons */

.property-social-icons
{
  width:1em;
  height:1em;
  background-color:black;
  position:absolute;
  bottom:1em;
  left:1em;
  -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* Property Cards Hover States */

.property-card:hover .property-description
{
  height:0em;
  padding:0px 1em;
}
.property-card:hover .property-image
{
  height:18em;
}

.property-card:hover .property-social-icons
{
  background-color:white;
}

.property-card:hover .property-social-icons:hover
{
  background-color:blue;
  cursor:pointer;
}


/* Optional

.property-image-title
{
text-align:center;
position:Relative;
top:30%;
opacity:0;
transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
color:black;
font-size:1.2em;
}

.property-card:hover .property-image-title
{
opacity:1;
}

*/
</style>