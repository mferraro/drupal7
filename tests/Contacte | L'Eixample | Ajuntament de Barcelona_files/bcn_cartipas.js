(function($) {
    $.fn.bcn_cartipas = function(element) {

        var heightWithNoMoreButton = 800;
        var lang = $('html').attr('lang');
        /*
            TODO: falta la traducció del missatge
        */
        var textViewMore = {
            ca: {
                more: 'Mostra\'n més',
                less: 'Mostra\'n menys'
            },
            es: {
                more: 'Ver más',
                less: 'Ver menos'
            }
        };

        $(".parag-cartipas").each(function() {
            var cartipas = $(this).find('.cartipas');
            var height = cartipas.height();
            var listHeight = cartipas.find('ul.nivell-1').outerHeight();
            var viewMore = $(this).find('.veure-mes');
            if (height < heightWithNoMoreButton) {
                cartipas.height('auto');
                viewMore.hide();
            } else {
                cartipas.css("height", heightWithNoMoreButton);
                viewMore.on('click', function() {
                    var icon = $(this).find('i');
                    if (icon.hasClass('bcn-icon-baix-medium')) {
                        cartipas.animate({ height: listHeight }, 500, function() {
                            $(this).removeAttr('style');
                            viewMore.find('.veure-mes-text').html(textViewMore[lang]['less']);
                            icon.toggleClass('bcn-icon-baix-medium').toggleClass('bcn-icon-dalt-medium');
                        });
                    } else {
                        cartipas.animate({ height: heightWithNoMoreButton }, 500);
                        viewMore.find('.veure-mes-text').html(textViewMore[lang]['more']);
                        icon.toggleClass('bcn-icon-baix-medium').toggleClass('bcn-icon-dalt-medium');
                    }
                    $(this).attr('aria-expanded', $(this).attr('aria-expanded') == 'false' ? 'true' : 'false');
                });

            }
        });
    };

})(jQuery);
