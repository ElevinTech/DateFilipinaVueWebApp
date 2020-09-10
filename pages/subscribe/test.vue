<template>
  <div>
      <h1>Test Subscription</h1>

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
              'plan_id': 'P-2N8936802W463273AL5G7HTY'
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