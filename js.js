/* Setup */
$(new ClipboardJS('.js-clipboard'));

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
