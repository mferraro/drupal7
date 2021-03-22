(function($) {
	function initialize(latitud, longitud) {
		var activeWindow = null;
		var myLatLng = {lat: latitud, lng: longitud};
		var myOptions = {
			zoom: 17,
			center: new google.maps.LatLng(myLatLng),
			zoomControl:false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_CENTER
			},
			styles: [
				{
                   "featureType": "poi",
                   "elementType": "all",
                   "stylers": [
                       {
                           "visibility": "off"
                       }
                   ]
               }
			]
		}

		map = new google.maps.Map(document.getElementById("contacte-mapa"), myOptions);



		marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    title: Drupal.t("Sede del Distrito de L’Eixample")
		});

		marker.setMap(map);

		var html = "<div class='bubble'><h3>" + marker.title + "</h3></div>";
		var infowindow = new google.maps.InfoWindow({ content: html });

		google.maps.event.addListener(marker, 'click', function() {
			if(activeWindow != null) activeWindow.close();
			infowindow.open(map,marker);
			activeWindow = infowindow;
		});

		marker2 = new google.maps.Marker({
			position: {lat: 41.395449, lng: 2.169507},
			map: map,
			title: Drupal.t('Oficina de Atención Ciudadana del Distrito de L’Eixample (OAC)')
		})
		
		marker2.setMap(map);

		var html2 = "<div class='bubble'><h3>" + marker2.title + "</h3></div>";
		var infowindow2 = new google.maps.InfoWindow({ content: html2 });

		google.maps.event.addListener(marker2, 'click', function() {
			if(activeWindow != null) activeWindow.close();
			infowindow2.open(map,marker2);
			activeWindow = infowindow2;
		});
	}

	function zoomout(){
		oldZoom = map.getZoom();
		map.setZoom(oldZoom - 1); //Or whatever
	}

	function zoomin(){
		oldZoom = map.getZoom();
		map.setZoom(oldZoom + 1); //Or whatever
	}

	$(document).ready(function() {
		if($("#contacte-mapa").length) {
			initialize(41.396443, 2.170299);
			$("img#zoomout").click(function(){
				zoomout();
			});
			$("#zoomin").click(function(){
				zoomin();
			});
		}
	})
	
})(jQuery);