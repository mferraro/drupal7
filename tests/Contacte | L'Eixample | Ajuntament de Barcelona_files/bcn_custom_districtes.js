/**
 * @file
 * Javascript behavior for districtes
 */


(function ($) {
  var viewCalendariDistricte;
  Drupal.behaviors.bcn_custom_districtes = {
    attach: function (context, settings) {
      viewCalendariDistricte = $('.view-calendari-de-districte');
      //open/close events list mechanism
      viewCalendariDistricte.find('.open-events').once('districtes', function() {
        $(this).click(function(e) {
          e.preventDefault();
          $('.events-list').addClass('hidden');
          $(this).next().removeClass("hidden");
        });
      });
      viewCalendariDistricte.find('a.tancar-pop-up').once('districtes', function() {
        $(this).click(function(e) {
          e.preventDefault();
          $(this).closest('[class*=calendar-organ-]').removeClass("opened");
          $(this).closest('.mini-day-on').removeClass('event-open');
          if (enterKey) {
            // si venim d'un enter de teclat, forcem el focus
            $(this).closest('[class*=calendar-organ-]').prev().addClass('bcn-focus-accessible').focus();
          }
        });
      });
      //open event
      $('.view-calendari-de-districte.view-display-id-block_1 .organ-name, .view-calendari-de-districte.view-display-id-block_3 .organ-name').once('districtes', function() {
        $(this).click(function(e) {
          var id = $(this).attr('organ');
          var calendarOrgan = $('.calendar-organ-' + id);
          calendarOrgan.addClass("opened");
          $(this).closest('.mini-day-on').addClass('event-open');
          // calendarOrgan.find('a.tancar-pop-up').addClass('bcn-focus-accessible').focus();
          calendarOrgan.find('a.tancar-pop-up').focus();
        });
      });
      //districtes views accordion
      $('.block-bcn-custom-districtes').once('districtes', function() {
        $(this).find('.title-accordion').click(function(e) {
          $view = $(this).next();
          if ($($view).is(":visible")) {
            $($view).slideUp();
          } else {
            $($view).slideDown();
          }
        });
      });
      // prepara tancar event
      prepareCloseEvent();
      prepareCloseEventByKeyboard();
    }
  };
  var tabKey, backwardTabKey, enterKey;
  $(document).ready(function() {
    $('.block-bcn-custom-districtes .view-activitat-organs').hide();
    // // remove view-footer (ES)
    // if ($('#bcn_districtes_double_calendar_wrapper .view-footer').length) {
    //   $('#bcn_districtes_double_calendar_wrapper .view-footer').remove();
    // }
    $(document).on('keydown', function (e) {
      tabKey = e.which == 9 && !e.shiftKey;
      backwardTabKey = (e.which == 9 && e.shiftKey);
      enterKey = e.which == 13;
      setTimeout(function () {
        tabKey = backwardTabKey = enterKey = false;
      }, 100);
    });

    $('.carrec-wrapper').find('.btn.salary').click(function(e){
      $(this).toggleClass('active');

    });
  });

  function prepareCloseEvent() {
    var elem = viewCalendariDistricte.find('.events-list .tancar');
    elem.off('click');
    elem.click(function (e) {
      $(this).closest('.events-list').addClass("hidden").removeClass("opened");
      $(this).closest('.mini-day-on').removeClass('event-open');
      // forcem el focus
      // $(this).closest('.mini-day-on').find('a.open-events').addClass('bcn-focus-accessible').focus();
       $(this).closest('.mini-day-on').find('a.open-events').focus();
    });
  }

  function prepareCloseEventByKeyboard () {
    var eventList = $('a.organ-name, i.tancar');
    eventList.off('blur');
    eventList.blur(function (e) {
      if (enterKey) {
        return;
      }
      var curr = $(e.currentTarget);
      var tanca_backward = curr.hasClass('tancar') && backwardTabKey;
      var tanca_ultim = curr.hasClass('organ-name') && tabKey && $(e.currentTarget).parent().find('.organ-name').last()[0] == e.currentTarget;
      if (tanca_backward || tanca_ultim) {
        curr.closest('.events-list').find('.tancar').click();
      }
    });
    var organEvent = $('a.tancar-pop-up, .field-type-file .field-item a');
    organEvent.off('blur');
    organEvent.blur(function (e) {
      var curr = $(e.currentTarget);
      var parentLink = curr.closest('.opened').prev();
      if (enterKey) {
        return;
      }
      if ((curr.hasClass('tancar-pop-up') && backwardTabKey) || (curr.closest('.group-content').find('.field-type-file').length == 0 && tabKey)) {
        curr.click();
        parentLink.addClass('bcn-focus-accessible').focus();
      } else if (e.currentTarget == curr.closest('.group-content').find('.field-type-file .field-item a').last()[0] && backwardTabKey) {
        curr.closest('.group-content').find('a.tancar-pop-up').click();
        parentLink.addClass('bcn-focus-accessible').focus();
      }
    });
  }
}( jQuery ));
