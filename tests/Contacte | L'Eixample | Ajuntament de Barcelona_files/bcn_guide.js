(function($) {

    var initialized = false;

    $.fn.bcn_guide = function() {
        bcn_formsguide();
        bcn_formsguide_cursos();
        bcn_formsguide_eq();

        // slick -> equipaments
        var promos = $(".display-grid").find("ul");

        if (promos.length) {

            //Slick Responsive not working, this is a workaround
            /*$(window).on('resize orientationchange', function(e) {
                slickResponsive(promos, $(window).width());
            });*/
            slickResponsive(promos, $(window).width());

            /*promos.slick({
                arrows: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                nextArrow: '<button class="slick-next"><i class="bcn-icon-dreta-light"></i></button>',
                prevArrow: '<button class="slick-prev"><i class="bcn-icon-esquerra-light"></i></button>',
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            // centerMode: true,
                            dots: true,
                            arrows: false,
                        }
                    }
                ]
            });*/

        }
    };

    function slickResponsive(promos, width) {
        var settings = {
            infinite: true
        };

        if (width <= 767) {
            $.extend(settings, {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            });
        } else if (width <= 991) {
            $.extend(settings, {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true
            });
        } else if (width <= 1024) {
            $.extend(settings, {
                slidesToShow: 2,
                slidesToScroll: 2,
                nextArrow: '<button class="slick-next"><i class="bcn-icon-dreta-light"></i><span>' + Drupal.t('Previous highlighted spaces') + '</span></button>',
                prevArrow: '<button class="slick-prev"><i class="bcn-icon-esquerra-light"></i><span>' + Drupal.t('Next highlighted spaces') + '</span></button>'
            });
        } else {
            $.extend(settings, {
                slidesToShow: 3,
                slidesToScroll: 3,
                nextArrow: '<button class="slick-next"><i class="bcn-icon-dreta-light"></i><span>' + Drupal.t('Previous highlighted spaces') + '</span></button>',
                prevArrow: '<button class="slick-prev"><i class="bcn-icon-esquerra-light"></i><span>' + Drupal.t('Next highlighted spaces') + '</span></button>'
            });
        }
        if (initialized) {
            promos.slick('unslick');
            initialized = false;
            promos.on('init', function() {
                initialized = true;
            });
        }
        promos.slick(settings);
    }

    function bcn_formsguide() {
        $('form#cercador-activitats').trigger('reset');
        $('form#cercador-activitats .date input').prop('disabled', true);
        $('form#cercador-activitats .date').addClass('disabled');

        $('form#cercador-activitats select#quan').change(function() {
            if ($(this).val() != '' && $(this).val() != 'rang') {
                $(this).next('input#d').prop('disabled', false);
                $(this).next('input#d').attr('value', $(this).val());
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').find('input').prop('disabled', true);
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').addClass('disabled');
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').find('input').val('');
                $(this).parent('.date-when').siblings('#bcn_guide_input_date').val('');
                $(this).parent('.date-when').siblings('#bcn_guide_input_date').prop('disabled', true);
            } else if ($(this).val() == 'rang') {
                $(this).next('input#d').prop('disabled', true);
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').find('input').prop('disabled', false);
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').removeClass('disabled');
                $(this).parent('.date-when').siblings('#bcn_guide_input_date').prop('disabled', false);
            } else {
                $(this).next('input#d').prop('disabled', true);
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').find('input').prop('disabled', true);
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').addClass('disabled');
                $(this).parents('.bcn_guide_advanced_search_date').find('.date').find('input').val('');
                $(this).parent('.date-when').siblings('#bcn_guide_input_date').val('');
                $(this).parent('.date-when').siblings('#bcn_guide_input_date').prop('disabled', true);
            }
        });


        $('form#cercador-activitats .box-submit button').click(function(e) {
            e.preventDefault();
            $('form#cercador-activitats').find('input,select').each(function() {
                if ($(this).val() == "") {
                    $(this).prop('disabled', true);
                }
            });
            $('form#cercador-activitats').submit();
        });

    }

    function bcn_formsguide_cursos() {
        $('form#cercador-cursos').trigger('reset');
        $('form#cercador-cursos .date input').prop('disabled', true);
        $('form#cercador-cursos .date').addClass('disabled');

        //cursos i tallers
        $('form#cercador-cursos select#target').change(function() {
            $(this).next('input#targeth').val($(this).val());
        });
        $('form#cercador-cursos fieldset.selmadeto input[type=image]').click(function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).siblings('input.realitzat').val('');

            } else {
                $(this).siblings('input[type=image]').removeClass('active');
                $(this).addClass('active');
                $(this).siblings('input.realitzat').val($(this).attr('data-id'));
            }


        });
        $('form#cercador-cursos fieldset.date-when input[type=button]').click(function() {
            //si ja esta actiu
            if ($(this).hasClass('active')) {
                $(this).siblings('input#d').val('');
                $(this).removeClass('active');
                $(this).parent('fieldset').siblings('.date').find('input').val('');
                $(this).parent('fieldset').siblings('.date').find('input').prop('disabled', true);
                $(this).parent('fieldset').siblings('#bcn_guide_input_date').val('');
                $(this).parent('fieldset').siblings('#bcn_guide_input_date').prop('disabled', true);
            } else { //si no esta actiu

                $(this).siblings('input[type=button]').removeClass('active');
                $(this).addClass('active');
                if ($(this).attr('data-id') == 'rang') {
                    $(this).parent('fieldset').siblings('.date').removeClass('disabled');
                    $(this).parent('fieldset').siblings('.date').find('input').prop('disabled', false);
                    $(this).parent('fieldset').siblings('#bcn_guide_input_date').prop('disabled', false);
                    $(this).siblings('input#d').prop('disabled', true);
                } else {
                    $(this).siblings('input#d').val($(this).attr('data-id'));
                    $(this).siblings('input#d').prop('disabled', false);
                    $(this).parent('fieldset').siblings('.date').addClass('disabled');
                    $(this).parent('fieldset').siblings('.date').find('input').val('');
                    $(this).parent('fieldset').siblings('.date').find('input').prop('disabled', true);
                    $(this).parent('fieldset').siblings('#bcn_guide_input_date').prop('disabled', true);
                }
            }
        });
        //fi cursos i tallers
        $('form#cercador-cursos .box-submit button').click(function(e) {
            e.preventDefault();
            var codec = '';

            if ($('form#cercador-cursos input#targeth').val() != '') {
                codec = $('form.bcn_guide_advanced_search input#targeth').val();
            }
            if ($('form#cercador-cursos input.realitzat').val() != '') {
                if (codec != '') {
                    codec += ';';
                }
                codec += $('form#cercador-cursos input.realitzat').val();
            }

            if (codec != '') {
                if ($('form#cercador-cursos input[name=c]').length) {
                    $('form#cercador-cursos input[name=c]').val($('form#cercador-cursos input[name=c]').val() + ';' + codec);
                } else {
                    $('form#cercador-cursos').prepend('<input type="hidden" name="c" value="' + codec + '" />');
                }


            }

            $('form#cercador-cursos').find('input,select').each(function() {
                if ($(this).val() == "") {
                    $(this).prop('disabled', true);
                }
            });
            $('form#cercador-cursos').submit();
        });

    }

    function bcn_formsguide_eq() {

        $('form#cercador-equipaments').trigger('reset');
        $('form#cercador-equipaments .box-submit button').click(function(e) {
            e.preventDefault();
            var codec = '';


            if ($('form#cercador-equipaments select#titularitat').val() != '') {
                if (codec != '') {
                    codec += ';';
                }
                codec += $('form#cercador-equipaments select#titularitat').val();
            }

            if (codec != '') {
                if ($('form#cercador-equipaments input[name=c]').length) {
                    $('form#cercador-equipaments input[name=c]').val($('form#cercador-equipaments input[name=c]').val() + ';' + codec);
                } else {
                    $('form#cercador-equipaments').prepend('<input type="hidden" name="c" value="' + codec + '" />');
                }


            }



            $('form#cercador-equipaments').find('input,select').each(function() {
                if ($(this).val() == "") {
                    $(this).prop('disabled', true);
                }
            });
            $('form#cercador-equipaments').submit();
        });

    }

})(jQuery);
