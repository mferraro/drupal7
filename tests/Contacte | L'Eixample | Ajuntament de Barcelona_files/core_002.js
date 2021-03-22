var bcn_context = ".main-container";


(function($) {
	Drupal.behaviors.bcn_bootstrap = {
		attach: function(context, settings) {
			//$("select").selectpicker();
			$("select:not(.block-bcn-guide select)").selectpicker();
			//material design text inputs
			$(".form-group input[type=text], .form-group input[type=email], .form-group input[type=password]").not('.noeffects').each(function() {
				//date inputs
				if ($(this).hasClass("hasDatepicker")) {
					$(this).parent().append('<i class="bcn-icon-calendari icon icon-datepicker"></i>');
				}
				if ($(this).closest(".form-group").find(".control-label").size()) {
					$(this).closest(".form-group").find(".control-label").insertAfter(this);
				} else {
					if ($(this).closest(".views-exposed-widget").find("label").size()) {
						$(this).closest(".views-exposed-widget").find("label").insertAfter(this);
					}
				}
				if ($(this).hasClass('fakeinput')) {
					$(this).closest(".form-group").find('label').remove();
					$(this).closest(".views-exposed-widget").find('label').remove();
				}
				$('<span class="bar"></span>').insertAfter(this);
				$(this).removeAttr('placeholder');
				if (!$(this).val()) {
					$(this).addClass("empty");
				}


				$(this).closest(".form-group").addClass("bcn-form-processed");
			});

			//material design text inputs empty check
			$("body").on("change", ".form-group input[type=text], .form-group input[type=email], .form-group input[type=password]", function() {
				if (!$(this).val()) {
					$(this).addClass("empty");
				} else {
					$(this).removeClass("empty");
				}
			});
			//textarea
			$("body").on("change", ".form-group textarea", function() {
				if ($(this).val()) {
					$(this).removeClass("empty");
				} else {
					$(this).addClass("empty");
				}
			})
			// Textarea Auto Resize
			var hiddenDiv = $('.hiddendiv').first();
			if (!hiddenDiv.length) {
				hiddenDiv = $('<div class="hiddendiv common"></div>');
				$('body').append(hiddenDiv);
			}
			var text_area_selector = 'textarea';

			function textareaAutoResize($textarea) {
				// Set font properties of hiddenDiv

				var fontFamily = $textarea.css('font-family');
				var fontSize = $textarea.css('font-size');
				var lineHeight = $textarea.css('line-height');

				if (fontSize) { hiddenDiv.css('font-size', fontSize); }
				if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }
				if (lineHeight) { hiddenDiv.css('line-height', lineHeight); }

				if ($textarea.attr('wrap') === "off") {
					hiddenDiv.css('overflow-wrap', "normal")
						.css('white-space', "pre");
				}

				hiddenDiv.text($textarea.val() + '\n');
				var content = hiddenDiv.html().replace(/\n/g, '<br>');
				hiddenDiv.html(content);


				// When textarea is hidden, width goes crazy.
				// Approximate with half of window size

				if ($textarea.is(':visible')) {
					hiddenDiv.css('width', $textarea.width());
				} else {
					hiddenDiv.css('width', $(window).width() / 2);
				}

				$textarea.css('height', hiddenDiv.height() + 20);
			}

			$(text_area_selector).each(function() {
				var $textarea = $(this);
				if ($textarea.val().length) {
					textareaAutoResize($textarea);
				}
				$(this).closest('.form-group').addClass('bcn-form-processed bcn-form-textarea');
				if ($(this).closest(".form-group").find(".control-label").size()) {
					$(this).closest(".form-group").find(".control-label").insertAfter(this);
				} else {
					if ($(this).closest(".views-exposed-widget").find("label").size()) {
						$(this).closest(".views-exposed-widget").find("label").insertAfter(this);
					}
				}
				$('<span class="bar"></span>').insertAfter(this);
				if (!$(this).hasClass('preserve-placeholder')) {
					$(this).removeAttr('placeholder');
				}
				if (!$(this).val()) {
					$(this).addClass("empty");
				}
			});

			$('body').on('keyup keydown autoresize', text_area_selector, function() {
				textareaAutoResize($(this));
			});

			//input file
			$('.form-group input[type="file"]').each(function() {
				$(this).closest(".form-group").find(".control-label").insertAfter(this);
				var label = $(this).closest(".form-group").find(".control-label");
				if (label === null) {
					return;
				}
				$(this).closest(".form-group").attr("orig-label", $(label).html());
				$(this).closest(".form-group").addClass("form-group-file");
				$(label).wrapInner("<span class='real-label'></span>");
				$(label).append("<span class='fake-label'></span>");
				$(".fake-label", label).append('<i class="bcn-icon-adjunt icon"></i>');
				$(this).closest(".form-group").find(".help-block").addClass("sr-only");
				$(this).closest(".form-group").addClass("bcn-form-processed");
			});

			//change file label
			$('.form-group input[type="file"]').on("change", function() {
				var label = $(this).closest(".form-group").find(".real-label");
				var files = $(this).prop("files");
				var names = $.map(files, function(val) { return val.name; });
				if (names != '') {
					$(label).html(names);
				} else {
					$(label).html($(label).closest(".form-group").attr("orig-label"));
				}
			});




			$('body').on('keydown', '[tabindex=0]:not(.bcn-brand, .bcn-brand *)', function(e) {
				if (e.which == 13) {
					e.preventDefault();
					target = e.currentTarget;

					events = $._data(target, 'events');

					if ((events && events.click)) {
						$(target).trigger('click');
					} else {
						$(target).children().first().trigger('click');
					}
				}
			});

			$('body').on('focus', '*:not(.bcn-brand, .bcn-brand *)', function(e) {
				e.stopPropagation();

				var target = e.currentTarget;

				$(target).addClass('bcn-no-focus');

				$(target).keyup(function(event) {
					var code = (event.keyCode) ? event.keyCode : event.which;

					if (code == 9) {
						$(target).addClass('bcn-focus-accessible');
					}
				});
			});
			$('body').on('blur', '*:not(.bcn-brand, .bcn-brand *)', function(e) {
				e.stopPropagation();
				var target = e.currentTarget;
				$(target).removeClass('bcn-no-focus bcn-focus-accessible');
			});

			//propi
			$('.view-calendari-de-districte .date-nav .pager li.title a').attr('tabindex', '-1').attr('aria-hidden','true');
		$('#bcn_districtes_double_calendar_wrapper button[name=arrera]').attr('value',Drupal.t('Previous months'));
		$('#bcn_districtes_double_calendar_wrapper button[name=avant]').attr('value',Drupal.t('Next months'));

		} //end attach settings

	};






})(jQuery);
