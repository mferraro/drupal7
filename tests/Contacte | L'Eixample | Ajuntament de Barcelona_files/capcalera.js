(function($) {

	//IE 9 NO TE TRANSITION END AIXI QUE MIRAR COM FER ELS CALLBACKS

	$.fn.capcalera = function() {
        ( $(window).width() > 767 ) ? desktop() : mobile();
	};


    function desktop() {
        var settings = {
            speed: 700,
            arrows: false,
            dots: true,
            accessibility: false
        }

        var imageBackground = $('.capcalera-imagebackground');
        var videoBackground = $('.capcalera-videobackground');

        var handler = function() {
            ini(settings /*Carousel handler for mobile etc etc*/);
        };

        if (imageBackground.length) image(handler);
        else if (videoBackground) video(handler);
        else ini(settings);
    }

    function mobile() {

        $(".capcalera-promocions").owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            stagePadding: 15,
            loop: true,
            center: true,
            items: 1
        })

        /*var settings = {
            infinite: false,
            centerMode: true,
            centerPadding: '14px',
            arrows: false,
            dots: true,
        }

        var initHandler = function() {

            //$('.capacalera-wrapper').removeAttr('unresolved');

            var imatge = $('.capcalera-promocio').eq(0).find('.capcalera-promocio-imatge img').clone();
            var background = $('.capcalera-background');

            $(background).addClass("container");

            background.empty();
            background.append(imatge);
        }

        var beforeHandler = function(event, slick, currentSlide, nextSlide) {
            var imatge = $('.capcalera-promocio').eq(nextSlide).find('.capcalera-promocio-imatge img').clone();
            var background = $('.capcalera-background');

            background.empty();
            background.append(imatge);
        }
        carousel(settings, initHandler, beforeHandler);*/
    }


    function ini(settings) {
        $('.capcalera-site-title').removeAttr('unresolved');

        var out = $('.capcalera-promocions-control i').attr('title');
        $('.capcalera-promocions-control i').on('click', function(e) {
            if ($(this).parent().hasClass('bcn-out')) {
                $(this).parent().removeClass('bcn-out');
                $('.capcalera-promocions-container').removeClass('bcn-out');
                $(this).attr('title', out);
                $('.capcalera-promocions-container *').attr('tabindex', '');
                /*$('.capcalera-promocions-container [tabindex="-1"]').attr('tabindex', '0');
                $('.capcalera-promocions-container a').attr('tabindex', '')*/
                //$('.capcalera-graella').removeClass('bcn-out');
            } else {
                $(this).parent().addClass('bcn-out');
                $('.capcalera-promocions-container').addClass('bcn-out');
                $(this).attr('title',$(this).find('span').text());
                $('.capcalera-promocions-container *').attr('tabindex', '-1');
                /*$('.capcalera-promocions-container [tabindex="0"]').attr('tabindex', '-1');
                $('.capcalera-promocions-container a').attr('tabindex', '-1')*/
                //$('.capcalera-graella').addClass('bcn-out');
            }
        });

        var initHandler = function() {
            var promo = ($('.capcalera-promocio').length == 1) ? 0 : 1;
            $('.capcalera-promocio').eq(promo).addClass('bcn-active');
            if($('.capcalera-promocio').length > 1) {
                $('.capcalera-navegacio').removeAttr('unresolved');
            }
            $('.capcalera-wrapper')[0].removeAttribute('unresolved');

            accessibility(promo);
            /*var enllacos = $('.capcalera-promocio .capcalera-promocio-links a');
            enllacos.attr('tabindex', '-1');
            console.log(enllacos);

            enllacos  = $('.capcalera-promocio').eq(promo).find('.capcalera-promocio-links a');
            console.log(enllacos);*/
        }

        var beforeHandler = function(event, slick, currentSlide, nextSlide) {
            $('.capcalera-promocio').removeClass('bcn-active');
            $('.capcalera-promocio').eq(nextSlide + 1).addClass('bcn-active');

            accessibility(nextSlide + 1);
            /*var enllacos = $('.capcalera-promocio .capcalera-promocio-links a');
            enllacos.attr('tabindex', '-1');
            console.log(enllacos);*/
        }
        carousel(settings, initHandler, beforeHandler);
    }

	function image(handler) {
        $('.capcalera-imagebackground img').on('load', function() {
            //console.log('Carregada');
			$('.capcalera-imagebackground')
            .on('transitionend webkitTransitionEnd oTransitionEnd', handler)
            .removeAttr('unresolved');
		}).each(function() {
          if(this.complete) $(this).load();
          /*console.log(this);*/
        });
	}

	function video(handler) {

        $('#videobg').on('loadeddata', function() {
            this.play();
			$('.capcalera-videobackground')
            .on('transitionend webkitTransitionEnd oTransitionEnd', handler)
            .removeAttr('unresolved');
		});

        /*var video = document.querySelector('#videobg');
        console.log(video);
        console.log(video.networkState);

        var sources = video.querySelectorAll('source');
        console.log(sources);

        var source = sources[sources.length - 1];
        console.log(source);*/

        /*video.addEventListener('error', function(e) {
            console.log('Video error');
        });

        source.addEventListener('error', function(e) {
            console.log('Source error');
        });*/

		//VIDEO CONTROLS
		$('.capcalera-video-controls').on('click', function(e) {
			var video = document.getElementById('videobg');
			var reproduir = document.getElementById('reproduir');
			var pausar = document.getElementById('pausar');

			if(video.paused) {
				video.play();
				pausar.className = 'pausar';
				pausar.removeAttribute('hidden');
				reproduir.setAttribute('hidden', true);
			} else {
				video.pause();
				reproduir.className = 'reproduir';
				reproduir.removeAttribute('hidden');
				pausar.setAttribute('hidden', true);
			}
		});

	}

	function carousel(settings, initHandler, beforeHandler /* CarouselHandler Maybe*/) {

        //REVISAR PER MOBILE

        $('.capcalera-promocions').on('init', initHandler);

		$('.capcalera-promocions').slick(settings);

		// On before slide change
		$('.capcalera-promocions').on('beforeChange', beforeHandler/*function(event, slick, currentSlide, nextSlide) {
			$('.capcalera-promocio').removeClass('bcn-active');
			$('.capcalera-promocio').eq(nextSlide + 1).addClass('bcn-active');
		}*/);

		//SLICK CONTROLS
		$('.capcalera-esquerra').on('click', function(e) {
			$('.capcalera-promocions').slick('slickPrev');
		});

		$('.capcalera-dreta').on('click', function(e) {
            $('.capcalera-promocions').slick('slickNext');
		});

        $('.capcalera-promocio-links a').on('blur', function(e) {
            //console.log('Blur');
            //$('.capcalera-promocions').slick('slickNext');
        });

        $('.capcalera-promocio-links a').on('keydown', function(e) {
            if(e.keyCode == 9 & !e.shiftKey) {
                $('.capcalera-promocions').slick('slickNext');
            }
        });

	}


    function accessibility(promo) {
        $('.slick-dots button').attr('tabindex', '-1').attr('role', '').attr('aria-hidden', true);
        $('.capcalera-promocio-links a').attr('tabindex', '-1');
        $('.capcalera-promocio').eq(promo).find('.capcalera-promocio-links a').attr('tabindex', '0');
        //console.log(promo);
    }

})(jQuery);
