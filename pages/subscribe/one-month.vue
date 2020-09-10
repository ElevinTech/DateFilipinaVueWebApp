<template>
  <div>
      <h1>One Month Subscription</h1>

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
              'plan_id': 'P-45654886T4886792PL5GO3NA'
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