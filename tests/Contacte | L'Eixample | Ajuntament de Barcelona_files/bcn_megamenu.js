/**
 * @file
 * Javascript behavior of the megamenu blocks
 */

(function($) { // JavaScript Document
  $(document).ready(function(e) {
    /*
     * We need to limit right overflow of menus
     */
    $('[id^="block-bcn-megamenu"] .mega-dropdown.depth-1, [id^="block-bcn_megamenu"] .mega-dropdown.depth-1' ).on('click.bs.dropdown', function(e) {
      //the rigth side position of the main menu
      if ( $(window).width() >= 768){
        var position = $(this).closest('div[id^="megamenu-collapse-"]').offset().left;
        position += $(this).closest('div[id^="megamenu-collapse-"]').outerWidth();
        //getting megamenu right outer
        var megamenu_right = $(this).offset().left;
        megamenu_right += $(".dropdown-menu", this).outerWidth();
        if (megamenu_right > position){
          //the difference between elements
          var left = megamenu_right - position + 2;
          $(".dropdown-menu", this).css("left", -left);
        }
      }

    });
    //add class to last visible child depth-1
    if ( $(window).width() > 767 ){
      $('[id^="block-bcn-megamenu"] .depth-1:visible:last, [id^="block-bcn_megamenu"] .depth-1:visible:last').addClass('last-sm-child');
    }
    //keyboard accessibility
    $('[id^="block-bcn-megamenu"]').on("keydown", function(e) {
      var focused = $(':focus');
      switch ( e.key ) {
        case "ArrowRight":
          if ( $(focused).closest('.depth-1').is(':last-child') ) {
            $(focused).closest('[id^="block-bcn-megamenu"], [id^="block-bcn_megamenu"]').find('.depth-1:first-child > a, .depth-1:last-child > span').first().focus();
            $(focused).closest('[id^="block-bcn-megamenu"], [id^="block-bcn_megamenu"]').find('.depth-1:first-child > a, .depth-1:last-child > span').first().trigger('click.bs.dropdown');
          }
          $(focused).closest('.depth-1').next().find('> a, > span').first().focus();
          $(focused).closest('.depth-1').next().find('> a, > span').first().trigger('click.bs.dropdown');
          break;
        case "ArrowLeft":
          if ( $(focused).closest('.depth-1').is(':first-child') ) {
            $(focused).closest('[id^="block-bcn-megamenu"], [id^="block-bcn_megamenu"]').find('.depth-1:last-child > a, .depth-1:last-child > span').last().focus();
            $(focused).closest('[id^="block-bcn-megamenu"], [id^="block-bcn_megamenu"]').find('.depth-1:last-child > a, .depth-1:last-child > span').last().trigger('click.bs.dropdown');
          }
          else{
            $(focused).closest('.depth-1').prev().find('> a, > span').first().focus();
            $(focused).closest('.depth-1').prev().find('> a, > span').first().trigger('click.bs.dropdown');
          }
          break;

      }
    });
    $(window).keyup(function (e) {
      if (e.key == "Tab" &&
        $('[id^="block-bcn-megamenu"] .depth-1 > a:focus, [id^="block-bcn_megamenu"] .depth-1 > a:focus').length ||
        $('[id^="block-bcn-megamenu"] .depth-1 > span:focus, [id^="block-bcn_megamenu"] .depth-1 > span:focus').length) {
          $(':focus').trigger('click.bs.dropdown');
      }
    });

    $('.mega-dropdown > a, .mega-dropdown > span').on('click.bs.dropdown hide.bs.dropdown', function(e) {
      $(this).parent('.mega-dropdown').find('.dropdown-menu').removeAttr('aria-hidden');

    });
    $('.mega-dropdown').on('hide.bs.dropdown', function(e) {
      $(this).find('.dropdown-menu').attr('aria-hidden', "true");
    });
    // To add scrollbar on menu
    $('[id^="block-bcn-megamenu"] button.navbar-toggle, [id^="block-bcn_megamenu"] button.navbar-toggle').on('click', function(){
      //e.preventDefault();
      //e.stopPropagation();
      $(".menu-overlay").toggleClass("active");
      $(this).parents().toggleClass("bcn-megamenu-active");
      //$(this).closest('.navbar').find('.collapse').toggleClass('in');

    });

    //hide mobile menu on click
    $('.menu-overlay').on('click', function(e){
      $(this).closest('[id^="block-bcn-megamenu"], [id^="block-bcn_megamenu"]').find('.navbar-toggle').trigger('click');
    });
    $(".bcn-megamenu-active").on("swiperight",function(){
      $('.navbar-toggle').trigger('click');
    });
    //avoid default action and throw slide sub-menu
    $('[id^="block-bcn-megamenu"], [id^="block-bcn_megamenu"]').on('click',
      '.mega-dropdown > a,' +
      '.mega-dropdown > span,' +
      '.dropdown-submenu > a,' +
      '.dropdown-submenu > span', function(e){
      if ($(window).width() < 768){
        e.preventDefault();
        e.stopPropagation();
        var idPanel = bcn_slide_submenu($(this));
        if ( idPanel === false ) {
          return false;
        }
        setTimeout(function(){
          $("#xsmenupanel-" + idPanel).addClass("active");
        }, 1);

      }

    });
    $('[id^="block-bcn-megamenu"], [id^="block-bcn_megamenu"]').on("click", ".xsmenu-tornar", function(e){
      e.preventDefault();
      e.stopPropagation();
      $(this).closest(".xsmenupanel").removeClass("active");
    })
    //wraper for mobile menu
    // if ( $('#overmobile').size() == 0 ){
    //    $("body").wrapInner("<div id='overmobile'></div>");
    //   $("#overmobile").wrapInner("<div id='overmobile-inner'></div>")
    // }


    /*
     * Code by: http://codereview.stackexchange.com/questions/84494/smarter-boostrap-affix
     * we need to use the parent offset because of resizing in a scrolled page
     * causes an incorrect offset.
     */
    var $attribute = $('[data-smart-affix]');
    //si existe submenu central solo se fija el submenu
    if($("#sub-menu-wrapper").length > 0){


      $attribute = $('#sub-menu-wrapper');
    }

    $attribute.each(function(){
      $(this).affix({
        offset: {
          top: $(this).offset().top,
        }
      })
    });
    $(window).on("resize", function(){
      if ( $(window).width() > 767 ){
        $('[id^="block-bcn-megamenu"] .depth-1:visible:last, [id^="block-bcn_megamenu"] .depth-1:visible:last').addClass('last-sm-child');
      }
      //dynamic affix offset
      $attribute.each(function(){
        $(this).data('bs.affix').options.offset = $(this).parent().offset().top;
      });
    });

    //close dropdowns on scroll
    $(document).on("scroll", function(){
      $(this).click();
    });

  }); //document.ready
  //generate slide submenu
  function bcn_slide_submenu( link ) {


    //console.log(link);

    //if the submenu exists
    var attr = $(link).attr("menu-panel");
    if (typeof attr !== typeof undefined && attr !== false) {
      return attr;
    }
    var submenu = null;
    //if submenu is a megamenu or not
    if ( $(link).closest("li").is('depth-1') ) {
      submenu = $(link).closest("li").find(".mega-dropdown-menu").first().clone();
    } else if ( $(link).closest("li").is('[class*="depth-"]') ) {
      submenu = $(link).closest("li").find("ul").first().clone();
    } else {
      return false;
    }


    //console.log(submenu);

    //get blocks
    $blocks = "";
    if ($(link).closest("li").find(".mega-dropdown-menu > .menu-attach-block-wrapper")) {
      $blocks = $(link).closest("li").find(".mega-dropdown-menu > .menu-attach-block-wrapper").clone();
    }
    //get next id (xsmenupanel-x)
    var nid = $('.xsmenupanel').size();
    $(link).attr("menu-panel", nid);
    $(submenu).attr("id" , "xsmenupanel-" + nid);
    $(submenu).addClass("xsmenupanel");
    //get the depth
    var classes = $(link).closest("li").attr("class").split(" ");
    var depth = 0;
    $.each(classes, function(index,classe) {
      if(classe.match("^depth-")){
        depth = classe.substr(classe.length -1);
        return false;
      }
    });
    $(submenu).addClass("xsmenudepth-" + depth);
    //create return link
    var tornar = $(link).closest("li").clone();
    if ( $(tornar).hasClass("depth-1") ) {
      $(".mega-dropdown-menu", tornar).remove();
      $(tornar).attr("class","xsmenu-tornar depth-1");
    } else {
      $(".dropdown-submenu > ul", tornar).remove();
      $(tornar).addClass("xsmenu-tornar");
      $(tornar).removeClass("dropdown-submenu");
    }

    //attack blocks
    $(submenu).prepend($blocks);
    var portada = tornar.clone();
    $(portada).removeClass("xsmenu-tornar");
    $(portada).addClass("xsmenu-portada");
    $(".arrow", tornar).remove();
    $(">a, >span", tornar).prepend('<i class="arrow bcn-icon-esquerra-bold"></i>')
    $("a, span", tornar).removeClass("active-trail");
    $("a, span", tornar).removeClass("active");
    $(tornar).removeClass("active-trail");
    $(tornar).removeClass("active");
    //$("a", portada).html(Drupal.t("Portada"));
    $(".arrow", portada).remove();
    $("a, span", portada).removeAttr("data-toggle");
    $("a, span", portada).removeClass("dropdown-toggle");
    if ( $('>span', portada).lenght == 0 ) {
      $(submenu).prepend(portada);
    }
    $(submenu).prepend(tornar);
    $(link).closest(".nav").append(submenu);







    var primerFill = $(submenu).children().first();
    var href = $(primerFill).children('a');

    if(href.length) {

      var element = primerFill.siblings('li').first();

      if(!element.is('[class*="depth-"]')) {

        var child = element.find('li[class*="depth-"]').first();

        if(child.length) {
          element = child;
        }

      }

      if(!element.length) {
          return nid;
      }

      var classes = element[0].className;

      var clon = primerFill.clone();
      clon.removeClass().addClass(classes);
      clon.find('ul').remove();
      clon.find('i').remove();
      clon.find('a').removeAttr('data-toggle', '');
      clon.find('a').removeAttr('menu-panel', '');
      clon.find('a').removeAttr('class', '');

      primerFill.after(clon);

    }


    return nid;
  }

})(jQuery);
