<template>
  <div>
      <h1>One Year Subscription</h1>

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
              'plan_id': 'P-5KD79397TH5210521L5HVVKI'
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