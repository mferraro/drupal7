(function($) {
	$.fn.bcn_preguntes = function(element) {
		container = element || bcn_context;
		var pregunta = $(container).find(".pregunta");
		var titolFaq = pregunta.find('.titol-faq');
		if (pregunta.length) {
			pregunta.find(".contingut-pregunta").hide();
			titolFaq.append('<i class="bcn-icon-baix-medium"></i>').attr("tabindex", "0");
			titolFaq.on('click', function(e) {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				} else {
					$(this).addClass('active');
				}
				$(this).attr('aria-expanded',  $(this).attr('aria-expanded')=='false' ? 'true' : 'false');

				$(this).parent().find(".contingut-pregunta").slideToggle();
			});
		}
	};
})(jQuery);
