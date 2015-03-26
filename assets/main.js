var map = L.map('map').setView([14.84508, -91.51783], 13);

$(document).ready(function(){
	init();
});

function init(){

	L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'examples.map-20v6611k'
	}).addTo(map);

}

var layers = {};

function onEachFeature(feature, layer) {
	console.log(feature);
	var popupContent = "<p>I started out as a GeoJSON " +
			feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

	if (feature.properties && feature.properties.popupContent) {
		popupContent += feature.properties.popupContent;
	}
	layer.bindPopup(popupContent);
}

function createLayer(file,color){
	var layer = L.geoJson(null, {
    	// http://leafletjs.com/reference.html#geojson-style
    	style: function(feature) {
        	return { color: color };
    	},
    	//onEachFeature: onEachFeature

	});
	if(layers[file]){
		alert('Capa ya cargada en el mapa');
		return false;
	} else {
		layers[file] = layer;
		return layer;
	}


}

function clearLayers(){
	$.each(layers, function(i,e){
		map.removeLayer(e);
	});
	layers = {};
}

function loadTopoJSON(file){
	var customLayer = createLayer(file,(file.indexOf('-sm')>0)?'#9F0':'#F00');
	if(customLayer){
		$('#loading').html('Cargando ' + file + '...').show();
		omnivore.topojson('geo/'+file, null, customLayer)
		.on('ready', function() {
			$('#loading').hide();
	    })
		.addTo(map);
	}
}

function loadKml(file){
	var customLayer = createLayer(file,'#0F0');
	if(customLayer){
		$('#loading').html('Cargando ' + file + '...').show();
		omnivore.kml('geo/'+file, null, customLayer)
		.on('ready', function() {
			$('#loading').hide();
	    })
		.addTo(map);
	}
}

function loadGeoJSON(file){
	var customLayer = createLayer(file,'#00F');
	if(customLayer){
		$('#loading').html('Cargando ' + file + '...').show();
		omnivore.geojson('geo/'+file, null, customLayer)
		.on('ready', function() {
			$('#loading').hide();
	    })
		.addTo(map);
	}
}
