(function($) {
  $.fn.bcn_img_promocional = function(element) {
    $('.parag-img-promocional').find('.img-provisional').each(function(i) {
      if($(window).width() < 768){
        $(this).attr('src', $(this).attr('data-mobile'));
      }else{
        $(this).attr('src', $(this).attr('data-screen'));
      }
    });
    $('.parag-img-promocional-full-width').find('.img-provisional').each(function(i) {
      if($(window).width() < 768){
        $(this).attr('src', $(this).attr('data-mobile'));
      }else if ($(window).width() < 1141) {
        $(this).attr('src', $(this).attr('data-tablet'));
      } else {
        $(this).attr('src', $(this).attr('data-screen'));
      }
    });
  };
})(jQuery);

