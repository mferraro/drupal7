(function($) {
    $.fn.bcn_grup_destacats = function(element) {

        container = element || bcn_context;

        var destacats_dinamica = $(container).find(".grup-destacats.dinamica");
        var destacats_carrousel = $(container).find(".grup-destacats.carrousel .carrousel-list");
        var classBootstrap = {
            '1': 'col-md-3 col-sm-3 col-xs-12',
            '2': 'col-md-6 col-sm-6 col-xs-12',
        };

        //console.log($(container));

        if (destacats_dinamica.length) {
            var num_mostra = parseInt(destacats_dinamica.attr('data-num'));
            destacats_dinamica.each(function() {
                var sum = 0;
                $(this).find(".destacat").each(function() {
                    var dataValue = $(this).attr("data-value");
                    $(this).parent('.item-destacat').addClass(classBootstrap[dataValue]);
                    sum = sum + parseInt(dataValue);
                    if (sum <= num_mostra) {
                        $(this).show();
                    }
                });
                if (sum > num_mostra) {
                    $(this).find(".veure-mes").show();
                } else {
                    $(this).find(".veure-mes").hide();
                }
            });


            destacats_dinamica.find(".veure-mes").click(function(e) {
                e.preventDefault();
                var sum = 0;
                var veure = $(this);
                var parent = $(this).parent().prev('.node-grup-de-destacats');

                $(parent).find('.destacat:hidden').each(function(i) {
                    if(i==0){
                        $(this).parent('.item-destacat').css('clear','both');
                    }

                    sum = sum + parseInt($(this).attr("data-value"));
                    if (sum <= num_mostra) {
                        $(this).delay(i * 200).fadeIn("slow", function() {
                            console.log('mostra');
                            if ($(this).closest('.grup-destacats.dinamica').find('.destacat:hidden').length < 1) {
                                $(veure).hide();
                                $("html, body").animate({ scrollTop: $(parent).offset().top + $(parent).height() - 550 }, 1200);
                            }
                        });
                    } else {

                        $("html, body").animate({ scrollTop: $(parent).offset().top + $(parent).height() - 155 }, 1200);
                        return false;
                    }
                });

            });
        }

        if (destacats_carrousel.length) {
            destacats_carrousel.find('.item-destacat').each(function() {
                var dataValue = $(this).find(".destacat").attr("data-value");
                $(this).removeClass(classBootstrap[dataValue]);
                $(this).attr('data-merge', dataValue);
                //$(this).attr('tabindex', 0);
            });

            destacats_carrousel.on('changed.owl.carousel refreshed.owl.carousel', function(event) {
                if (!event.namespace) return;
                var carousel = event.relatedTarget,
                    element = event.target,
                    current = carousel.current();

                if (event.item.count <= event.page.size) {
                    $('.owl-next', element).hide();
                    $('.owl-prev', element).hide();
                } else {
                    $('.owl-next', element).show();
                    $('.owl-prev', element).show();
                }
            });
            destacats_carrousel.on('initialized.owl.carousel', function(event) {
               //console.log(event);
               destacats_carrousel.find('.owl-item').each(function(i){
                    if($(this).hasClass('cloned')){
                        $(this).find('a').each(function(){
                            $(this).attr('tabindex',-1);
                        });
                    }else{
                        $(this).attr('tabindex', 0);
                        $(this).siblings('.owl-item').removeClass('bcn-focus-accessible');
                    }

               });
            });

            destacats_carrousel.owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                dots: false,
                merge:true,
                responsive: {
                    0: {
                        items: 1,
                        dots: true,
                        nav: false,
                    },
                    480: {
                        items: 2,
                        dots: true,
                        nav: false,
                    },
                    680: {
                        items: 3,
                        dots: true,
                        nav: false,
                    },
                    1025: {
                        items: 4,
                        mergeFit: true,
                        slideBy: "page",
                    },

                },

            });

        }

    };
})(jQuery);
