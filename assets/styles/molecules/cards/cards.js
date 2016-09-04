
// Card expandable content function
function m_card_openTxt(){
  var $textContainer = $(this).closest('.m-card__actions').next('.m-card__expandTxt');
  $(this).toggleClass('m-card__actions__expand--open');
  $textContainer.toggleClass('m-card__expandTxt--open');
}

// Event handler
$(document).ready(function() {
  $(document).on('click', '.m-card__actions__expand', m_card_openTxt);
});
