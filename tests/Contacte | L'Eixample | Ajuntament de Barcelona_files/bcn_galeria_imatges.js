(function($) {
	var mobile = $(window).width() < 768;

	$.fn.galeria_imatges = function(element) {
		var container = element || bcn_context;

		var galeria = $(container + ' .parag-galeria-imatges');

		// colorbox
		galeria.each(function(index) {
			var current_galeria = $(this).find('.galeria-imgs');
			var num_visible = 4;
			var elem = '.group-img-' + $(this).find('.galeria-imgs').attr('data-id');
			if(current_galeria.attr('data-numimgs') != undefined && current_galeria.attr('data-numimgs') != null && current_galeria.attr('data-numimgs') != ''){
				num_visible = parseInt(current_galeria.attr('data-numimgs'));
			}
			$(elem).colorbox({
				rel: elem,
				title: false,
				current: "{current} / {total}",
				transition: "none",
				maxWidth:'80%',
				title: function() { return $(this).attr('title'); },
			});
			// veure més
			if (mobile) {
				num_visible = 2;
			}
			configuraVeureMes(current_galeria, num_visible);
		});
	};

	$.fn.galeria_videos = function(element) {
		var container = element || bcn_context;

		var galeria = $(container + ' .parag-galeria-videos');

		galeria.each(function(index) {
			var current_galeria = $(this).find('.galeria-videos');
			var num_visible = 3;

			if(current_galeria.attr('data-numvideos') != undefined && current_galeria.attr('data-numvideos') != null && current_galeria.attr('data-numvideos') != ''){
				num_visible = parseInt(current_galeria.attr('data-numvideos'));

			}
			// veure més
			if (mobile) {
				num_visible = 2;
			}
			configuraVeureMes(current_galeria, num_visible);
		});
	};

	function configuraVeureMes(galeria, num_visible) {
		var boto = galeria.siblings(".boto-final");
		var total_fotos = galeria.attr('data-total');
		boto.off('click');
		boto.click(function(e) {
			e.preventDefault();
			veureMes(galeria.find('li:hidden'), $(this), num_visible, total_fotos <= galeria.find('li:visible').length + num_visible);
		});

		veureMes(galeria.find('li'), boto, num_visible, total_fotos == num_visible);
	}

	function veureMes(node, boto, num_mostra, dont_show_more) {
		if ($(node).find('img').length) {
			$(node).each(function(index, value) {
				if (index < num_mostra) {
					$(this).find('img').css('opacity', 0);
					$(this).find('strong').hide();
					$(this).find('img').attr('src', $(this).find('img').attr('data-src')).on('load', function() {
						$(this).siblings('.spinner-wrapper').fadeOut();
						$(this).parent().siblings('strong').fadeIn();
						$(this).parent().addClass('loaded');
						$(this)[0].style.transition = 'all ease .7s';
						$(this)[0].style.opacity = 1;
					});
					$(this).show();
				}
			});
		} else {
			$(node).each(function(index, value) {
				if (index < num_mostra) {
					$(this).fadeIn();
				}
			});
		}
		if (dont_show_more) {
			boto.hide();
		}
	}

})(jQuery);
