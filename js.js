/* MODAL */
$('#cryptoModal').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var name = button.data('name');
  var imgSrc = 'images/qrs/' + name + '.png';
  var address = button.data('address');

  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('#crypto-name').text('Donate ' + name);
  modal.find('#crypto-address').text(address);
  document.getElementById("crypto-qr").src = imgSrc;
})

/* STRIPE*/
// Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
var PUBLISHABLE_KEY = "pk_live_jilCfw3IDHJ03XXqnNmEgEkf";
// Replace with the domain you want your users to be redirected back to after payment
var DOMAIN = location.href.replace(/[^/]*$/, "");


var stripe = Stripe(PUBLISHABLE_KEY);

// Handle any errors from Checkout
var handleResult = function(result) {
  if (result.error) {
    var displayError = document.getElementById("error-message");
    displayError.textContent = result.error.message;
  }
};

document.querySelectorAll('.js-btn-stripe').forEach(function(button) {
  button.addEventListener("click", function(e) {
    var skuId = e.target.dataset.skuId;
    var planId = e.target.dataset.planId;
    var items = skuId
      ? [{ sku: skuId, quantity: 1 }]
      : [{ plan: planId, quantity: 1 }];

    // Make the call to Stripe.js to redirect to the checkout page
    // with the sku or plan ID.
    stripe
      .redirectToCheckout({
        items: items,
        successUrl:
          DOMAIN + "success.html?session_id={CHECKOUT_SESSION_ID}",
        cancelUrl:
          DOMAIN + "canceled.html?session_id={CHECKOUT_SESSION_ID}"
      })
      .then(handleResult);
  });
});