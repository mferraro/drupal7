(function($) {
  $.fn.bcn_carrousel_links = function(element) {

    container = element || bcn_context;

    if($(container).find(".carrousel-links-list").length){

      $(container).find(".carrousel-links-list").each(function(){
        $elem = '#'+$(this).attr('id');
        $num = parseInt($(this).attr('data-mostrar'));
        $($elem).owlCarousel({
          loop:false,
          margin:30,
          nav:true,
          navRewind:false,
          navText: [Drupal.t('Previous links'),Drupal.t('Next links')],

          responsive:{
            0:{
              items:1,

            },
            767:{
              items:2,

            },
            970:{
              items:$num,
            }
          }
        });//owlcarousel



      });

    }


};


})(jQuery);
