(function($) {
  $.fn.bcn_submenu = function(element) {

    //****************************
    // scripts submenu central
    //****************************

    if($(window).width() < 767){
      if($("#sub-menu-wrapper .menu li a.active").length > 0){
        $("#sub-menu-wrapper .menu").prepend("<li>"+$("#sub-menu-wrapper .menu li a.active").parent().html()+"</li>");
      }
      $(".block-menu-central .menu li:first, #button-sub").click(function(e){
        e.preventDefault();
        $("#button-sub").toggleClass("active");
        $("#sub-menu-wrapper .menu li:first").toggleClass("active-item");
        $("#sub-menu-wrapper .menu li:not(:first)").slideToggle();
      });
    } else {
            //Set #page-header's height.
            $('#page-header').height($('#sub-menu-wrapper').height());
        }

    //**********************************
    // scripts attach block benvinguda
    //**********************************

    $(".menu-attach-block-wrapper").each(function(e){
      $parent = $(this).closest('li');
      $(this).prependTo($(this).closest(".mega-dropdown-menu"));

      //remove the parent li
      $parent.remove();
    });

  };
})(jQuery);
