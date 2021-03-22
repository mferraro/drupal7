(function($) { // JavaScript Document

	$(document).ready(function(e) {


		// PLÀNOL DISTRICTES - Home - S'iluminen les icones al passar el ratolí sobre el plànol.

		var origin_map= $('.parag-llistat-districtes .districtes-barcelona').attr('data-path')+"/sites/all/themes/bcn_bootstrap/img/mapa_districtes/map_elsdistrictes_off.png";
		var path_districthome = $('.parag-llistat-districtes .districtes-barcelona').attr('data-path')+"/sites/all/themes/bcn_bootstrap/img/mapa_districtes/";
		var mapa_districte= "";

		$('.districtes-barcelona .planol-home area').mouseover(function() {
			mapa_districte= $(this).attr('id');
			console.log(mapa_districte);
			$("#mapa-districtes-home").attr("src", path_districthome+mapa_districte+".png");

			$( ".districtes-barcelona ul.districtes-wrapper li a[data-districte='"+mapa_districte+"']" ).addClass( "active" );

		}).mouseout(function(){
			$("#mapa-districtes-home").attr("src", origin_map);
			$( ".districtes-barcelona ul.districtes-wrapper li a" ).removeClass( "active" );
		});

		$( ".districtes-barcelona ul.districtes-wrapper li a" ).mouseover(function(){
			mapa_districte= $(this).attr('data-districte');
			$("#mapa-districtes-home").attr("src", path_districthome+mapa_districte+".png");
		}).mouseout(function(){
			$("#mapa-districtes-home").attr("src", origin_map);
		});

		if ($('img[usemap="#mapa-districtes"]').rwdImageMaps) {
			$('img[usemap="#mapa-districtes"]').rwdImageMaps();
		}

		//mobil
		function goURL(event) {
			event.preventDefault();
			window.location = $("#districte-select").find(":selected").attr("value");
		}

		$('input#button').click(function(event) {
			goURL(event);
		});

	});


})(jQuery);
