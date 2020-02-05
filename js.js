/* Setup */
$(new ClipboardJS('.js-clipboard'));

// Read param
var urlParams = new URLSearchParams(window.location.search);
var pageType = urlParams.get('type');
var closeBtnStr = "<a href=\"/likebots\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></a>";
if (pageType === 'cancel') {
  $('.js-body').prepend(
    "<div class=\"alert alert-danger alert-dismissible fade show mb-n3 fs-18\" role=\"alert\">The payment didn't go through, please try again." + closeBtnStr + "</div>"
  )
}
if (pageType === 'success') {
  $('.js-body').prepend(
    "<div class=\"alert alert-success alert-dismissible fade show mb-n3 fs-18\" role=\"alert\">Thank you for the donation, really appreciate it!" + closeBtnStr + "</div>"
  )
}

/* MODAL */
$('#cryptoModal').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var name = button.data('name');
  var imgSrc = 'images/qrs/' + name + '.png';
  var address = button.data('address');
  var linkName = button.data('link-name');
  var link = [linkName, ':', address].join('');

  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('#crypto-name').text('Donate ' + name);
  modal.find('#crypto-address').text(address);
  modal.find('#crypto-link').attr('href', link);
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
          DOMAIN + "?type=success",
        cancelUrl:
          DOMAIN + "?type=cancel"
      })
      .then(handleResult);
  });
});