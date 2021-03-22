(function($) {





	$.fn.barri_actual = function(element) {
		var container = element || bcn_context;

		var galeria = $(container + ' .parag-barri-actual');

		if ($(galeria).find('.item-imgba').find('img').length) {
			$(galeria).each(function(index) {
				$(this).find('.item-imgba').each(function(i){
				$(this).find('img').css('opacity', 0);
				var carga = 'data-screen';
				if($(window).width() <= 767 && $(window).width() >= 585){
					var attr = $(this).find('img').attr('data-tab');
					if (typeof attr !== typeof undefined && attr !== false) {
						carga = 'data-tab';
					}

				}else if($(window).width() <= 584){
					var carga = 'data-mobile';
				}


				$(this).find('img').attr('src', $(this).find('img').attr(carga)).on('load', function() {
					$(this).siblings('.spinner-wrapper').fadeOut();
					$(this).parent().addClass('loaded');
					$(this)[0].style.transition = 'all ease .7s';
					$(this)[0].style.opacity = 1;
				});
				$(this).show();
			});

			});
		}




		// colorbox
		galeria.each(function(index) {
			var elem = '.item-img-' + $(this).attr('data-id');

			$(elem).colorbox({
				rel: elem,
				title: false,
				current: "{current} / {total}",
				transition: "none",
				maxWidth:'70%',
				title: function() { return $(this).siblings('.dades').find('.descrip-img').text()+'<span class="copyright">'+$(this).siblings('.dades').find('.copyright').text()+'</span>'; },
			});


		});

	};






})(jQuery);
