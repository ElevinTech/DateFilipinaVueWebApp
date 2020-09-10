<!-- configure nuxt.config.js file, uncomment sandbox script -->

<template>
  <div>
      <h1>Sandbox Test Subscription</h1>

        <br>
        <br>

        <center>
          
        <!-- smart subscribe -->
        <!-- <div id="paypal-button-container"></div> -->

        <!-- classic subscribe -->
        <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="5LWMBUWRFVZVU">
        <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
        </form>



        <!-- Test buy button -->
        <!-- <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="GQNNYZSTY3KLL">
        <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
        </form> -->



      </center>

  </div>
</template>



<script>
export default {
    mounted(){
      paypal.Buttons({
          style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'subscribe',
              
          },
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              'plan_id': 'P-50E86381GY448092ML5KOR6Q'
            });
          },
          onApprove: function(data, actions) {
            alert(data.subscriptionID);
          }
      }).render('#paypal-button-container');
    }

}
</script>

<style>

</style>