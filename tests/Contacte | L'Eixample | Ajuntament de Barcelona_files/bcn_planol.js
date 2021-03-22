/**
 * @file
 * bcn_planol js file.
 */

 var lang;

(function ($) {
  Drupal.behaviors.bcn_planol = {
    attach: function (context, settings) {
    }
  };
})(jQuery);

jQuery(document).ready(function() {
  lang = jQuery('html').attr('lang') || jQuery('html').attr('xml:lang') || 'ca';
  var API_KEY = Drupal.settings.bcn_planol.API_KEY;
  // Initialize map after scripts are loaded.
  if (typeof geobcn !== 'undefined') {
    geobcn.apiManager(API_KEY, 'v2', initPlanolMap);
  }
});

/**
 * Initializes Guia search map.
 */
var setGuiaPlanolMap = function(points) {
  Drupal.settings.bcn_planol.points = points;
  if (typeof points[0] !== 'undefined') {
    if (points[0].coords !== false) {
      var id_map = Drupal.settings.bcn_planol.type_guia.id_map;
      var map = new bcnPlanol.maps.Map(id_map, {
        'controls'    : true,
        'center'      : points[0].coords,
        'proj'        : 'EPSG:4326',
        'zoom'        : Drupal.settings.bcn_planol.type_guia.zoom,
        'scrollwheel' : true,
        'callback'    : setGuiaPlanolBCNPoints
      });
    } else {
      // No points.
      errorLoaderlMap(true);
    }
  } else {
    if (typeof points.description !== 'undefined') {
      console.log(points.description);
    }
  }
};

/**
 * Add points to Guia search map.
 */
var setGuiaPlanolBCNPoints = function() {
  setGuiaPlanolBCNMarker();
  var points = Drupal.settings.bcn_planol.points;
  for (var i = 0; i < points.length; i += 1) {
    var html = points[i].description;
    var feature = {
      'id'      : i,
      'latLng'  : points[i].coords,
      'html'    : html.replace(/["']/g, "\'"),
      'proj'    : Drupal.settings.bcn_planol.coords_type
    };
    bcnPlanol.maps.addPoint(feature);
  }
  // Center map.
  setTimeout(function() {
    bcnPlanol.maps.centre(Drupal.settings.bcn_planol.type_guia.zoom);
    endLoaderlMap();
  }, 1000);
};

/**
 * Get all points information for Guia Ids map.
 */
var searchGuiaIdsPlanolMap = function() {
  var id_map = Drupal.settings.bcn_planol.type_guia_ids.id_map;
  var guia_ids = Drupal.settings.bcn_planol.type_guia_ids.guia_ids;
  if (typeof guia_ids !== 'undefined') {
    // Get Guia points info.
    jQuery.each(guia_ids, function(key, value) {
      var guia_params = 'pg=search&nr10&xout=json&id=' + value;
      bcnPlanol.guia.getJsonGuia(guia_params, setGuiaIdsPlanolMap);
    });
  }
};

/**
 * Initializes Guia Ids map.
 */
var setGuiaIdsPlanolMap = function(points) {
  // Append points to settings variable.
  if (typeof points[0] !== 'undefined') {
    if (typeof Drupal.settings.bcn_planol.points == 'undefined') {
      Drupal.settings.bcn_planol.points = [];
    }
    Drupal.settings.bcn_planol.points.push(points[0]);
  } else {
    if (typeof points.description !== 'undefined') {
      console.log(points.description);
    }
  }
  var guia_ids = Drupal.settings.bcn_planol.type_guia_ids.guia_ids;
  points = Drupal.settings.bcn_planol.points;
  // After all points have been added, set up map.
  if (guia_ids.length == points.length) {
    // Find first point whith coordinates.
    var first_coords = null;
    for (var i = 0; i < points.length; i += 1) {
      if (points[i].coords !== false) {
        first_coords = i;
      }
    }
    if (first_coords !== null && points[first_coords].coords !== false) {
      var id_map = Drupal.settings.bcn_planol.type_guia_ids.id_map;
      var map = new bcnPlanol.maps.Map(id_map, {
        'controls'    : true,
        'center'      : points[first_coords].coords,
        'proj'        : 'EPSG:4326',
        'zoom'        : Drupal.settings.bcn_planol.type_guia_ids.zoom,
        'scrollwheel' : true,
        'callback'    : setGuiaIdsPlanolBCNPoints
      });
    } else {
      // No points.
      errorLoaderlMap(true);
    }
  }
};

/**
 * Add points to Guia Ids map.
 */
var setGuiaIdsPlanolBCNPoints = function() {
  setGuiaPlanolBCNMarker();
  // After all points have been added, paint all points.
  var points = Drupal.settings.bcn_planol.points;
  for (var i = 0; i < points.length; i += 1) {
    if (points[i].coords !== false) {
      var html = points[i].description;
      var feature = {
        'id'      : i,
        'latLng'  : points[i].coords,
        'html'    : html.replace(/["']/g, "\'"),
        'proj'    : Drupal.settings.bcn_planol.coords_type
      };
      bcnPlanol.maps.addPoint(feature);
    }
  }
  // Center map.
  setTimeout(function() {
    bcnPlanol.maps.centre(Drupal.settings.bcn_planol.type_guia_ids.zoom);
    endLoaderlMap();
  }, 1000);
};

/**
 * Initializes multipoint planol.
 */
var setMultipointPlanolMap = function() {
  var map_info = Drupal.settings.bcn_planol.type_points;
  var id_map = map_info.id_map;
  if (typeof map_info.points !== 'undefined' &&
      typeof map_info.points[Object.keys(map_info.points)[0]].coords_x !== 'undefined' &&
      typeof map_info.points[Object.keys(map_info.points)[0]].coords_y !== 'undefined') {
    var myLatlng = bcnPlanol.maps.LatLng(
      map_info.points[Object.keys(map_info.points)[0]].coords_x,
      map_info.points[Object.keys(map_info.points)[0]].coords_y
    );
    var map = new bcnPlanol.maps.Map(id_map, {
      'controls'    : true,
      'center'      : myLatlng,
      'proj'        : Drupal.settings.bcn_planol.type_points.coords_type,
      'zoom'        : Drupal.settings.bcn_planol.type_points.zoom,
      'scrollwheel' : true,
      'callback'    : setMultipointPlanolBCNPoints
    });
  }
  else {
    console.log('No point defined.');
  }
};

/**
 * Add points to multipoints map.
 */
var setMultipointPlanolBCNPoints = function() {
  setGuiaPlanolBCNMarker();
  var id_map = Drupal.settings.bcn_planol.type_points.id_map;
  var points = Drupal.settings.bcn_planol.type_points.points;
  Object.keys(points).forEach(function(i) {
    var html;
    var coords = bcnPlanol.maps.LatLng(points[i].coords_x, points[i].coords_y);
    if (typeof points[i].description[lang] !== 'undefined') {
      html = points[i].description[lang];
    }
    var feature = {
      'id'      : i,
      'latLng'  : coords,
      'html'    : html.value.replace(/["']/g, "\'"),
      'proj'    : Drupal.settings.bcn_planol.type_points.coords_type
    };
    bcnPlanol.maps.addPoint(feature);
  });
  // Center map.
  setTimeout(function(){
    bcnPlanol.maps.centre(Drupal.settings.bcn_planol.type_points.zoom);
    endLoaderlMap();
  }, 1000);
};

/**
 * Initialize planol
 * Detect if is a multipoint, guia, or guia ids block.
 */
var initPlanolMap = function() {
  initLoaderlMap();
  if (typeof Drupal.settings.bcn_planol !== 'undefined') {
    jQuery.each(Drupal.settings.bcn_planol, function(key, value) {
      switch(key) {
        case 'type_guia':
          if (typeof value.guia_params !== 'undefined') {
            bcnPlanol.guia.getJsonGuia(value.guia_params, setGuiaPlanolMap);
          }
          break;

        case 'type_guia_ids':
          searchGuiaIdsPlanolMap();
          break;

        case 'type_points':
          setMultipointPlanolMap();
          break;
      }
    });
  }
};

/**
 * Appends planol loader div.
 */
var initLoaderlMap = function() {
  if (typeof jQuery('.bcn-planol-wrapper') !== 'undefined') {
    jQuery('.bcn-planol-wrapper').prepend('<div class="loader"></div>');
    jQuery('.bcn-planol-wrapper .loader').prepend('<div class="bcn-api-manager-error"></div>');
    jQuery('.bcn-planol-wrapper .loader .bcn-api-manager-error').prepend('<div class="bcn-api-manager-error-caption">' + Drupal.t('Error with Plànol BCN') + '</div>');
    jQuery('.bcn-planol-wrapper .loader .bcn-api-manager-error').prepend('<div class="bcn-api-manager-error-icon"><i draggable="false"></i></div>');
  }
  setTimeout(function() {
    errorLoaderlMap(false);
  }, 7000);
};

/**
 * Remove planol loader div.
 */
var endLoaderlMap = function() {
  if (typeof jQuery('.bcn-planol-wrapper .loader') !== 'undefined') {
    jQuery('.bcn-planol-wrapper .loader').remove();
  }
};

/**
 * Shows error planol loader div.
 */
var errorLoaderlMap = function(noPoints) {
  if (noPoints == true) {
    jQuery('.bcn-planol-wrapper .loader .bcn-api-manager-error-icon').remove();
    jQuery('.bcn-planol-wrapper .loader .bcn-api-manager-error-caption').text(Drupal.t('No points found'));
  }
  if (typeof jQuery('.bcn-planol-wrapper .loader') !== 'undefined') {
    jQuery('.bcn-planol-wrapper .loader').addClass('error');
  }
};

/**
 * Sets custom marker.
 */
var setGuiaPlanolBCNMarker = function() {
  if (typeof Drupal.settings.bcn_planol != 'undefined' && Drupal.settings.bcn_planol.marker != null) {
    var icon = {
      anchor      : [Drupal.settings.bcn_planol.marker.offset_x, Drupal.settings.bcn_planol.marker.offset_y],
      anchorOrigin: 'bottom-left',
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src         : Drupal.settings.bcn_planol.marker.src,
      size        : [Drupal.settings.bcn_planol.marker.width, Drupal.settings.bcn_planol.marker.height]
    };
    bcnPlanol.maps.setIcon(icon);
  }
};
