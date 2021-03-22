(function($) {
    $.fn.bcn_read_more = function(element) {

      container = element || bcn_context;

      $(container).find(".bcn-read-more").each(function(e) {
          bcn_read_less($(this).closest('.field'));
      });
      $(container).find(".bcn-read-more").click(function(e) {
          e.preventDefault();
          if ($(this).hasClass('open')) {
            bcn_read_less($(this).closest('.field'));
          }else{
            bcn_read_more($(this).closest('.field'));
          }
      });

    function bcn_read_more(target) {
        $('.bcn-read-more', target).addClass('open');
        $('.bcn-read-more span', target).html(Drupal.t('View less'));
        $('.content', target).slideDown();
    }

    function bcn_read_less(target) {
        $('.bcn-read-more', target).removeClass('open');
        $('.bcn-read-more span', target).html(Drupal.t('View more'));
        $('.content', target).slideUp();
    }
  };
})(jQuery);
