/**
 * @file
 * bcn_cards js file.
 */

(function ($) {
  Drupal.behaviors.bcn_cards = {
    attach: function (context, settings) {

      var module_url;
      var is_admin_path;

      try {
        module_url = Drupal.bcn_cards.parseDoubleQuotes(settings.bcn_cards.module_url);
        is_admin_path = Drupal.bcn_cards.parseDoubleQuotes(settings.bcn_cards.is_admin_path);
      }
      catch (err) {
        // Default values if something goes wrong.
        module_url = '/';
        is_admin_path = 0;
      }

      var width = jQuery(window).width();

      /*
       * El frontend i el backoffice poden tenir diferents versions de jQuery:
       *
       * Per compatibilitat al backoffice hi acostuma a haver la 1.4.4 que es
       * la que porta per defecte drupal o com a molt la 1.5 per no trencar el
       * funcionament de molts mòduls contribuits.
       *
       * Al frontend en canvi hi ha versions mes superiors gràcies al mòdul
       * jquery_update i com a requeriment de llibreries com ara Bootstrap.
       *
       * Si no fem aquesta distincio el metode .on peta al editar els blocs.
       */
      if (is_admin_path == 1) {
        // Chosen per el select de personal de l'ajuntament (per tenir un filtratge similar a un autocomplete).
        if ($().chosen) {
          $("select.chosen-enable").chosen();
        }
      }
      else {

        // Readmore.js init.
        Drupal.bcn_cards.initialize_readmore_library('body');

        // More info popup.
        $("body").on("click", "a.open-popup-link", function (e) {
          e.preventDefault();

          $("#bcn-cards-popup-info .inner-wrapper *").remove();

          // @see bcn_cards.utils.inc.
          var rem_content = String($(this).attr('data-content'));
          rem_content = rem_content.replace('_SPAN', "<span>");
          rem_content = rem_content.replace('_ENDSPAN', "</span>");
          rem_content = rem_content.replace('_BR', "<br/><br/>");

          jQuery('<p>' + rem_content + '</p>').appendTo("#bcn-cards-popup-info .inner-wrapper");

          if (width < Drupal.bcn_cards.variables.mobile_break) {
            $("#bcn-cards-popup-info").dialog({
              modal: false,
              width: '100%',
              dialogClass: "popup-more-info",
              open: function() {
                Drupal.bcn_cards.change_close_button(".ui-dialog.popup-more-info");
              },
            });

            // Move popup to click location.
            Drupal.bcn_cards.move_element_to_event_position(e, '.ui-dialog.popup-more-info', 250, 240, 0);
          }
          else {
            $("#bcn-cards-popup-info").dialog({
              modal: false,
              width: 250,
              dialogClass: "popup-more-info",
              open: function() {
                Drupal.bcn_cards.change_close_button(".ui-dialog.popup-more-info");
              },
            });

            // Move popup to click location.
            Drupal.bcn_cards.move_element_to_event_position(e, '.ui-dialog.popup-more-info', 250, 240, 1);
          }
        });


        // Agenda accordion.
        if ($().accordion) {
          $(".bcn-cards-accordion").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false,
          });
        }

        // Cards popups from HTML tags.
        $("body").on("click", ".bcn-cards-popup", function (e) {

          // Recuperacio ID usuari.
          var user_id = $(e.target).attr('data-user');
          var loading = Drupal.t('Loading...');

          if (typeof user_id === 'undefined' || !user_id) {
            console.log('BCN_CARDS: Invalid user ID');
          }
          else {

            // Spinner d'espera.
            $("#bcn-cards-popup .inner-wrapper *").remove();
            jQuery('<img class="loading-spinner" width="80" height="80" src="' + module_url + '/img/loading-spinner.gif" alt="' + loading + '"></img>').appendTo("#bcn-cards-popup .inner-wrapper");
            $("#bcn-cards-popup").dialog({
              modal: true,
              // Minima amplada en la que es veu bé.
              width: 80,
              dialogClass: "popup-card-area",
              open: function() {
                // Ens assegurem que l'spinner estigui centrat (workaround per scroll provocat per href=#).
                setTimeout(function(){
                  jQuery("#bcn-cards-popup").dialog({
                    position: { my: "center", at: "center", of: window }
                  });
                }, 500);
                Drupal.bcn_cards.onPopupCardOpen();
              },
              beforeClose: function( event, ui ) {
                Drupal.bcn_cards.beforePopupCardClose();
              },
            });

            $('.popup-card-area .ui-dialog-titlebar').css('display', 'none');

            /*
             * Peticio AJAX al modul per recuperar el codi HTML.
             * IMPORTANT: el pathPrefix conte el prefix amb l'idioma.
             */
            $.ajax({
              method: "POST",
              url: Drupal.settings.basePath + Drupal.settings.pathPrefix + 'popup-data/' + user_id,
            })
              .done(function (results) {
                if (results.length > 1 && results[1].hasOwnProperty('data')) {
                  $("#bcn-cards-popup .inner-wrapper *").remove();
                  if (results[1].data != '0') {
                    jQuery(results[1].data).appendTo("#bcn-cards-popup .inner-wrapper");
                    jQuery('#bcn-cards-popup .inner-wrapper .iframe-wrapper').toggle();

                    if (width < Drupal.bcn_cards.variables.mobile_break) {
                      $("#bcn-cards-popup").dialog({
                        modal: true,
                        width: '100%',
                        height: $(window).height(),
                        dialogClass: "popup-card-area",
                      });
                    }
                    else {
                      $("#bcn-cards-popup").dialog({
                        modal: true,
                        // Minima amplada en la que es veu bé.
                        width: 960,
                        dialogClass: "popup-card-area",
                      });
                    }

                    $('.popup-card-area .ui-dialog-titlebar').css('display', 'inherit');
                  }
                  else {
                    // Tanquem l'spinner d'espera.
                    jQuery('#bcn-cards-popup').dialog("close");
                    // Donem informacio del que ha passat.
                    console.log('BCN_CARDS: Error recieving data');
                  }
                }
              })
              .fail(function () {
                // Tanquem l'spinner d'espera.
                jQuery('#bcn-cards-popup').dialog("close");
              });
          }
        });

        // Cards popup, mail envelope click.
        $("body").on("click", "a.bcn-cards-mail-popup", function (e) {
          jQuery('#bcn-cards-popup .inner-wrapper .iframe-wrapper').toggle();
          if (width < Drupal.bcn_cards.variables.mobile_break) {
            jQuery('#bcn-cards-popup .inner-wrapper .popup-card-mobile').toggle();
          }
          else {
            jQuery('#bcn-cards-popup .inner-wrapper .popup-card').toggle();
          }
          jQuery('#bcn-cards-popup .inner-wrapper .bcn-cards-popup-back').toggle();
        });

        // Cards popup, back button click.
        $("body").on("click", ".bcn-cards-popup-back", function (e) {
          jQuery('#bcn-cards-popup .inner-wrapper .iframe-wrapper').toggle();
          if (width < Drupal.bcn_cards.variables.mobile_break) {
            jQuery('#bcn-cards-popup .inner-wrapper .popup-card-mobile').toggle();
          }
          else {
            jQuery('#bcn-cards-popup .inner-wrapper .popup-card').toggle();
          }
          jQuery('#bcn-cards-popup .inner-wrapper .bcn-cards-popup-back').toggle();
          jQuery('#bcn-cards-popup a.bcn-cards-mail-popup').focus();
        });

        // Standart cards, mail envelope click (opens popup).
        $("body").on("click", "a.bcn-cards-mail-card", function (e) {
          $("#bcn-cards-popup .inner-wrapper *").remove();

          var url_contact = jQuery(this).attr('data-url');
          jQuery('<iframe src="' + url_contact + '" tabindex="2"></iframe>').appendTo("#bcn-cards-popup .inner-wrapper");

          if (width < Drupal.bcn_cards.variables.mobile_break) {
            $("#bcn-cards-popup").dialog({
              modal: true,
              width: '100%',
              height: $(window).height(),
              dialogClass: "popup-contact-form",
              open: function() {
                $('.ui-widget-overlay').addClass('bcn-cards-overlay');
                Drupal.bcn_cards.change_close_button(".ui-dialog.popup-contact-form");
                Drupal.bcn_cards.openDialogAccessibilityHandle();
                /*
                 * Ens assegurem que l'iframe s'hagi carregat completament
                 * (el dialog no es centra automaticament com fa per defecte
                 * perquè al moment d'obrir-se no coneix les dimensions finals
                 * que tindrà).
                 */
                setTimeout(function(){
                  jQuery("#bcn-cards-popup").dialog({
                    position: { my: "center", at: "center", of: window }
                  });
                }, 500);
              },
              beforeClose: function( event, ui ) {
                Drupal.bcn_cards.closeDialogAccessibilityHandle();
              },
            });
          }
          else {
            $("#bcn-cards-popup").dialog({
              modal: true,
              // Minima amplada en la que es veu bé.
              width: 960,
              dialogClass: "popup-contact-form",
              open: function() {
                $('.ui-widget-overlay').addClass('bcn-cards-overlay');
                Drupal.bcn_cards.change_close_button(".ui-dialog.popup-contact-form");
                Drupal.bcn_cards.openDialogAccessibilityHandle();
                /*
                 * Ens assegurem que l'iframe s'hagi carregat completament
                 * (el dialog no es centra automaticament com fa per defecte
                 * perquè al moment d'obrir-se no coneix les dimensions finals
                 * que tindrà).
                 */
                setTimeout(function(){
                  jQuery("#bcn-cards-popup").dialog({
                    position: { my: "center", at: "center", of: window }
                  });
                }, 500);
              },
              beforeClose: function( event, ui ) {
                Drupal.bcn_cards.closeDialogAccessibilityHandle();
              },
            });
          }

        });

        // Consellers de districte: ocultar/mostrar el personal de cada header.
        $("a.visibility-switch").on("click", function (e) {
          $(this).closest('.content-hiddable').find('.header-wrapper').toggle();
          $(this).find('span').toggle();

          /*
           * Cal activar el readmore de les fitxes del districte actual perque
           * amb la crida inicial no es suficient al estar ocultes.
           */
          Drupal.bcn_cards.initialize_readmore_library('#' + $(this).parent().attr('id'));
        });
      }
    }
  };
})(jQuery);

/**
 * Cards popups: insertem el DIV a on es posara el contingut dels popups.
 */
jQuery(document).ready(function() {
  var width = jQuery(window).width();
  var classe = '';

  if (width < Drupal.bcn_cards.variables.mobile_break) {
    classe = 'mobile';
  }
  else {
    classe = '';
  }

  // Es posa en dos DIV diferents perquè dins d'una popup card tambe hi ha info.
  jQuery('<div id="bcn-cards-popup" aria-live="polite" class="' + classe + '" title="Càrrec públic"><div class="inner-wrapper"></div></div>').appendTo("body");
  jQuery('<div id="bcn-cards-popup-info" aria-live="polite" class="' + classe + '" title="Informació"><div class="inner-wrapper"></div></div>').appendTo("body");
});

/**
 * Attach utility functions.
 */
Drupal.bcn_cards = Drupal.bcn_cards || {};

/**
 * Initialize variable array.
 */
Drupal.bcn_cards.variables = {mobile_break:980, fullscreen: 0};

/**
 * Parses double quotes.
 */
Drupal.bcn_cards.parseDoubleQuotes = function (configuration) {

  var str = String(configuration);

  // Erase first " character.
  str = str.replace('"', "");
  // Erase second " character.
  str = str.replace('"', "");

  return str;
};

/**
 * HTML5 fullscreen or jQuery UI dialog if not available.
 *
 * IMPORTANT: el mode fullscreen es permet activar nomes a peticio del usuari
 * per motius de seguretat. Si no ho fem aixi surt aquest missatge d'error:
 * Failed to execute 'requestFullscreen' on 'Element': API can only be initiated
 * by a user gesture.
 */
Drupal.bcn_cards.full_screen_toggle = function () {
  if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
    if (Drupal.bcn_cards.variables.fullscreen == 0) {
      Drupal.bcn_cards.open_full_screen();
      Drupal.bcn_cards.variables.fullscreen = 1;
      jQuery('.popup-toggle-fullscreen').removeClass('bcn-icon-maximitzar');
      jQuery('.popup-toggle-fullscreen').addClass('bcn-icon-minimitzar');
    }
    else {
      Drupal.bcn_cards.close_full_screen();
      Drupal.bcn_cards.variables.fullscreen = 0;
      jQuery('.popup-toggle-fullscreen').removeClass('bcn-icon-minimitzar');
      jQuery('.popup-toggle-fullscreen').addClass('bcn-icon-maximitzar');
    }
  }
};

/**
 * Open the HTML5 fullscreen.
 */
Drupal.bcn_cards.open_full_screen = function () {
  var popup = document.getElementById('bcn-cards-popup');

  if (popup.requestFullscreen) {
    popup.requestFullscreen();
  }
  else if (popup.msRequestFullscreen) {
    popup.msRequestFullscreen();
  }
  else if (popup.mozRequestFullScreen) {
    popup.mozRequestFullScreen();
  }
  else if (popup.webkitRequestFullscreen) {
    popup.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  }
};

/**
 * Close the HTML5 fullscreen.
 */
Drupal.bcn_cards.close_full_screen = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
  else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

/**
 * Replace UI Dialog button icon with ajuntament BCN one.
 *
 * @param string popup_main_selector
 *  Selector pare del popup: .ui-dialog + el que hem especificat a la propietat dialogClass.
 */
Drupal.bcn_cards.change_close_button = function (popup_main_selector) {
  if (jQuery(popup_main_selector + ' button.ui-dialog-titlebar-close .bcn-icon-tancar-bold').length <= 0) {
    jQuery(popup_main_selector + ' button.ui-dialog-titlebar-close span').remove();
    jQuery('<span class="bcn-icon-tancar-bold" aria-label="' + Drupal.t('Close') + '" tabindex="3"></span>').appendTo(popup_main_selector + ' button.ui-dialog-titlebar-close');
  }
}

/**
 * Initialize readmore.js library.
 *
 * @param string selector_pare.
 *   Selector pare per evitar invocacions dobles de la llibreria.
 */
Drupal.bcn_cards.initialize_readmore_library = function (selector_pare) {
  // Preparacio offscreen per els lectors de pantalla.
  var offscreen = '<span class="offscreen"></span>';

  // Readmore.js plantilla 0.
  try {
    jQuery(selector_pare + ' .list-transp-maxims .readmore-wrapper').readmore({
      speed: 75,
      collapsedHeight: 48,
      lessLink: '<a href="#" aria-hidden="true">' + Drupal.t('Close') + '&nbsp;<span class="bcn-icon-dalt-light"></span></a>',
      moreLink: '<a href="#" aria-hidden="true">' + Drupal.t('More positions') + '&nbsp;<span class="bcn-icon-baix-light"></span>' + offscreen + '</a>',
    });
  }
  catch(err) {
    console.log(err.message);
  }

  // Readmore.js plantilla 1 (tambe cal inicialitzar quan es fa toggle de header de districte).
  try {
    jQuery(selector_pare + ' .list-transp-districtes .readmore-wrapper').readmore({
      speed: 75,
      collapsedHeight: 0,
      lessLink: '<a href="#" aria-hidden="true">' + Drupal.t('Close') + '&nbsp;<span class="bcn-icon-dalt-light"></span></a>',
      moreLink: '<a href="#" aria-hidden="true">' + Drupal.t('All positions') + '&nbsp;<span class="bcn-icon-baix-light"></span>' + offscreen + '</a>',
    });
  }
  catch(err) {
    console.log(err.message);
  }

  // Readmore.js plantilla 4.
  try {
    jQuery(selector_pare + ' .list-etiqueta-completa .readmore-wrapper').readmore({
      speed: 75,
      collapsedHeight: 58,
      lessLink: '<a href="#" aria-hidden="true">' + Drupal.t('Close') + '&nbsp;<span class="bcn-icon-dalt-light"></span></a>',
      moreLink: '<a href="#" aria-hidden="true">' + Drupal.t('More positions') + '&nbsp;<span class="bcn-icon-baix-light"></span>' + offscreen + '</a>',
    });
  }
  catch(err) {
    console.log(err.message);
  }

  // Readmore.js plantilla 8.
  try {
    jQuery(selector_pare + ' .list-transp-resta-carrecs-multi .readmore-wrapper').readmore({
      speed: 75,
      collapsedHeight: 48,
      lessLink: '<a href="#" aria-hidden="true">' + Drupal.t('Close') + '&nbsp;<span class="bcn-icon-dalt-light"></span></a>',
      moreLink: '<a href="#" aria-hidden="true">' + Drupal.t('More positions') + '&nbsp;<span class="bcn-icon-baix-light"></span>' + offscreen + '</a>',
    });
  }
  catch(err) {
    console.log(err.message);
  }

  // TODO: Cal activar el Readmore.js per el popup?

  // Afegir offscreen per els lectors de pantalla.
  jQuery('.readmore-wrapper').each(function(index) {
    var name = jQuery(this).attr('data-name');
    jQuery(this).next().find('.offscreen').text(name);
  });
}

/**
 * Print all HTML given a selector.
 *
 * Es important escollir be el selector perque la maquetacio sigui correcte.
 */
Drupal.bcn_cards.print = function (selector) {
  jQuery('.popup-card-area').printThis({
    debug: false,
    importCSS: true,
    importStyle: true,
  });
}

/**
 * open event.
 */
Drupal.bcn_cards.onPopupCardOpen = function (event, ui) {
  try {
    jQuery('.ui-widget-overlay').addClass('bcn-cards-overlay');
    Drupal.bcn_cards.change_close_button(".ui-dialog.popup-card-area");
    Drupal.bcn_cards.openDialogAccessibilityHandle();
  }
  catch(err) {
    console.log(err.message);
  }
}

/**
 * beforeClose event.
 */
Drupal.bcn_cards.beforePopupCardClose = function (event, ui) {
  try {
    Drupal.bcn_cards.closeDialogAccessibilityHandle();
    jQuery("#bcn-cards-popup-info").dialog('close');
  }
  catch(err) {
   console.log(err.message);
  }
}

/**
 * Open dialog accessibility.
 */
Drupal.bcn_cards.openDialogAccessibilityHandle = function () {
  jQuery("body>div").each(function() {
    if (!jQuery(this).hasClass('ui-dialog')) {
      jQuery(this).attr('aria-hidden', 'true');
    }
  });
}

/**
 * Close dialog accessibility.
 */
Drupal.bcn_cards.closeDialogAccessibilityHandle = function () {
  jQuery("body>div").each(function() {
    jQuery(this).removeAttr('aria-hidden');
  });
}


/**
 * Moure un objecte DOM a la posicio d'un event de manera que quedi centrat.
 *
 * Si fa falta fer scroll perque es vegi l'element, el fa automaticament.
 *
 * @param object event
 *   Event de ratoli.
 *
 * @param string selector
 *   Selector de jQuery de l'element que volem moure.
 *
 * @param int selected_width
 *   Amplada de l'element que es vol moure.
 *
 * @param int selected_height
 *   Altura de l'element que es vol moure.
 *
 * @param bool move_horizontally
 *   Centrar tambe segons l'eix horitzontal?
 *
 */
Drupal.bcn_cards.move_element_to_event_position = function (event, selector, selected_width, selected_height, move_horizontally) {
  var new_top;
  var new_left;
  var max_width = window.innerWidth;
  var max_height = window.innerHeight;

  var click_offset = jQuery(event.currentTarget).offset();

  if (click_offset.left - selected_width / 2 > 0) {
    // Si la meitat cap a l'esquerra, centrem l'element horitzontalment.
    new_left = click_offset.left - selected_width / 2;
  }
  else {
    // Si no hi cap, posem l'element a partir del click.
    new_left = click_offset.left;
  }

  if (click_offset.top - selected_height / 2 > 0) {
    // Si la meitat cap a dalt, centrem l'element verticalment.
    new_top = click_offset.top - selected_height / 2;
  }
  else {
    // Si no hi cap, posem l'element a partir del click.
    new_top = click_offset.top;
  }

  if (move_horizontally) {

    // No hi ha d'haver scroll horitzonal.
    if (new_left + selected_width > max_width) {
      new_left = click_offset.left - selected_width - 20;
    }

    jQuery(selector).offset({
      top: new_top,
      left: new_left
    });
  }
  else {
    jQuery(selector).offset({
      top: new_top,
    });
  }

  if (new_top + selected_height > max_height) {
    /*
     * Si el click estar tant avall com perque el popup no es vegi sencer,
     * doncs fem scroll al popup.
     */
    jQuery("body").animate({scrollTop: click_offset.top - selected_height}, 1000);
  }
}
