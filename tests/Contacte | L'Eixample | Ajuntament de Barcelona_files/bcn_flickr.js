(function($) {
	$.fn.bcn_flickr = function() {
		var photosetElem = '.flickr-photoset';

		if ($(photosetElem).length > 0) {
			$(photosetElem).slick({
				arrows: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				centerMode: true,
				variableWidth: true,
				nextArrow: '<button class="slick-next"><i class="bcn-icon-dreta-light"></i></button>',
				prevArrow: '<button class="slick-prev"><i class="bcn-icon-esquerra-light"></i></button>',
				responsive: [{
					breakpoint: 768,
					variableWidth: false,
					centerMode: false,
					settings: {
						dots: true
					}
				}]
			});
		}
	};
})(jQuery);
