(function($) {

    $.fn.sitemap = function() {
        sitemap();
    }

    function sitemap() {
        if ($("#site-map").length) {
            $("#site-map a").each(function(e) {
                var href = $(this).attr("href");
                if (href.indexOf('megamenu') !== -1) {
                    $(this).closest('li').hide();
                } else if (href.indexOf('nolink') !== -1)  {
                    $(this).replaceWith($('<span>' + this.innerHTML + '</span>'));
                }
            })
            $("#site-map .site-map-menu .site-map-menu .site-map-menu li.last").each(function(e) {
                var height = $(this).height();
                var ulHeight = $(this).closest('ul').height();
                $(this).closest('ul').addClass("tallat");
                $(this).closest('ul').css('height', ulHeight - height);
                $(this).closest('ul').css('margin-bottom', height + 15);
            });
        }
    }

})(jQuery);