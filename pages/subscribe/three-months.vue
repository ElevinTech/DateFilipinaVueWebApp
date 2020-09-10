<template>
  <div>
      <h1>Three Months Subscription</h1>

        <br>
        <br>

        <center>
      <div id="paypal-button-container"></div>
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
              'plan_id': 'P-90755801N66740908L5HVUCY'
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