(function () {
  jQuery(document).ready(function($){
    var langs = Drupal.settings.bcn_brand.langs,
      hooked = $('nav.lang ul').attr('hooked'),
      alter = Drupal.settings.bcn_brand.alter;
    // Check if other module like bcn news or bcn guide has changed the url.
    // and in this case don't modify actual links.
    if (!hooked) {
      // Set attribute alter.
      $('nav.lang ul').attr('hooked', alter);
      // Set links to brand links.
      $.each(langs, function(index, value) {
        $('nav.lang ul li a').each(function() {
          if($(this).attr('lang') === index) {
            if(value == 'not-translated') {
              //
              $(this).parent().remove();
            } else {
              $(this).attr('href', value);
            }
          }
        });
      });
    }
  });
})();