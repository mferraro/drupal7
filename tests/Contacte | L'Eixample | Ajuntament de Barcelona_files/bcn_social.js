(function ($) {

  var currentLang;

  $(document).ready(function () {
    currentLang = $('html').attr('lang') || $('html').attr('xml:lang') || 'ca';
  });

  function bcn_social_checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  Drupal.behaviors.cdgi = {
    attach: function(context) {

      // Accessibility enter.
      $('.share-button a').click(function(ev) {
        ev.preventDefault();
        if ($(this).parents('.bcn-social').find('.dropdown').is(':visible')) {
          $(this).parents('.bcn-social').find('.dropdown').hide();
          $(this).attr("aria-expanded", "false");
        } else {
          $(this).parents('.bcn-social').find('.dropdown').show();
          $(this).attr("aria-expanded", "true");
        }
      });
      // Accessibility hover.
      $('.bcn-social').hover(
        function() {
          $(this).find('.dropdown').show();
          $(this).find('.share-button a').attr("aria-expanded", "true");
        }, function() {
          $(this).find('.dropdown').hide();
          $(this).find('.share-button a').attr("aria-expanded", "false");
        }
      );
      // Accessibility escape.
      $('.bcn-social').keydown(function(ev) {
        if (event.keyCode == 27) {
          $(this).find('.dropdown').hide();
          $(this).find('.share-button a').attr("aria-expanded", "false").focus();
        }
      });
      
      $('.bcn-social .dropdown li').click(function(ev) {
        var bcn_title = encodeURIComponent($(this).find('a').attr('bcn-title'));
        var bcn_summary = encodeURIComponent($(this).find('a').attr('bcn-summary'));
        var bcn_url = encodeURIComponent($(this).find('a').attr('bcn-url'));
        var bcn_image = encodeURIComponent($(this).find('a').attr('bcn-images'));
        if ($(this).hasClass('facebook-button')) {
          ev.preventDefault();
          var appID = "1856983081260384",
            facebook_picture = '';
          if (bcn_social_checkURL(bcn_image)) {
            facebook_picture = '&picture=<' + bcn_image;
          }
          window.open('https://www.facebook.com/dialog/feed?app_id=' + appID + '&name=' + bcn_title + '&description=' + bcn_summary + '&link=' + bcn_url + facebook_picture + '&display=popup', 'sharer', 'toolbar=0,status=0,width=548,height=325');
        } else if ($(this).hasClass('tweet-button')) {
          ev.preventDefault();
          window.open('https://twitter.com/intent/tweet?url=' + bcn_url + '&text=' + bcn_title + '&lang=' + currentLang,'sharer', 'toolbar=0,status=0,width=548,height=325');
        } else if ($(this).hasClass('whatsapp-button')) {
          ev.preventDefault();
          window.open('https://api.whatsapp.com/send?text=' + bcn_title + ' ' + bcn_url);
        } else if ($(this).hasClass('telegram-button')) {
          ev.preventDefault();
          window.open('https://t.me/share/url?url=' + bcn_url + '&text=' + bcn_title);
        }
      });

    }
  }
  
}(jQuery));
