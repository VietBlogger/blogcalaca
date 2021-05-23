(function($) {
    'use strict';

    var like = {};
    
    like.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);
    
    /**
    *  All functions to be called on $(document).ready() should be in this function
    **/
    function mkdfOnDocumentReady() {
        mkdfLikes();
    }

    function mkdfLikes() {
        $(document).on('click','.mkdf-like', function() {
            var likeLink = $(this),
                id = likeLink.attr('id'),
                postID = likeLink.data('post-id'),
                type = '';

            if ( likeLink.hasClass('liked') ) {
                return false;
            }

            if (typeof likeLink.data('type') !== 'undefined') {
                type = likeLink.data('type');
            }
    
            var dataToPass = {
                action: 'wanderland_core_action_like',
                likes_id: id,
                type: type,
                like_nonce: $('#mkdf_like_nonce_'+postID).val()
            };
        
            var like = $.post(mkdfGlobalVars.vars.mkdfAjaxUrl, dataToPass, function( data ) {
                likeLink.html(data).addClass('liked').attr('title', 'You already like this!');
            });

            return false;
        });
    }
    
})(jQuery);
(function ($) {
	'use strict';
	
	var rating = {};
	mkdf.modules.rating = rating;

    rating.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCommentRating();
	}
	
	function mkdfInitCommentRating() {
		var ratingHolder = $('.mkdf-comment-form-rating');

        var addActive = function (stars, ratingValue) {
            for (var i = 0; i < stars.length; i++) {
                var star = stars[i];
                if (i < ratingValue) {
                    $(star).addClass('active');
                } else {
                    $(star).removeClass('active');
                }
            }
        };

		ratingHolder.each(function() {
		    var thisHolder = $(this),
                ratingInput = thisHolder.find('.mkdf-rating'),
                ratingValue = ratingInput.val(),
                stars = thisHolder.find('.mkdf-star-rating');

                addActive(stars, ratingValue);

            stars.on('click', function () {
                ratingInput.val($(this).data('value')).trigger('change');
            });

            ratingInput.change(function () {
                ratingValue = ratingInput.val();
                addActive(stars, ratingValue);
            });
        });
	}
	
})(jQuery);
var j = jQuery.noConflict();

function CustomMarker( options ) {
    this.latlng = new google.maps.LatLng({lat: options.position.lat, lng: options.position.lng});
    this.setMap(options.map);
    this.templateData = options.templateData;
    this.markerData = {
        pin : options.markerPin
    };
}

if (typeof google === 'object') {
    CustomMarker.prototype = new google.maps.OverlayView();
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;

    if (!div) {
        div = this.div = document.createElement('div');
        var id = this.templateData.itemId;
        div.className = 'mkdf-map-marker-holder';
        div.setAttribute("id", id);
        div.setAttribute("data-latlng", this.latlng);

        var markerInfoTemplate = _.template( j('.mkdf-info-window-template').html() );
        markerInfoTemplate = markerInfoTemplate( self.templateData );

        var markerTemplate = _.template( j('.mkdf-marker-template').html() );
        markerTemplate = markerTemplate( self.markerData );

        j(div).append(markerInfoTemplate);
        j(div).append(markerTemplate);

        div.style.position = 'absolute';
        div.style.cursor = 'pointer';

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
        div.style.left = (point.x) + 'px';
        div.style.top = (point.y) + 'px';
    }
};

CustomMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

CustomMarker.prototype.getPosition = function() {
    return this.latlng;
};
(function($) {
	'use strict';
	
	var destination = {};
	mkdf.modules.destination = destination;
	
	destination.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(window).on('load', mkdfOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfDestinationSingleFollow().init();
	}
	
	var mkdfDestinationSingleFollow = function () {
		var info = $('.mkdf-follow-destination-info .mkdf-destination-single-holder .mkdf-ds-info-sticky-holder');
		
		if (info.length) {
			var infoHolder = info.parent(),
				infoHolderHeight = infoHolder.height(),
				mediaHolder = $('.mkdf-ds-image-holder'),
				mediaHolderHeight = mediaHolder.height(),
				mediaHolderOffset = mediaHolder.offset().top,
				mediaHolderItemSpace = parseInt(mediaHolder.find('.mkdf-ds-image:last-of-type').css('marginBottom'), 10),
				header = $('.header-appear, .mkdf-fixed-wrapper'),
				headerHeight = header.length ? header.height() : 0;
			
			var stickyHolderPosition = function () {
				if (mediaHolderHeight >= infoHolderHeight) {
					var scrollValue = mkdf.scroll;
					
					//Calculate header height if header appears
					if (scrollValue > 0 && header.length) {
						headerHeight = header.height();
					}
					
					var headerMixin = headerHeight + mkdfGlobalVars.vars.mkdfAddForAdminBar;
					if (scrollValue >= mediaHolderOffset - headerMixin) {
						if (scrollValue + infoHolderHeight >= mediaHolderHeight + mediaHolderOffset - mediaHolderItemSpace - headerMixin) {
							info.stop().animate({
								marginTop: mediaHolderHeight - mediaHolderItemSpace - infoHolderHeight
							});
							//Reset header height
							headerHeight = 0;
						} else {
							info.stop().animate({
								marginTop: scrollValue - mediaHolderOffset + headerMixin
							});
						}
					} else {
						info.stop().animate({
							marginTop: 0
						});
					}
				}
			};
		}
		
		return {
			init: function () {
				if (info.length) {
					stickyHolderPosition();
					$(window).scroll(function () {
						stickyHolderPosition();
					});
				}
			}
		};
	};
	
})(jQuery);
(function ($) {
    "use strict";

    var destinationMaps = {};
    mkdf.modules.destinationMaps = destinationMaps;
    destinationMaps.mkdfInitMultipleDestinationMap = mkdfInitMultipleDestinationMap;
    destinationMaps.mkdfInitMobileMap = mkdfInitMobileMap;
    destinationMaps.mkdfReinitMultipleGoogleMaps = mkdfReinitMultipleGoogleMaps;
    destinationMaps.mkdfGoogleMaps = {};

    $(window).on('load', mkdfOnWindowLoad);

    function mkdfOnWindowLoad() {
	    mkdfInitMultipleDestinationMap();
	    mkdfInitMobileMap();
	    mkdfBindListTitlesAndMap();
    }

    function mkdfInitMultipleDestinationMap() {
        var mapHolder = $('#mkdf-destination-multiple-map-holder');

        if (mapHolder.length) {
	        mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses({
                mapHolder: 'mkdf-destination-multiple-map-holder',
                hasFilter: true
            });
        }
    }

    function mkdfInitMobileMap() {
        var mapOpener = $('.mkdf-destination-view-larger-map a'),
            mapOpenerIcon = mapOpener.children('i'),
            mapHolder = $('.mkdf-map-holder');

        if (mapOpener.length) {
            mapOpener.on('click', function (e) {
                e.preventDefault();

                if (mapHolder.hasClass('mkdf-fullscreen-map')) {
                    mapHolder.removeClass('mkdf-fullscreen-map');
                    mapOpenerIcon.removeClass('icon-basic-magnifier-minus');
                    mapOpenerIcon.addClass('icon-basic-magnifier-plus');
                } else {
                    mapHolder.addClass('mkdf-fullscreen-map');
                    mapOpenerIcon.removeClass('icon-basic-magnifier-plus');
                    mapOpenerIcon.addClass('icon-basic-magnifier-minus');
                }

                mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses();
            });
        }
    }

    function mkdfReinitMultipleGoogleMaps(addresses, action) {
        if (action === 'append') {
            var mapObjs = mkdfMultipleMapVars.multiple.addresses.concat(addresses);
            mkdfMultipleMapVars.multiple.addresses = mapObjs;

            mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses({
                addresses: mapObjs
            });
        } else if (action === 'replace') {
            mkdfMultipleMapVars.multiple.addresses = addresses;
            mkdf.modules.destinationMaps.mkdfGoogleMaps.getDirectoryItemsAddresses({
                addresses: addresses
            });
        }

        mkdfBindListTitlesAndMap();
    }

    function mkdfBindListTitlesAndMap() {
        var itemsList = $('.mkdf-map-list-holder');

        if (itemsList.length) {
            itemsList.each(function () {
                var thisItemsList = $(this),
                    listItems = thisItemsList.find('article'),
                    map = thisItemsList.find('.mkdf-map-list-map-part');

                if (map.length) {
                    listItems.each(function () {
                        //Init hover
                        var listItem = $(this);

                        if (!listItem.hasClass('mkdf-init')) {
                            listItem.mouseenter(function () {
                                var itemId = listItem.data('id'),
                                    inactiveMarkersHolder = $('.mkdf-map-marker-holder:not(.mkdf-map-active)'),
                                    clusterMarkersHolder = $('.mkdf-cluster-marker');

                                if (inactiveMarkersHolder.length) {
                                    inactiveMarkersHolder.removeClass('mkdf-active');
                                    $('#' + itemId + '.mkdf-map-marker-holder').addClass('mkdf-active');
                                }

                                if (clusterMarkersHolder.length) {
                                    clusterMarkersHolder.each(function () {
                                        var thisClusterMarker = $(this),
                                            clusterMarkersItemIds = thisClusterMarker.data('item-ids');

                                        if (clusterMarkersItemIds !== undefined && clusterMarkersItemIds.includes(itemId.toString())) {
                                            thisClusterMarker.addClass('mkdf-active');
                                        }
                                    });
                                }
                            }).mouseleave(function () {
                                var markersHolder = $('.mkdf-map-marker-holder'),
                                    clusterMarkersHolder = $('.mkdf-cluster-marker');

                                if (markersHolder.length) {
                                    markersHolder.each(function () {
                                        var thisMapHolder = $(this);

                                        if (!thisMapHolder.hasClass('mkdf-map-active')) {
                                            thisMapHolder.removeClass('mkdf-active');
                                        }
                                    });
                                }

                                if (clusterMarkersHolder.length) {
                                    clusterMarkersHolder.removeClass('mkdf-active');
                                }
                            });

                            listItem.addClass('mkdf-init');
                        }
                    });
                }
            });
        }
    }

    destinationMaps.mkdfGoogleMaps = {
        //Object variables
        mapHolder: {},
        map: {},
        markers: {},
        radius: {},
        circle: {},

        /**
         * Returns map with single address
         *
         * @param options
         */
        getDirectoryItemAddress: function (options) {
            /**
             * use mkdfMapsVars to get variables for address, latitude, longitude by default
             */
            var defaults = {
                location: mkdfSingleMapVars.single['currentDestination'].location,
                zoom: 16,
                mapHolder: '',
                draggable: mkdfMapsVars.global.draggable,
                mapTypeControl: mkdfMapsVars.global.mapTypeControl,
                scrollwheel: mkdfMapsVars.global.scrollable,
                streetViewControl: mkdfMapsVars.global.streetViewControl,
                zoomControl: mkdfMapsVars.global.zoomControl,
                title: mkdfSingleMapVars.single['currentDestination'].title,
                excerpt: mkdfSingleMapVars.single['currentDestination'].excerpt,
                categories: mkdfSingleMapVars.single['currentDestination'].categories,
                itemId: mkdfSingleMapVars.single['currentDestination'].itemId,
                content: '',
                styles: mkdfMapsVars.global.mapStyle,
                markerPin: mkdfSingleMapVars.single['currentDestination'].markerPin,
                featuredImage: mkdfSingleMapVars.single['currentDestination'].featuredImage,
                itemUrl: mkdfSingleMapVars.single['currentDestination'].itemUrl
            };
            var settings = $.extend({}, defaults, options);

            //Save variables for later usage
            this.mapHolder = settings.mapHolder;

            //Get map holder
            var mapHolder = document.getElementById(settings.mapHolder);

            //Initialize map
            var map = new google.maps.Map(mapHolder, {
                zoom: settings.zoom,
                draggable: settings.draggable,
                mapTypeControl: settings.mapTypeControl,
                scrollwheel: settings.scrollwheel,
                streetViewControl: settings.streetViewControl,
                zoomControl: settings.zoomControl
            });

            //Set map style
            map.setOptions({
                styles: settings.styles
            });

            //Try to locate by latitude and longitude
            if (typeof settings.location !== 'undefined' && settings.location !== null) {
                var latLong = {
                    lat: parseFloat(settings.location.latitude),
                    lng: parseFloat(settings.location.longitude)
                };
                //Set map center to location
                map.setCenter(latLong);
                //Add marker to map

                var templateData = {
                    title: settings.title,
                    excerpt: settings.excerpt,
                    categories: settings.categories,
                    itemId: settings.itemId,
                    address: settings.location.address,
                    featuredImage: settings.featuredImage,
                    itemUrl: settings.itemUrl
                };

                var customMarker = new CustomMarker({
                    map: map,
                    position: latLong,
                    templateData: templateData,
                    markerPin: settings.markerPin
                });

                this.initMarkerInfo();
            }
        },

        /**
         * Returns map with multiple addresses
         *
         * @param options
         */
        getDirectoryItemsAddresses: function (options) {
            var defaults = {
                geolocation: false,
                mapHolder: 'mkdf-destination-multiple-map-holder',
                addresses: mkdfMultipleMapVars.multiple.addresses,
                draggable: mkdfMapsVars.global.draggable,
                mapTypeControl: mkdfMapsVars.global.mapTypeControl,
                scrollwheel: mkdfMapsVars.global.scrollable,
                streetViewControl: mkdfMapsVars.global.streetViewControl,
                zoomControl: mkdfMapsVars.global.zoomControl,
                zoom: 16,
                styles: mkdfMapsVars.global.mapStyle,
                radius: 50, //radius for marker visibility, in km
                hasFilter: false
            };
            var settings = $.extend({}, defaults, options);

            //Get map holder
            var mapHolder = document.getElementById(settings.mapHolder);

            //Initialize map
            var map = new google.maps.Map(mapHolder, {
                zoom: settings.zoom,
                draggable: settings.draggable,
                mapTypeControl: settings.mapTypeControl,
                scrollwheel: settings.scrollwheel,
                streetViewControl: settings.streetViewControl,
                zoomControl: settings.zoomControl
            });

            //Save variables for later usage
            this.mapHolder = settings.mapHolder;
            this.map = map;
            this.radius = settings.radius;

            //Set map style
            map.setOptions({
                styles: settings.styles
            });

            //If geolocation enabled set map center to user location
            if (navigator.geolocation && settings.geolocation) {
                this.centerOnCurrentLocation();
            }

            //Filter addresses, remove items without latitude and longitude
            var addresses = [];

            if (typeof settings.addresses !== 'undefined') {
                var addressesLength = settings.addresses.length;

                if (settings.addresses.length !== null) {
                    for (var i = 0; i < addressesLength; i++) {
                        var location = settings.addresses[i].location;

                        if (typeof location !== 'undefined' && location !== null) {

                            if (location.latitude !== '' && location.longitude !== '') {
                                addresses.push(settings.addresses[i]);
                            }
                        }
                    }
                }
            }

            //Center map and set borders of map
            this.setMapBounds(addresses);

            //Add markers to the map
            this.addMultipleMarkers(addresses);
        },

        /**
         * Add multiple markers to map
         */
        addMultipleMarkers: function (markersData) {
            var map = this.map;
            var markers = [];
            //Loop through markers
            var len = markersData.length;

            for (var i = 0; i < len; i++) {
                var latLng = {
                    lat: parseFloat(markersData[i].location.latitude),
                    lng: parseFloat(markersData[i].location.longitude)
                };

                //Custom html markers
                //Insert marker data into info window template
                var templateData = {
                    title: markersData[i].title,
                    excerpt: markersData[i].excerpt,
                    categories: markersData[i].categories,
                    itemId: markersData[i].itemId,
                    address: markersData[i].location.address,
                    featuredImage: markersData[i].featuredImage,
                    itemUrl: markersData[i].itemUrl,
                    latLng: latLng
                };

                var customMarker = new CustomMarker({
                    position: latLng,
                    map: map,
                    templateData: templateData,
                    markerPin: markersData[i].markerPin
                });

                markers.push(customMarker);
            }

            this.markers = markers;

            //Init map clusters ( Grouping map markers at small zoom values )
            this.initMapClusters();

            //Init marker info
            this.initMarkerInfo();

            //Init marker info close
            this.initMarkerInfoClose();
        },

        /**
         * Set map bounds for Map with multiple markers
         *
         * @param addressesArray
         */
        setMapBounds: function (addressesArray) {
            var bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < addressesArray.length; i++) {
                bounds.extend(new google.maps.LatLng(parseFloat(addressesArray[i].location.latitude), parseFloat(addressesArray[i].location.longitude)));
            }

            this.map.fitBounds(bounds);
        },

        /**
         * Init map clusters for grouping markers on small zoom values
         */
        initMapClusters: function () {

            //Activate clustering on multiple markers
            var markerClusteringOptions = {
                minimumClusterSize: 2,
                maxZoom: 12,
                styles: [{
                    width: 50,
                    height: 60,
                    url: '',
                    textSize: 12
                }]
            };

            var markerClusterer = new MarkerClusterer(this.map, this.markers, markerClusteringOptions);
        },

        initMarkerInfo: function () {

            var map = this.map;

            google.maps.event.addListenerOnce(map, 'idle', function(){
                $('.mkdf-map-marker-holder').parent().addClass('mkdf-to-front');
            });

            $(document).off('click', '.mkdf-map-marker').on('click', '.mkdf-map-marker', function () {
                var self = $(this),
                    markerHolders = $('.mkdf-map-marker-holder'),
                    infoWindows = $('.mkdf-info-window'),
                    markerHolder = self.parent('.mkdf-map-marker-holder'),
                    markerlatlngData = markerHolder.data('latlng'),
                    infoWindow = self.siblings('.mkdf-info-window');

                if (markerHolder.hasClass('mkdf-active mkdf-map-active')) {
                    markerHolder.removeClass('mkdf-active mkdf-map-active');
                    infoWindow.fadeOut(0);
                } else {
                    markerHolders.removeClass('mkdf-active mkdf-map-active');
                    infoWindows.fadeOut(0);
                    markerHolder.addClass('mkdf-active mkdf-map-active');
                    markerHolder.parent().addClass('mkdf-to-front');
                    infoWindow.fadeIn(300);

                    if (markerlatlngData.length && markerlatlngData !== undefined) {
                        var latlngStr = markerlatlngData.replace('(', '').replace(')', '').split(',', 2);
                        var lat = parseFloat(latlngStr[0]);
                        var lng = parseFloat(latlngStr[1]);

                        map.panTo(new google.maps.LatLng(lat, lng));
                    }
                }
            });

        },

        initMarkerInfoClose: function () {

            $(document).on('click', '.icon_close', function () {

                var self = $(this),
                    markerHolder = self.parents('.mkdf-map-marker-holder'),
                    infoWindow = self.parents('.mkdf-info-window');


                if (markerHolder.hasClass('mkdf-active mkdf-map-active')) {
                    markerHolder.removeClass('mkdf-active mkdf-map-active');
                    markerHolder.parent().removeClass('mkdf-to-front');
                    infoWindow.fadeOut(0);
                }
            });
        },

        /**
         * If geolocation enabled center map on users current position
         */
        centerOnCurrentLocation: function (setInputAddressValue, placesInput, geoLocationLinkIcon, destinationListHolder) {
            var map = this.map;

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                if (setInputAddressValue) {
                    geoLocationLinkIcon.addClass('fa-spinner fa-spin');
                }

                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        var lat = position.coords.latitude,
                            lng = position.coords.longitude,
                            latlng = {
                                lat: lat,
                                lng: lng
                            };

                        if (setInputAddressValue) {
                            var geocoder = new google.maps.Geocoder(),
                                cityName = '',
                                cityWithCountryName = '';

                            geocoder.geocode({'latLng': new google.maps.LatLng(lat, lng)}, function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK && typeof results === 'object') {
                                    var resultsObject = results;

                                    for (var $i = 0; $i <= resultsObject.length; $i++) {
                                        var result = resultsObject[$i];

                                        if (typeof result === 'object' && result.types[0] === 'locality') {
                                            var currentAddress = result.address_components;

                                            cityName = currentAddress[0].long_name;

                                            for (var $j = 0; $j <= currentAddress.length; $j++) {
                                                if (typeof currentAddress[$j] === 'object' && currentAddress[$j].types[0] === 'country') {
                                                    cityWithCountryName = cityName + ',' + currentAddress[$j].long_name;
                                                }
                                            }
                                        }
                                    }

                                    if (typeof cityName === 'string') {
                                        geoLocationLinkIcon.removeClass('fa-spinner fa-spin');

                                        if (typeof cityWithCountryName === 'string') {
                                            placesInput.val(cityWithCountryName);
                                        } else {
                                            placesInput.val(cityName);
                                        }

                                        // ReInit destination list and map
                                        if (destinationListHolder) {
                                            var locationObject = [];

                                            locationObject.push(cityName);
                                            locationObject.push(latlng);
                                            locationObject.push(true);

                                            mkdf.modules.destinationList.mkdfInitGeoLocationRangeSlider().showRangeSlider(latlng, true);
                                            mkdf.modules.destinationList.mkdfInitDestinationListPagination().getMainPagFunction(destinationListHolder, 1, true, locationObject);
                                        }
                                    }
                                }
                            });
                        } else {
                            map.setCenter(latlng);
                        }
                    }
                );
            }
        },

        /**
         * Center map on forward location position
         */
        centerOnForwardLocation: function (forwardLocation, markerEnabled, addressName) {
            var map = this.map;

            if (typeof forwardLocation === 'object') {

                if (markerEnabled) {
                    var customMarker = new CustomMarker({
                        map: map,
                        position: forwardLocation,
                        templateData: {
                            title: 'Your location is here',
                            excerpt: '',
                            categories: '',
                            itemId: 'mkdf-geo-location-marker',
                            address: addressName,
                            featuredImage: '',
                            itemUrl: ''
                        }
                    });

                    destinationMaps.mkdfGoogleMaps.initMarkerInfo();
                }

                map.setZoom(12);
                map.setCenter(forwardLocation);
            }
        },

        /**
         * Center map on forward address name location
         */
        centerOnForwardAddressLocation: function (addressName) {

            if (typeof addressName === 'string' && typeof google === 'object') {
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({'address': addressName}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK && typeof results[0] === 'object') {
                        destinationMaps.mkdfGoogleMaps.centerOnForwardLocation(results[0].geometry.location);
                    }
                });
            }
        },

        /**
         * Set radius for current geo location location
         */
        setGeoLocationRadius: function (forwardLocation, radius, isActive) {
            var map = this.map,
                circle = this.circle,
                markers = this.markers;

            if (typeof forwardLocation === 'object' && typeof google === 'object') {

                if (isActive) {
                    circle.setMap(null);
                }

                this.circle = new google.maps.Circle({
                    map: map,
                    center: forwardLocation,
                    radius: parseInt(radius, 10) * 1000, // 1000 change meters to kilometers
                    strokeWeight: 0,
                    fillColor: '#fc475f',
                    fillOpacity: 0.15
                });

                var currentCircle = this.circle;

                var itemsInArea = [];
                $.each(markers, function(i,marker) {
                    if (currentCircle.getBounds().contains(marker.latlng)) {
                        itemsInArea.push(marker.templateData.itemId);
                    }
                });

                mkdf.modules.destinationList.mkdfInitGeoLocationRangeSlider().disableItemsOutOfRange(itemsInArea);
            }
        },

        /**
         * Create autocomplete places for forward input field
         */
        createAutocompletePlaces: function (placeInputID, destinationListHolder) {

            if (typeof google === 'object' && typeof google.maps.places === 'object') {
                var autocompleteConfig = {
                    types: ['(cities)']
                };

                var autocomplete = new google.maps.places.Autocomplete(placeInputID, autocompleteConfig);

                autocomplete.addListener('place_changed', function () {
                    // Enable reset icon in field
                    $(placeInputID).next().show();

                    if (destinationListHolder) {
                        var place = autocomplete.getPlace();

                        if (!place.geometry) {
                            window.alert("No details available for input: '" + place.name + "'");
                            return;
                        }

                        var locationObject = [];

                        locationObject.push(place.address_components[0].short_name);
                        locationObject.push(place.geometry.location);
                        locationObject.push(false);

                        // ReInit destination list and map
                        mkdf.modules.destinationList.mkdfInitGeoLocationRangeSlider().reset();
                        mkdf.modules.destinationList.mkdfInitDestinationListPagination().getMainPagFunction(destinationListHolder, 1, true, locationObject);
                    }
                });
            }
        }
    };

})(jQuery);
// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3_3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0.2
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'imagePath': (string) The base URL where the images representing
 *                  clusters will be found. The full URL will be:
 *                  {imagePath}[1-5].{imageExtension}
 *                  Default: '../images/m'.
 *     'imageExtension': (string) The suffix for images URL representing
 *                       clusters will be found. See _imagePath_ for details.
 *                       Default: 'png'.
 *     'averageCenter': (boolean) Whether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = map;

    /**
     * @type {Array.<google.maps.Marker>}
     * @private
     */
    this.markers_ = [];

    /**
     *  @type {Array.<Cluster>}
     */
    this.clusters_ = [];

    this.sizes = [53, 56, 66, 78, 90];

    /**
     * @private
     */
    this.styles_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.ready_ = false;

    var options = opt_options || {};

    /**
     * @type {number}
     * @private
     */
    this.gridSize_ = options['gridSize'] || 60;

    /**
     * @private
     */
    this.minClusterSize_ = options['minimumClusterSize'] || 2;


    /**
     * @type {?number}
     * @private
     */
    this.maxZoom_ = options['maxZoom'] || null;

    this.styles_ = options['styles'] || [];

    /**
     * @type {string}
     * @private
     */
    this.imagePath_ = options['imagePath'] ||
        this.MARKER_CLUSTER_IMAGE_PATH_;

    /**
     * @type {string}
     * @private
     */
    this.imageExtension_ = options['imageExtension'] ||
        this.MARKER_CLUSTER_IMAGE_EXTENSION_;

    /**
     * @type {boolean}
     * @private
     */
    this.zoomOnClick_ = true;

    if (options['zoomOnClick'] != undefined) {
        this.zoomOnClick_ = options['zoomOnClick'];
    }

    /**
     * @type {boolean}
     * @private
     */
    this.averageCenter_ = false;

    if (options['averageCenter'] != undefined) {
        this.averageCenter_ = options['averageCenter'];
    }

    this.setupStyles_();

    this.setMap(map);

    /**
     * @type {number}
     * @private
     */
    this.prevZoom_ = this.map_.getZoom();

    // Add the map event listeners
    var that = this;
    google.maps.event.addListener(this.map_, 'zoom_changed', function () {
        // Determines map type and prevent illegal zoom levels
        var zoom = that.map_.getZoom();
        var minZoom = that.map_.minZoom || 0;
        var maxZoom = Math.min(that.map_.maxZoom || 100,
            that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom);
        zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

        if (that.prevZoom_ != zoom) {
            that.prevZoom_ = zoom;
            that.resetViewport();
        }
    });

    google.maps.event.addListener(this.map_, 'idle', function () {
        that.redraw();
    });

    // Finally, add the markers
    if (opt_markers && (opt_markers.length || Object.keys(opt_markers).length)) {
        this.addMarkers(opt_markers, false);
    }
}


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = '../images/m';


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return (function (object) {
        for (var property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }).apply(obj1, [obj2]);
};


/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
    this.setReady_(true);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () {
};

/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function () {
    if (this.styles_.length) {
        return;
    }

    for (var i = 0, size; size = this.sizes[i]; i++) {
        this.styles_.push({
            url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
            height: size,
            width: size
        });
    }
};

/**
 *  Fit the map to the bounds of the markers in the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }

    this.map_.fitBounds(bounds);
};


/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
};


/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};


/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function () {
    return this.zoomOnClick_;
};

/**
 * Whether average center is set.
 *
 * @return {boolean} True if averageCenter_ is set.
 */
MarkerClusterer.prototype.isAverageCenter = function () {
    return this.averageCenter_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 *  Returns the number of markers in the clusterer
 *
 *  @return {Number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};


/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
};


/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
};


/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function (markers, numStyles) {
    var index = 0;
    var count = markers.length;
    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }

    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index
    };
};


/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *     calculator. The function should return a object properties:
 *     'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
};


/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};


/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    if (markers.length) {
        for (var i = 0, marker; marker = markers[i]; i++) {
            this.pushMarkerTo_(marker);
        }
    } else if (Object.keys(markers).length) {
        for (var marker in markers) {
            this.pushMarkerTo_(markers[marker]);
        }
    }
    if (!opt_nodraw) {
        this.redraw();
    }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    marker.isAdded = false;
    if (marker['draggable']) {
        // If the marker is draggable add a listener so we update the clusters on
        // the drag end.
        var that = this;
        google.maps.event.addListener(marker, 'dragend', function () {
            marker.isAdded = false;
            that.repaint();
        });
    }
    this.markers_.push(marker);
};


/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
        this.redraw();
    }
};


/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var index = -1;
    if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                index = i;
                break;
            }
        }
    }

    if (index == -1) {
        // Marker is not in our list of markers.
        return false;
    }

    marker.setMap(null);

    this.markers_.splice(index, 1);

    return true;
};


/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    } else {
        return false;
    }
};


/**
 * Removes an array of markers from the cluster.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    // create a local copy of markers if required
    // (removeMarker_ modifies the getMarkers() array in place)
    var markersCopy = markers === this.getMarkers() ? markers.slice() : markers;
    var removed = false;

    for (var i = 0, marker; marker = markersCopy[i]; i++) {
        var r = this.removeMarker_(marker);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    }
};


/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function (ready) {
    if (!this.ready_) {
        this.ready_ = ready;
        this.createClusters_();
    }
};


/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};


/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function () {
    return this.map_;
};


/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function (map) {
    this.map_ = map;
};


/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};


/**
 * Sets the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (size) {
    this.gridSize_ = size;
};


/**
 * Returns the min cluster size.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getMinClusterSize = function () {
    return this.minClusterSize_;
};

/**
 * Sets the min cluster size.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setMinClusterSize = function (size) {
    this.minClusterSize_ = size;
};


/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
        bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
        bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
};


/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
};


/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport(true);

    // Set the markers a empty array.
    this.markers_ = [];
};


/**
 * Clears all existing clusters and recreates them.
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerClusterer.prototype.resetViewport = function (opt_hide) {
    // Remove all the clusters
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        cluster.remove();
    }

    // Reset the markers to not be added and to be invisible.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        marker.isAdded = false;
        if (opt_hide) {
            marker.setMap(null);
        }
    }

    this.clusters_ = [];
};

/**
 *
 */
MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_.length = 0;
    this.resetViewport();
    this.redraw();

    // Remove the old clusters.
    // Do it in a timeout so the other clusters have been drawn first.
    window.setTimeout(function () {
        for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
            cluster.remove();
        }
    }, 0);
};


/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function () {
    this.createClusters_();
};


/**
 * Calculates the distance between two latlng locations in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @private
 */
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    if (!p1 || !p2) {
        return 0;
    }

    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};


/**
 * Add a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    var pos = marker.getPosition();
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        var center = cluster.getCenter();
        if (center) {
            var d = this.distanceBetweenPoints_(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        var cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
    }
};


/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function () {
    if (!this.ready_) {
        return;
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
        this.map_.getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);

    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
            this.addToClosestCluster_(marker);
        }
    }
};


/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
    this.markerClusterer_ = markerClusterer;
    this.map_ = markerClusterer.getMap();
    this.gridSize_ = markerClusterer.getGridSize();
    this.minClusterSize_ = markerClusterer.getMinClusterSize();
    this.averageCenter_ = markerClusterer.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
        markerClusterer.getGridSize());
}

/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
    if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) != -1;
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function (marker) {
    if (this.isMarkerAlreadyAdded(marker)) {
        return false;
    }

    if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
    } else {
        if (this.averageCenter_) {
            var l = this.markers_.length + 1;
            var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
            var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
            this.center_ = new google.maps.LatLng(lat, lng);
            this.calculateBounds_();
        }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    var len = this.markers_.length;
    if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
        // Min cluster size not reached so show the marker.
        marker.setMap(this.map_);
    }

    if (len == this.minClusterSize_) {
        // Hide the markers that were showing.
        for (var i = 0; i < len; i++) {
            this.markers_[i].setMap(null);
        }
    }

    if (len >= this.minClusterSize_) {
        marker.setMap(null);
    }

    this.updateIcon();
    return true;
};


/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }
    return bounds;
};


/**
 * Removes the cluster
 */
Cluster.prototype.remove = function () {
    this.clusterIcon_.remove();
    this.markers_.length = 0;
    delete this.markers_;
};


/**
 * Returns the number of markers in the cluster.
 *
 * @return {number} The number of markers in the cluster.
 */
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};


/**
 * Returns a list of the markers in the cluster.
 *
 * @return {Array.<google.maps.Marker>} The markers in the cluster.
 */
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function () {
    return this.center_;
};


/**
 * Calculated the extended bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
};


/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function () {
    return this.map_;
};


/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function () {
    var zoom = this.map_.getZoom();
    var mz = this.markerClusterer_.getMaxZoom();

    if (mz && zoom > mz) {
        // The zoom is greater than our max zoom so show all the markers in cluster.
        for (var i = 0, marker; marker = this.markers_[i]; i++) {
            marker.setMap(this.map_);
        }
        return;
    }

    if (this.markers_.length < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.setSums(sums);
    this.clusterIcon_.show();
};


/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.styles_ = styles;
    this.padding_ = opt_padding || 0;
    this.cluster_ = cluster;
    this.center_ = null;
    this.map_ = cluster.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(this.map_);
}


/**
 * Triggers the clusterclick event and zoom's if the option is set.
 */
ClusterIcon.prototype.triggerClusterClick = function () {
    var markerClusterer = this.cluster_.getMarkerClusterer();

    // Trigger the clusterclick event.
    google.maps.event.trigger(markerClusterer.map_, 'clusterclick', this.cluster_);

    if (markerClusterer.isZoomOnClick()) {
        // Zoom into the cluster.
        this.map_.fitBounds(this.cluster_.getBounds());
    }
};


/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function () {
    this.div_ = document.createElement('DIV');
    this.div_.className = 'mkdf-cluster-marker';
    if (this.visible_) {
        var clusterItems = this.cluster_.markers_;
        var clusterItemsIDs = [];

        if (typeof clusterItems === 'object') {
            for (var $i = 0; $i < clusterItems.length; $i++){
                clusterItemsIDs.push(clusterItems[$i].templateData.itemId);
            }
        }

        this.div_.setAttribute('data-item-ids', clusterItemsIDs);

        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.innerHTML = '<div class="mkdf-cluster-marker-inner">' +
            '<span class="mkdf-cluster-marker-number">' + this.sums_.text + '</span>' +
            '<span class="mkdf-cluster-marker-spiner"></span>' +
            '</div>';
    }

    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);

    var that = this;
    google.maps.event.addDomListener(this.div_, 'click', function () {
        that.triggerClusterClick();
    });
};


/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
    return pos;
};


/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + 'px';
        this.div_.style.left = pos.x + 'px';
        this.div_.style.zIndex = google.maps.Marker.MAX_ZINDEX + 1;
    }
};


/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.display = 'none';
    }
    this.visible_ = false;
};


/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.style.display = '';
    }
    this.visible_ = true;
};


/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function () {
    this.setMap(null);
};


/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.hide();
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};


/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function (sums) {
    this.sums_ = sums;
    this.text_ = sums.text;
    this.index_ = sums.index;
    if (this.div_) {
        this.div_.innerHTML = sums.text;
    }

    this.useStyle();
};


/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function () {
    var index = Math.max(0, this.sums_.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style['url'];
    this.height_ = style['height'];
    this.width_ = style['width'];
    this.textColor_ = style['textColor'];
    this.anchor_ = style['anchor'];
    this.textSize_ = style['textSize'];
    this.backgroundPosition_ = style['backgroundPosition'];
};


/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
};


/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    style.push('background-image:url(' + this.url_ + ');');
    var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
    style.push('background-position:' + backgroundPosition + ';');

    if (typeof this.anchor_ === 'object') {
        if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
            this.anchor_[0] < this.height_) {
            style.push('height:' + (this.height_ - this.anchor_[0]) +
                'px; padding-top:' + this.anchor_[0] + 'px;');
        } else {
            style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
                'px;');
        }
        if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
            this.anchor_[1] < this.width_) {
            style.push('width:' + (this.width_ - this.anchor_[1]) +
                'px; padding-left:' + this.anchor_[1] + 'px;');
        } else {
            style.push('width:' + this.width_ + 'px; text-align:center;');
        }
    } else {
        style.push('height:' + this.height_ + 'px; line-height:' +
            this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    }

    var txtColor = this.textColor_ ? this.textColor_ : 'black';
    var txtSize = this.textSize_ ? this.textSize_ : 11;

    style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
        pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
        txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
    return style.join('');
};


// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
var window = window || {};
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] =
    MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['fitMapToMarkers'] =
    MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype['getCalculator'] =
    MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] =
    MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getExtendedBounds'] =
    MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] =
    MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] =
    MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] =
    MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['removeMarkers'] =
    MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype['resetViewport'] =
    MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['repaint'] =
    MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype['setCalculator'] =
    MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] =
    MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['setMaxZoom'] =
    MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
Cluster.prototype['getSize'] = Cluster.prototype.getSize;
Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;

Object.keys = Object.keys || function (o) {
    var result = [];
    for (var name in o) {
        if (o.hasOwnProperty(name))
            result.push(name);
    }
    return result;
};

if (typeof module === 'object') {
    module.exports = MarkerClusterer;
}
(function($) {
    'use strict';
	
	var accordions = {};
	mkdf.modules.accordions = accordions;
	
	accordions.mkdfInitAccordions = mkdfInitAccordions;
	
	
	accordions.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitAccordions();
	}
	
	/**
	 * Init accordions shortcode
	 */
	function mkdfInitAccordions(){
		var accordion = $('.mkdf-accordion-holder');
		
		if(accordion.length){
			accordion.each(function(){
				var thisAccordion = $(this);

				if(thisAccordion.hasClass('mkdf-accordion')){
					thisAccordion.accordion({
						animate: "swing",
						collapsible: true,
						active: 0,
						icons: "",
						heightStyle: "content"
					});
				}

				if(thisAccordion.hasClass('mkdf-toggle')){
					var toggleAccordion = $(this),
						toggleAccordionTitle = toggleAccordion.find('.mkdf-accordion-title'),
						toggleAccordionContent = toggleAccordionTitle.next();

					toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
					toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
					toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

					toggleAccordionTitle.each(function(){
						var thisTitle = $(this);

						thisTitle.mouseenter(function() {
							thisTitle.addClass("ui-state-hover");
						})
						.mouseleave(function() {
							thisTitle.removeClass("ui-state-hover");
						});

						thisTitle.on('click',function(){
							thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
							thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
						});
					});
				}
			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var button = {};
	mkdf.modules.button = button;
	
	button.mkdfButton = mkdfButton;
	
	
	button.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfButton().init();
	}
	
	/**
	 * Button object that initializes whole button functionality
	 * @type {Function}
	 */
	var mkdfButton = function() {
		//all buttons on the page
		var buttons = $('.mkdf-btn');
		
		/**
		 * Initializes button hover color
		 * @param button current button
		 */
		var buttonHoverColor = function(button) {
			if(typeof button.data('hover-color') !== 'undefined') {
				var changeButtonColor = function(event) {
					event.data.button.css('color', event.data.color);
				};
				
				var originalColor = button.css('color');
				var hoverColor = button.data('hover-color');
				
				button.on('mouseenter', { button: button, color: hoverColor }, changeButtonColor);
				button.on('mouseleave', { button: button, color: originalColor }, changeButtonColor);
			}
		};
		
		/**
		 * Initializes button hover background color
		 * @param button current button
		 */
		var buttonHoverBgColor = function(button) {
			if(typeof button.data('hover-bg-color') !== 'undefined') {
				var changeButtonBg = function(event) {
					event.data.button.css('background-color', event.data.color);
				};
				
				var originalBgColor = button.css('background-color');
				var hoverBgColor = button.data('hover-bg-color');
				
				button.on('mouseenter', { button: button, color: hoverBgColor }, changeButtonBg);
				button.on('mouseleave', { button: button, color: originalBgColor }, changeButtonBg);
			}
		};
		
		/**
		 * Initializes button border color
		 * @param button
		 */
		var buttonHoverBorderColor = function(button) {
			if(typeof button.data('hover-border-color') !== 'undefined') {
				var changeBorderColor = function(event) {
					event.data.button.css('border-color', event.data.color);
				};
				
				var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
				var hoverBorderColor = button.data('hover-border-color');
				
				button.on('mouseenter', { button: button, color: hoverBorderColor }, changeBorderColor);
				button.on('mouseleave', { button: button, color: originalBorderColor }, changeBorderColor);
			}
		};
		
		return {
			init: function() {
				if(buttons.length) {
					buttons.each(function() {
						buttonHoverColor($(this));
						buttonHoverBgColor($(this));
						buttonHoverBorderColor($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
	'use strict';
	
	var countdown = {};
	mkdf.modules.countdown = countdown;
	
	countdown.mkdfInitCountdown = mkdfInitCountdown;
	
	
	countdown.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCountdown();
	}
	
	/**
	 * Countdown Shortcode
	 */
	function mkdfInitCountdown() {
		var countdowns = $('.mkdf-countdown'),
			date = new Date(),
			currentMonth = date.getMonth(),
			year,
			month,
			day,
			hour,
			minute,
			timezone,
			monthLabel,
			dayLabel,
			hourLabel,
			minuteLabel,
			secondLabel;
		
		if (countdowns.length) {
			countdowns.each(function(){
				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#'+countdownId),
					digitFontSize,
					labelFontSize;
				
				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');
				monthLabel = countdown.data('month-label');
				dayLabel = countdown.data('day-label');
				hourLabel = countdown.data('hour-label');
				minuteLabel = countdown.data('minute-label');
				secondLabel = countdown.data('second-label');
				digitFontSize = countdown.data('digit-size');
				labelFontSize = countdown.data('label-size');

				if( currentMonth !== month ) {
					month = month - 1;
				}
				
				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month, day, hour, minute, 44),
					labels: ['', monthLabel, '', dayLabel, hourLabel, minuteLabel, secondLabel],
					format: 'ODHMS',
					timezone: timezone,
					padZeroes: true,
					onTick: setCountdownStyle
				});
				
				function setCountdownStyle() {
					countdown.find('.countdown-amount').css({
						'font-size' : digitFontSize+'px',
						'line-height' : digitFontSize+'px'
					});
					countdown.find('.countdown-period').css({
						'font-size' : labelFontSize+'px'
					});
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var counter = {};
	mkdf.modules.counter = counter;
	
	counter.mkdfInitCounter = mkdfInitCounter;
	
	
	counter.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitCounter();
	}
	
	/**
	 * Counter Shortcode
	 */
	function mkdfInitCounter() {
		var counterHolder = $('.mkdf-counter-holder');
		
		if (counterHolder.length) {
			counterHolder.each(function() {
				var thisCounterHolder = $(this),
					thisCounter = thisCounterHolder.find('.mkdf-counter');
				
				thisCounterHolder.appear(function() {
					thisCounterHolder.css('opacity', '1');
					
					//Counter zero type
					if (thisCounter.hasClass('mkdf-zero-counter')) {
						var max = parseFloat(thisCounter.text());
						thisCounter.countTo({
							from: 0,
							to: max,
							speed: 1500,
							refreshInterval: 100
						});
					} else {
						thisCounter.absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					}
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var customFont = {};
	mkdf.modules.customFont = customFont;
	
	customFont.mkdfCustomFontResize = mkdfCustomFontResize;
	customFont.mkdfCustomFontTypeOut = mkdfCustomFontTypeOut;
	
	
	customFont.mkdfOnDocumentReady = mkdfOnDocumentReady;
	customFont.mkdfOnWindowLoad = mkdfOnWindowLoad;
	
	$(document).ready(mkdfOnDocumentReady);
	$(window).on('load', mkdfOnWindowLoad);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfCustomFontResize();
	}
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfCustomFontTypeOut();
	}
	
	/*
	 **	Custom Font resizing style
	 */
	function mkdfCustomFontResize() {
		var holder = $('.mkdf-custom-font-holder');
		
		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
				
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-custom-font-holder." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-custom-font-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-custom-font-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}
				
				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
	/*
	 * Init Type out functionality for Custom Font shortcode
	 */
	function mkdfCustomFontTypeOut() {
		var mkdfTyped = $('.mkdf-cf-typed');
		
		if (mkdfTyped.length) {
			mkdfTyped.each(function () {
				
				//vars
				var thisTyped = $(this),
					typedWrap = thisTyped.parent('.mkdf-cf-typed-wrap'),
					customFontHolder = typedWrap.parent('.mkdf-custom-font-holder'),
					str = [],
					string_1 = thisTyped.find('.mkdf-cf-typed-1').text(),
					string_2 = thisTyped.find('.mkdf-cf-typed-2').text(),
					string_3 = thisTyped.find('.mkdf-cf-typed-3').text(),
					string_4 = thisTyped.find('.mkdf-cf-typed-4').text();
				
				if (string_1.length) {
					str.push(string_1);
				}
				
				if (string_2.length) {
					str.push(string_2);
				}
				
				if (string_3.length) {
					str.push(string_3);
				}
				
				if (string_4.length) {
					str.push(string_4);
				}
				
				customFontHolder.appear(function () {
					thisTyped.typed({
						strings: str,
						typeSpeed: 90,
						backDelay: 700,
						loop: true,
						contentType: 'text',
						loopCount: false,
						cursorChar: '_'
					});
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';

	var elementsHolder = {};
	mkdf.modules.elementsHolder = elementsHolder;

	elementsHolder.mkdfInitElementsHolderResponsiveStyle = mkdfInitElementsHolderResponsiveStyle;


	elementsHolder.mkdfOnDocumentReady = mkdfOnDocumentReady;

	$(document).ready(mkdfOnDocumentReady);

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitElementsHolderResponsiveStyle();
	}

	/*
	 **	Elements Holder responsive style
	 */
	function mkdfInitElementsHolderResponsiveStyle(){
		var elementsHolder = $('.mkdf-elements-holder');

		if(elementsHolder.length){
			elementsHolder.each(function() {
				var thisElementsHolder = $(this),
					elementsHolderItem = thisElementsHolder.children('.mkdf-eh-item'),
					style = '',
					responsiveStyle = '';

				elementsHolderItem.each(function() {
					var thisItem = $(this),
						itemClass = '',
						largeLaptop = '',
						smallLaptop = '',
						ipadLandscape = '',
						ipadPortrait = '',
						mobileLandscape = '',
						mobilePortrait = '';

					if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
						itemClass = thisItem.data('item-class');
					}
					if (typeof thisItem.data('1400-1600') !== 'undefined' && thisItem.data('1400-1600') !== false) {
                        largeLaptop = thisItem.data('1400-1600');
					}
					if (typeof thisItem.data('1025-1399') !== 'undefined' && thisItem.data('1025-1399') !== false) {
						smallLaptop = thisItem.data('1025-1399');
					}
					if (typeof thisItem.data('769-1024') !== 'undefined' && thisItem.data('769-1024') !== false) {
						ipadLandscape = thisItem.data('769-1024');
					}
					if (typeof thisItem.data('681-768') !== 'undefined' && thisItem.data('681-768') !== false) {
						ipadPortrait = thisItem.data('681-768');
					}
					if (typeof thisItem.data('680') !== 'undefined' && thisItem.data('680') !== false) {
						mobileLandscape = thisItem.data('680');
					}

					if(largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {

						if(largeLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1400px) and (max-width: 1600px) {.mkdf-eh-item-content."+itemClass+" { padding: "+largeLaptop+" !important; } }";
						}
						if(smallLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1399px) {.mkdf-eh-item-content."+itemClass+" { padding: "+smallLaptop+" !important; } }";
						}
						if(ipadLandscape.length) {
							responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadLandscape+" !important; } }";
						}
						if(ipadPortrait.length) {
							responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.mkdf-eh-item-content."+itemClass+" { padding: "+ipadPortrait+" !important; } }";
						}
						if(mobileLandscape.length) {
							responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-eh-item-content."+itemClass+" { padding: "+mobileLandscape+" !important; } }";
						}
					}

                    if (typeof mkdf.modules.common.mkdfOwlSlider === "function") { // if owl function exist
                        var owl = thisItem.find('.mkdf-owl-slider');
                        if (owl.length) { // if owl is in elements holder
                            setTimeout(function () {
                                owl.trigger('refresh.owl.carousel'); // reinit owl
                            }, 100);
                        }
                    }

				});

				if(responsiveStyle.length) {
					style = '<style type="text/css">'+responsiveStyle+'</style>';
				}

				if(style.length) {
					$('head').append(style);
				}

			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var fullScreenSections = {};
	mkdf.modules.fullScreenSections = fullScreenSections;
	
	fullScreenSections.mkdfInitFullScreenSections = mkdfInitFullScreenSections;
	
	
	fullScreenSections.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitFullScreenSections();
	}
	
	/*
	 **	Init full screen sections shortcode
	 */
	function mkdfInitFullScreenSections(){
		var fullScreenSections = $('.mkdf-full-screen-sections');
		
		if(fullScreenSections.length){
			fullScreenSections.each(function() {
				var thisFullScreenSections = $(this),
					fullScreenSectionsWrapper = thisFullScreenSections.children('.mkdf-fss-wrapper'),
					fullScreenSectionsItems = fullScreenSectionsWrapper.children('.mkdf-fss-item'),
					fullScreenSectionsItemsNumber = fullScreenSectionsItems.length,
					fullScreenSectionsItemsHasHeaderStyle = fullScreenSectionsItems.hasClass('mkdf-fss-item-has-style'),
					enableContinuousVertical = false,
					enableNavigationData = '',
					enablePaginationData = '';
				
				var defaultHeaderStyle = '';
				if (mkdf.body.hasClass('mkdf-light-header')) {
					defaultHeaderStyle = 'light';
				} else if (mkdf.body.hasClass('mkdf-dark-header')) {
					defaultHeaderStyle = 'dark';
				}
				
				if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
					enableContinuousVertical = true;
				}
				if (typeof thisFullScreenSections.data('enable-navigation') !== 'undefined' && thisFullScreenSections.data('enable-navigation') !== false) {
					enableNavigationData = thisFullScreenSections.data('enable-navigation');
				}
				if (typeof thisFullScreenSections.data('enable-pagination') !== 'undefined' && thisFullScreenSections.data('enable-pagination') !== false) {
					enablePaginationData = thisFullScreenSections.data('enable-pagination');
				}
				
				var enableNavigation = enableNavigationData !== 'no',
					enablePagination = enablePaginationData !== 'no';
				
				fullScreenSectionsWrapper.fullpage({
					sectionSelector: '.mkdf-fss-item',
					scrollingSpeed: 1200,
					verticalCentered: false,
					continuousVertical: enableContinuousVertical,
					navigation: enablePagination,
					onLeave: function(index, nextIndex, direction){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle($(fullScreenSectionsItems[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, nextIndex);
						}
					},
					afterRender: function(){
						if(fullScreenSectionsItemsHasHeaderStyle) {
							checkFullScreenSectionsItemForHeaderStyle(fullScreenSectionsItems.first().data('header-style'), defaultHeaderStyle);
						}
						
						if(enableNavigation) {
							checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, 1);
							thisFullScreenSections.children('.mkdf-fss-nav-holder').css('visibility','visible');
						}
						
						fullScreenSectionsWrapper.css('visibility','visible');
					}
				});
				
				setResposniveData(thisFullScreenSections);
				
				if(enableNavigation) {
					thisFullScreenSections.find('#mkdf-fss-nav-up').on('click', function() {
						$.fn.fullpage.moveSectionUp();
						return false;
					});
					
					thisFullScreenSections.find('#mkdf-fss-nav-down').on('click', function() {
						$.fn.fullpage.moveSectionDown();
						return false;
					});
				}
			});
		}
	}
	
	function checkFullScreenSectionsItemForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
		} else {
			mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
		}
	}
	
	function checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, index){
		var thisHolder = thisFullScreenSections,
			thisHolderArrowsUp = thisHolder.find('#mkdf-fss-nav-up'),
			thisHolderArrowsDown = thisHolder.find('#mkdf-fss-nav-down'),
			enableContinuousVertical = false;
		
		if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
			enableContinuousVertical = true;
		}
		
		if (index === 1 && !enableContinuousVertical) {
			thisHolderArrowsUp.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(index !== fullScreenSectionsItemsNumber){
				thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else if (index === fullScreenSectionsItemsNumber && !enableContinuousVertical) {
			thisHolderArrowsDown.css({'opacity': '0', 'height': '0', 'visibility': 'hidden'});
			
			if(fullScreenSectionsItemsNumber === 2){
				thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			}
		} else {
			thisHolderArrowsUp.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
			thisHolderArrowsDown.css({'opacity': '1', 'height': 'auto', 'visibility': 'visible'});
		}
	}
	
	function setResposniveData(thisFullScreenSections) {
		var fullScreenSections = thisFullScreenSections.find('.mkdf-fss-item'),
			responsiveStyle = '',
			style = '';
		
		fullScreenSections.each(function(){
			var thisSection = $(this),
				itemClass = '',
				imageLaptop = '',
				imageTablet = '',
				imagePortraitTablet = '',
				imageMobile = '';
			
			if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
				itemClass = thisSection.data('item-class');
			}
			if (typeof thisSection.data('laptop-image') !== 'undefined' && thisSection.data('laptop-image') !== false) {
				imageLaptop = thisSection.data('laptop-image');
			}
			if (typeof thisSection.data('tablet-image') !== 'undefined' && thisSection.data('tablet-image') !== false) {
				imageTablet = thisSection.data('tablet-image');
			}
			if (typeof thisSection.data('tablet-portrait-image') !== 'undefined' && thisSection.data('tablet-portrait-image') !== false) {
				imagePortraitTablet = thisSection.data('tablet-portrait-image');
			}
			if (typeof thisSection.data('mobile-image') !== 'undefined' && thisSection.data('mobile-image') !== false) {
				imageMobile = thisSection.data('mobile-image');
			}
			
			if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {
				
				if (imageLaptop.length) {
					responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-fss-item." + itemClass + " { background-image: url(" + imageLaptop + ") !important; } }";
				}
				if (imageTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageTablet + ") !important; } }";
				}
				if (imagePortraitTablet.length) {
					responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imagePortraitTablet + ") !important; } }";
				}
				if (imageMobile.length) {
					responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-fss-item." + itemClass + " { background-image: url( " + imageMobile + ") !important; } }";
				}
			}
		});
		
		if (responsiveStyle.length) {
			style = '<style type="text/css">' + responsiveStyle + '</style>';
		}
		
		if (style.length) {
			$('head').append(style);
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var googleMap = {};
	mkdf.modules.googleMap = googleMap;
	
	googleMap.mkdfShowGoogleMap = mkdfShowGoogleMap;
	
	
	googleMap.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfShowGoogleMap();
	}
	
	/*
	 **	Show Google Map
	 */
	function mkdfShowGoogleMap(){
		var googleMap = $('.mkdf-google-map');
		
		if(googleMap.length){
			googleMap.each(function(){
				var element = $(this);
				
				var snazzyMapStyle = false;
				var snazzyMapCode  = '';
				if(typeof element.data('snazzy-map-style') !== 'undefined' && element.data('snazzy-map-style') === 'yes') {
					snazzyMapStyle = true;
					var snazzyMapHolder = element.parent().find('.mkdf-snazzy-map'),
						snazzyMapCodes  = snazzyMapHolder.val();
					
					if( snazzyMapHolder.length && snazzyMapCodes.length ) {
						snazzyMapCode = JSON.parse( snazzyMapCodes.replace(/`{`/g, '[').replace(/`}`/g, ']').replace(/``/g, '"').replace(/`/g, '') );
					}
				}
				
				var customMapStyle;
				if(typeof element.data('custom-map-style') !== 'undefined') {
					customMapStyle = element.data('custom-map-style');
				}
				
				var colorOverlay;
				if(typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
					colorOverlay = element.data('color-overlay');
				}
				
				var saturation;
				if(typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
					saturation = element.data('saturation');
				}
				
				var lightness;
				if(typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
					lightness = element.data('lightness');
				}
				
				var zoom;
				if(typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
					zoom = element.data('zoom');
				}
				
				var pin;
				if(typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
					pin = element.data('pin');
				}
				
				var mapHeight;
				if(typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
					mapHeight = element.data('height');
				}
				
				var uniqueId;
				if(typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
					uniqueId = element.data('unique-id');
				}
				
				var scrollWheel;
				if(typeof element.data('scroll-wheel') !== 'undefined') {
					scrollWheel = element.data('scroll-wheel');
				}
				var addresses;
				if(typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
					addresses = element.data('addresses');
				}
				
				var map = "map_"+ uniqueId;
				var geocoder = "geocoder_"+ uniqueId;
				var holderId = "mkdf-map-"+ uniqueId;
				
				mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin,  map, geocoder, addresses);
			});
		}
	}
	
	/*
	 **	Init Google Map
	 */
	function mkdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin,  map, geocoder, data){
		
		if(typeof google !== 'object') {
			return;
		}
		
		var mapStyles = [];
		if(snazzyMapStyle && snazzyMapCode.length) {
			mapStyles = snazzyMapCode;
		} else {
			mapStyles = [
				{
					stylers: [
						{hue: color },
						{saturation: saturation},
						{lightness: lightness},
						{gamma: 1}
					]
				}
			];
		}
		
		var googleMapStyleId;
		
		if(snazzyMapStyle || customMapStyle === 'yes'){
			googleMapStyleId = 'mkdf-style';
		} else {
			googleMapStyleId = google.maps.MapTypeId.ROADMAP;
		}
		
		wheel = wheel === 'yes';
		
		var qoogleMapType = new google.maps.StyledMapType(mapStyles, {name: "Google Map"});
		
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		
		if (!isNaN(height)){
			height = height + 'px';
		}
		
		var myOptions = {
			zoom: zoom,
			scrollwheel: wheel,
			center: latlng,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'mkdf-style'],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeId: googleMapStyleId
		};
		
		map = new google.maps.Map(document.getElementById(holderId), myOptions);
		map.mapTypes.set('mkdf-style', qoogleMapType);
		
		var index;
		
		for (index = 0; index < data.length; ++index) {
			mkdfInitializeGoogleAddress(data[index], pin, map, geocoder);
		}
		
		var holderElement = document.getElementById(holderId);
		holderElement.style.height = height;
	}
	
	/*
	 **	Init Google Map Addresses
	 */
	function mkdfInitializeGoogleAddress(data, pin, map, geocoder){
		if (data === '') {
			return;
		}
		
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<div id="bodyContent">'+
			'<p>'+data+'</p>'+
			'</div>'+
			'</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		geocoder.geocode( { 'address': data}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon:  pin,
					title: data.store_title
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});
				
				google.maps.event.addDomListener(window, 'resize', function() {
					map.setCenter(results[0].geometry.location);
				});
			}
		});
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var timeline = {};
	mkdf.modules.timeline = timeline;
	
	timeline.mkdfInitHorizontalTimeline = mkdfInitHorizontalTimeline;
	
	
	timeline.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitHorizontalTimeline();
	}
	
	function mkdfInitHorizontalTimeline() {
		var timelines = $('.mkdf-horizontal-timeline');
		
		timelines.each(function () {
			var timeline = $(this),
				children = $(this).find('.mkdf-ht-content-item'),
				childrenLength  = $(this).find('.mkdf-ht-content-item').length,
				timelineHolder = timeline.parent().parent(),
				itemDelayCounter = 0,
				timelineWidth = childrenLength * 423,
				thisDraggableWrapper = timeline.parent(),
				draggableOffset = thisDraggableWrapper.offset(),
				box = {
					x1: draggableOffset.left + (thisDraggableWrapper.outerWidth() - timelineWidth),
					y1: draggableOffset.top + (thisDraggableWrapper.outerHeight() - timeline.outerHeight()),
					x2: draggableOffset.left,
					y2: draggableOffset.top
				};
			
			timeline.draggable({
				containment: [box.x1 + 120, box.y1, box.x2, box.y2 ],
				axis: "x"
			});

			timelineHolder.css({'clip-path': 'inset(0 100% 0 0)', '-webkit-clip-path': 'inset(0 100% 0 0)'});
			
			timeline.appear(function() {
				timelineHolder.css({ 'clip-path': 'inset(0 0 0 0)', '-webkit-clip-path': 'inset(0 0 0 0)', 'transition': "clip-path " + childrenLength*.2 + 's linear' });
				$(this).css({'width': timelineWidth});

				children.each(function() {
					itemDelayCounter+=.4;
					$(this).css({'opacity': '1', 'transform': 'translateX(-66px) translateY(-10px)', 'transition': '.3s ' + itemDelayCounter + 's'});
				});

			}, {accX: 0, accY: 50});
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var icon = {};
	mkdf.modules.icon = icon;
	
	icon.mkdfIcon = mkdfIcon;
	
	
	icon.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfIcon().init();
	}
	
	/**
	 * Object that represents icon shortcode
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var mkdfIcon = function() {
		var icons = $('.mkdf-icon-shortcode');
		
		/**
		 * Function that triggers icon animation and icon animation delay
		 */
		var iconAnimation = function(icon) {
			if(icon.hasClass('mkdf-icon-animation')) {
				icon.appear(function() {
					icon.parent('.mkdf-icon-animation-holder').addClass('mkdf-icon-animation-show');
				}, {accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			}
		};
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var iconElement = icon.find('.mkdf-icon-element');
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};
		
		/**
		 * Function that triggers icon holder background color hover functionality
		 */
		var iconHolderBackgroundHover = function(icon) {
			if(typeof icon.data('hover-background-color') !== 'undefined') {
				var changeIconBgColor = function(event) {
					event.data.icon.css('background-color', event.data.color);
				};
				
				var hoverBackgroundColor = icon.data('hover-background-color');
				var originalBackgroundColor = icon.css('background-color');
				
				if(hoverBackgroundColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		};
		
		/**
		 * Function that initializes icon holder border hover functionality
		 */
		var iconHolderBorderHover = function(icon) {
			if(typeof icon.data('hover-border-color') !== 'undefined') {
				var changeIconBorder = function(event) {
					event.data.icon.css('border-color', event.data.color);
				};
				
				var hoverBorderColor = icon.data('hover-border-color');
				var originalBorderColor = icon.css('borderTopColor');
				
				if(hoverBorderColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBorderColor}, changeIconBorder);
					icon.on('mouseleave', {icon: icon, color: originalBorderColor}, changeIconBorder);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconAnimation($(this));
						iconHoverColor($(this));
						iconHolderBackgroundHover($(this));
						iconHolderBorderHover($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
	'use strict';
	
	var iconListItem = {};
	mkdf.modules.iconListItem = iconListItem;
	
	iconListItem.mkdfInitIconList = mkdfInitIconList;
	
	
	iconListItem.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitIconList().init();
	}
	
	/**
	 * Button object that initializes icon list with animation
	 * @type {Function}
	 */
	var mkdfInitIconList = function() {
		var iconList = $('.mkdf-animate-list');
		
		/**
		 * Initializes icon list animation
		 * @param list current slider
		 */
		var iconListInit = function(list) {
			setTimeout(function(){
				list.appear(function(){
					list.addClass('mkdf-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			},30);
		};
		
		return {
			init: function() {
				if(iconList.length) {
					iconList.each(function() {
						iconListInit($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
    'use strict';
    
    var imageMarquee = {};
    mkdf.modules.imageMarquee = imageMarquee;
    
    imageMarquee.mkdfInitImageMarquee = mkdfInitImageMarquee;
    
    imageMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;
    
    $(document).ready(mkdfOnDocumentReady);
    
    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitImageMarquee();
    }
    
    /**
     * Init Image Marquee effect
     */
    function mkdfInitImageMarquee() {
        var imageMarqueeShortcodes = $('.mkdf-image-marquee');

        if (imageMarqueeShortcodes.length) {

            imageMarqueeShortcodes.each(function(){
                var imageMarqueeShortcode = $(this),
                    marqueeElements = imageMarqueeShortcode.find('.mkdf-image'),
                    originalItem = marqueeElements.filter('.mkdf-original'),
                    auxItem = marqueeElements.filter('.mkdf-aux');

                var marqueeEffect = function () {
	                
                    var delta = 1, //pixel movement
                        speedCoeff = 0.8, // below 1 to slow down, above 1 to speed up
                        marqueeWidth = originalItem.width();

                    auxItem.css('width', marqueeWidth); //same width as the initial marquee element
                    auxItem.css('left', marqueeWidth); //set to the right of the initial marquee element

                    //movement loop
                    marqueeElements.each(function(i){
                        var marqueeElement = $(this),
							currentPos = 0,
							animFrame;

                        var mkdfInfiniteScrollEffect = function() {
                            currentPos -= delta;

                            //move marquee element
                            if (marqueeElement.position().left <= -marqueeWidth) {
                                marqueeElement.css('left', parseInt(marqueeWidth - delta));
                                currentPos = 0;
                            }

                            marqueeElement.css('transform','translate3d('+speedCoeff*currentPos+'px,0,0)');
	
	                        animFrame = requestAnimationFrame(mkdfInfiniteScrollEffect);
                        }; 
						animFrame = requestAnimationFrame(mkdfInfiniteScrollEffect);

						// Function to reset marquee on mobile orientation change
						function mkdfOrientationChange() {
							marqueeWidth = originalItem.width();
							currentPos = 0;
							originalItem.css('left',0); // reset
							auxItem.css('width', marqueeWidth); //same width as the initial marquee element
							auxItem.css('left', marqueeWidth); //set to the right of the inital marquee element
						}
						  
						window.addEventListener('orientationchange', mkdfOrientationChange);
						
						// Mobile Safari touch blocking fix
						mkdf.body.on('touchstart', function(e) {
							if(!$.contains(imageMarqueeShortcode.get(0), e.target)) {
								if (animFrame) {
									cancelAnimationFrame(animFrame);
									animFrame = null;
	
									setTimeout(function() {
										animFrame = requestAnimationFrame(mkdfInfiniteScrollEffect);
									}, 300);
								}
							}
						});
                    });
                };

                imageMarqueeShortcode.waitForImages(function(){
	                marqueeEffect();
	            });
            });
        }
    }
})(jQuery);
(function($) {
	'use strict';
	
	var imageShowcase = {};
	mkdf.modules.imageShowcase = imageShowcase;

	imageShowcase.mkdfInitImageShowcase = mkdfInitImageShowcase;

	imageShowcase.mkdfOnWindowLoad = mkdfOnWindowLoad;

	$(window).on('load', mkdfOnWindowLoad);

	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function mkdfOnWindowLoad() {
		mkdfInitImageShowcase();
	}

	/*
	 **	Init Image Showcase shortcode
	 */
	function mkdfInitImageShowcase(){
		var imageShowcase = $('.mkdf-image-showcase');

		if(imageShowcase.length) {
			imageShowcase.each(function() {

				var thisImageShowcase = $(this);

				if (mkdf.windowWidth > 1024 && thisImageShowcase.hasClass('mkdf-is-full-height')) {
					thisImageShowcase.closest('.vc_column_container').css({
						'position': 'fixed',
						'top': 0,
						'right': 0
					});
					thisImageShowcase.find('.mkdf-is-image').css('height', mkdf.windowHeight);
					thisImageShowcase.find('.mkdf-owl-slider').trigger('refresh.owl.carousel');
				}
				else if (mkdf.windowWidth <= 680) {
					var infoHeight = thisImageShowcase.find('.mkdf-is-image').outerHeight();
					thisImageShowcase.find('.owl-nav').css({
						'bottom': 'auto',
						'top': infoHeight,
						'transform': 'translateY(-100%)'
					});
				}
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var outlineText = {};
	mkdf.modules.outlineText = outlineText;
	
	outlineText.mkdfOutlineTextResize = mkdfOutlineTextResize;
	
	
	outlineText.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfOutlineTextResize();
	}
	
	/*
	 **	Outline Text resizing style
	 */
	function mkdfOutlineTextResize() {
		var holder = $('.mkdf-outline-text-holder');
		
		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
				
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-outline-text-holder." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-outline-text-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.mkdf-outline-text-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-outline-text-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}
				
				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var pieChart = {};
	mkdf.modules.pieChart = pieChart;
	
	pieChart.mkdfInitPieChart = mkdfInitPieChart;
	
	
	pieChart.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitPieChart();
	}
	
	/**
	 * Init Pie Chart shortcode
	 */
	function mkdfInitPieChart() {
		var pieChartHolder = $('.mkdf-pie-chart-holder');
		
		if (pieChartHolder.length) {
			pieChartHolder.each(function () {
				var thisPieChartHolder = $(this),
					pieChart = thisPieChartHolder.children('.mkdf-pc-percentage'),
					barColor = '#25abd1',
					trackColor = '#f7f7f7',
					lineWidth = 3,
					size = 176;
				
				if(typeof pieChart.data('size') !== 'undefined' && pieChart.data('size') !== '') {
					size = pieChart.data('size');
				}
				
				if(typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
					barColor = pieChart.data('bar-color');
				}
				
				if(typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
					trackColor = pieChart.data('track-color');
				}
				
				pieChart.appear(function() {
					initToCounterPieChart(pieChart);
					thisPieChartHolder.css('opacity', '1');
					
					pieChart.easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: lineWidth,
						animate: 1500,
						size: size
					});
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
	/*
	 **	Counter for pie chart number from zero to defined number
	 */
	function initToCounterPieChart(pieChart){
		var counter = pieChart.find('.mkdf-pc-percent'),
			max = parseFloat(counter.text());
		
		counter.countTo({
			from: 0,
			to: max,
			speed: 1500,
			refreshInterval: 50
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var process = {};
	mkdf.modules.process = process;
	
	process.mkdfInitProcess = mkdfInitProcess;
	
	
	process.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProcess();
	}
	
	/**
	 * Inti process shortcode on appear
	 */
	function mkdfInitProcess() {
		var holder = $('.mkdf-process-holder');
		
		if(holder.length) {
			holder.each(function(){
				var thisHolder = $(this);
				
				thisHolder.appear(function(){
					thisHolder.addClass('mkdf-process-appeared');
				},{accX: 0, accY: mkdfGlobalVars.vars.mkdfElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var progressBar = {};
	mkdf.modules.progressBar = progressBar;
	
	progressBar.mkdfInitProgressBars = mkdfInitProgressBars;
	
	
	progressBar.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitProgressBars();
	}
	
	/*
	 **	Horizontal progress bars shortcode
	 */
	function mkdfInitProgressBars() {
		var progressBar = $('.mkdf-progress-bar');
		
		if (progressBar.length) {
			progressBar.each(function () {
				var thisBar = $(this),
					thisBarContent = thisBar.find('.mkdf-pb-content'),
					progressBar = thisBar.find('.mkdf-pb-percent'),
					percentage = thisBarContent.data('percentage');
				
				thisBar.appear(function () {
					mkdfInitToCounterProgressBar(progressBar, percentage);
					
					thisBarContent.css('width', '0%').animate({'width': percentage + '%'}, 2000);
					
					if (thisBar.hasClass('mkdf-pb-percent-floating')) {
						progressBar.css('left', '0%').animate({'left': percentage + '%'}, 2000);
					}
				});
			});
		}
	}
	
	/*
	 **	Counter for horizontal progress bars percent from zero to defined percent
	 */
	function mkdfInitToCounterProgressBar(progressBar, percentageValue){
		var percentage = parseFloat(percentageValue);
		
		if(progressBar.length) {
			progressBar.each(function() {
				var thisPercent = $(this);
				thisPercent.css('opacity', '1');
				
				thisPercent.countTo({
					from: 0,
					to: percentage,
					speed: 2000,
					refreshInterval: 50
				});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var tabs = {};
	mkdf.modules.tabs = tabs;
	
	tabs.mkdfInitTabs = mkdfInitTabs;
	
	
	tabs.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitTabs();
	}
	
	/*
	 **	Init tabs shortcode
	 */
	function mkdfInitTabs(){
		var tabs = $('.mkdf-tabs');
		
		if(tabs.length){
			tabs.each(function(){
				var thisTabs = $(this);
				
				thisTabs.children('.mkdf-tab-container').each(function(index){
					index = index + 1;
					var that = $(this),
						link = that.attr('id'),
						navItem = that.parent().find('.mkdf-tabs-nav li:nth-child('+index+') a'),
						navLink = navItem.attr('href');
					
					link = '#'+link;

					if(link.indexOf(navLink) > -1) {
						navItem.attr('href',link);
					}
				});
				
				thisTabs.tabs();

                $('.mkdf-tabs a.mkdf-external-link').unbind('click');
			});
		}
	}
	
})(jQuery);
(function ($) {
    'use strict';
    
    var textMarquee = {};
    mkdf.modules.textMarquee = textMarquee;
    
    textMarquee.mkdfTextMarquee = mkdfTextMarquee;
    
    textMarquee.mkdfOnDocumentReady = mkdfOnDocumentReady;
    
    $(document).ready(mkdfOnDocumentReady);
    
    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTextMarquee().init();
        mkdfMarqueeTextResize();
    }

    /*
     ** Custom Font resizing
     */
    function mkdfMarqueeTextResize() {
        var marqueeText = $('.mkdf-text-marquee');

        if (marqueeText.length) {
            marqueeText.each(function () {
                var thisMarqueeText = $(this);
                var fontSize;
                var lineHeight;
                var coef1 = 1;
                var coef2 = 1;

                if (mkdf.windowWidth < 1480) {
                    coef1 = 0.8;
                }

                if (mkdf.windowWidth < 1200) {
                    coef1 = 0.7;
                }

                if (mkdf.windowWidth < 768) {
                    coef1 = 0.55;
                    coef2 = 0.65;
                }

                if (mkdf.windowWidth < 600) {
                    coef1 = 0.45;
                    coef2 = 0.55;
                }

                if (mkdf.windowWidth < 480) {
                    coef1 = 0.4;
                    coef2 = 0.5;
                }

                fontSize = parseInt(thisMarqueeText.css('font-size'));

                if (fontSize > 200) {
                    fontSize = Math.round(fontSize * coef1);
                } else if (fontSize > 60) {
                    fontSize = Math.round(fontSize * coef2);
                }

                thisMarqueeText.css('font-size', fontSize + 'px');

                lineHeight = parseInt(thisMarqueeText.css('line-height'));

                if (lineHeight > 70 && mkdf.windowWidth < 1440) {
                    lineHeight = '1.2em';
                } else if (lineHeight > 35 && mkdf.windowWidth < 768) {
                    lineHeight = '1.2em';
                } else {
                    lineHeight += 'px';
                }

                thisMarqueeText.css('line-height', lineHeight);

            });
        }
    }

    /**
     * Init Text Marquee effect
     */
    function mkdfTextMarquee() {
        var marquees = $('.mkdf-text-marquee');

        var Marquee = function (marquee) {
            this.holder = marquee;
            this.els = this.holder.find('.mkdf-marquee-element');
            this.delta = .05;
        }

        var inRange = function (el) {
            if (mkdf.scroll + mkdf.windowHeight >= el.offset().top &&
                mkdf.scroll < el.offset().top + el.height()) {
                return true;
            }

            return false;
        }

        var loop = function (marquee) {
            if (!inRange(marquee.holder)) {
                requestAnimationFrame(function () {
                    loop(marquee);
                });
                return false;
            } else {
                marquee.els.each(function (i) {
                    var el = $(this);
                    el.css('transform', 'translate3d(' + el.data('x') + '%, 0, 0)');
                    el.data('x', (el.data('x') - marquee.delta).toFixed(2));
                    el.offset().left < -el.width() - 25 && el.data('x', 100 * Math.abs(i - 1));
                })
                requestAnimationFrame(function () {
                    loop(marquee);
                });
            }
        }

        var init = function (marquee) {
            marquee.els.each(function (i) {
                $(this).data('x', 0);
            });

            requestAnimationFrame(function () {
                loop(marquee);
            });
        }

        return {
            init: function () {
                marquees.length &&
                marquees.each(function () {
                    var marquee = new Marquee($(this));

                    init(marquee);
                });
            }
        }
    }
})(jQuery);
(function($) {
    'use strict';

    var uncoveringSections = {};
    mkdf.modules.uncoveringSections = uncoveringSections;

    uncoveringSections.mkdfInitUncoveringSections = mkdfInitUncoveringSections;


    uncoveringSections.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfInitUncoveringSections();
    }

    /*
     **	Init full screen sections shortcode
     */
    function mkdfInitUncoveringSections(){
        var uncoveringSections = $('.mkdf-uncovering-sections');

        if(uncoveringSections.length){
            uncoveringSections.each(function() {
                var thisUS = $(this),
                    thisCurtain = uncoveringSections.find('.curtains'),
                    curtainItems = thisCurtain.find('.mkdf-uss-item'),
                    curtainShadow = uncoveringSections.find('.mkdf-fss-shadow');
                var body = mkdf.body;
                var defaultHeaderStyle = '';
                if (body.hasClass('mkdf-light-header')) {
                    defaultHeaderStyle = 'light';
                } else if (body.hasClass('mkdf-dark-header')) {
                    defaultHeaderStyle = 'dark';
                }

                body.addClass('mkdf-uncovering-section-on-page');
                if(mkdfPerPageVars.vars.mkdfHeaderVerticalWidth > 0 && mkdf.windowWidth > 1024) {
                    curtainItems.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });

                    curtainShadow.css({
                        left : mkdfPerPageVars.vars.mkdfHeaderVerticalWidth,
                        width: 'calc(100% - ' + mkdfPerPageVars.vars.mkdfHeaderVerticalWidth + 'px)'
                    });
                }

                thisCurtain.curtain({
                    scrollSpeed: 400,
                    nextSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle); },
                    prevSlide: function() { checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);}
                });

                checkFullScreenSectionsItemForHeaderStyle(thisCurtain, defaultHeaderStyle);
                setResposniveData(thisCurtain);

                thisUS.addClass('mkdf-loaded');
            });
        }
    }

    function checkFullScreenSectionsItemForHeaderStyle(thisUncoveringSections, default_header_style) {
        var section_header_style = thisUncoveringSections.find('.current').data('header-style');
        if (section_header_style !== undefined && section_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + section_header_style + '-header');
        } else if (default_header_style !== '') {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header').addClass('mkdf-' + default_header_style + '-header');
        } else {
            mkdf.body.removeClass('mkdf-light-header mkdf-dark-header');
        }
    }

    function setResposniveData(thisUncoveringSections) {
        var uncoveringSections = thisUncoveringSections.find('.mkdf-uss-item'),
            responsiveStyle = '',
            style = '';

        uncoveringSections.each(function(){
            var thisSection = $(this),
                thisSectionImage = thisSection.find('.mkdf-uss-image-holder'),
                itemClass = '',
                imageLaptop = '',
                imageTablet = '',
                imagePortraitTablet = '',
                imageMobile = '';

            if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
                itemClass = thisSection.data('item-class');
            }

            if (typeof thisSectionImage.data('laptop-image') !== 'undefined' && thisSectionImage.data('laptop-image') !== false) {
                imageLaptop = thisSectionImage.data('laptop-image');
            }
            if (typeof thisSectionImage.data('tablet-image') !== 'undefined' && thisSectionImage.data('tablet-image') !== false) {
                imageTablet = thisSectionImage.data('tablet-image');
            }
            if (typeof thisSectionImage.data('tablet-portrait-image') !== 'undefined' && thisSectionImage.data('tablet-portrait-image') !== false) {
                imagePortraitTablet = thisSectionImage.data('tablet-portrait-image');
            }
            if (typeof thisSectionImage.data('mobile-image') !== 'undefined' && thisSectionImage.data('mobile-image') !== false) {
                imageMobile = thisSectionImage.data('mobile-image');
            }


            if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {

                if (imageLaptop.length) {
                    responsiveStyle += "@media only screen and (max-width: 1366px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url(" + imageLaptop + ") !important; } }";
                }
                if (imageTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 1024px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageTablet + ") !important; } }";
                }
                if (imagePortraitTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 800px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imagePortraitTablet + ") !important; } }";
                }
                if (imageMobile.length) {
                    responsiveStyle += "@media only screen and (max-width: 680px) {.mkdf-uss-item." + itemClass + " .mkdf-uss-image-holder { background-image: url( " + imageMobile + ") !important; } }";
                }
            }
        });

        if (responsiveStyle.length) {
            style = '<style type="text/css">' + responsiveStyle + '</style>';
        }

        if (style.length) {
            $('head').append(style);
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var destinationList = {};
    mkdf.modules.destinationList = destinationList;

    destinationList.mkdfOnWindowLoad = mkdfOnWindowLoad;
    destinationList.mkdfOnWindowScroll = mkdfOnWindowScroll;

    $(window).on('load', mkdfOnWindowLoad);
    $(window).scroll(mkdfOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitDestinationListAnimation();
	    mkdfInitDestinationPagination().init();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function mkdfOnWindowScroll() {
	    mkdfInitDestinationPagination().scroll();
    }

    /**
     * Initializes destination list article animation
     */
    function mkdfInitDestinationListAnimation(){
        var destList = $('.mkdf-destination-list-holder.mkdf-dl-has-animation');

        if(destList.length){
            destList.each(function(){
                var thisDestList = $(this).children('.mkdf-dl-inner');

                thisDestList.children('article').each(function(l) {
                    var thisArticle = $(this);

                    thisArticle.appear(function() {
                        thisArticle.addClass('mkdf-item-show');

                        setTimeout(function(){
                            thisArticle.addClass('mkdf-item-shown');
                        }, 1000);
                    },{accX: 0, accY: 0});
                });
            });
        }
    }
	
	/**
	 * Initializes destination pagination functions
	 */
	function mkdfInitDestinationPagination(){
		var destList = $('.mkdf-destination-list-holder');
		
		var initStandardPagination = function(thisDestList) {
			var standardLink = thisDestList.find('.mkdf-dl-standard-pagination li');
			
			if(standardLink.length) {
				standardLink.each(function(){
					var thisLink = $(this).children('a'),
						pagedLink = 1;
					
					thisLink.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
							pagedLink = thisLink.data('paged');
						}
						
						initMainPagFunctionality(thisDestList, pagedLink);
					});
				});
			}
		};
		
		var initLoadMorePagination = function(thisDestList) {
			var loadMoreButton = thisDestList.find('.mkdf-dl-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisDestList);
			});
		};
		
		var initInifiteScrollPagination = function(thisDestList) {
			var destListHeight = thisDestList.outerHeight(),
				destListTopOffest = thisDestList.offset().top,
				destListPosition = destListHeight + destListTopOffest - mkdfGlobalVars.vars.mkdfAddForAdminBar;
			
			if(!thisDestList.hasClass('mkdf-dl-infinite-scroll-started') && mkdf.scroll + mkdf.windowHeight > destListPosition) {
				initMainPagFunctionality(thisDestList);
			}
		};
		
		var initMainPagFunctionality = function(thisDestList, pagedLink) {
			var thisDestListInner = thisDestList.find('.mkdf-dl-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisDestList.data('max-num-pages') !== 'undefined' && thisDestList.data('max-num-pages') !== false) {
				maxNumPages = thisDestList.data('max-num-pages');
			}
			
			if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
				thisDestList.data('next-page', pagedLink);
			}
			
			if(thisDestList.hasClass('mkdf-dl-pag-infinite-scroll')) {
				thisDestList.addClass('mkdf-dl-infinite-scroll-started');
			}
			
			var loadMoreDatta = mkdf.modules.common.getLoadMoreData(thisDestList),
				loadingItem = thisDestList.find('.mkdf-dl-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages || maxNumPages === 0){
				if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
					loadingItem.addClass('mkdf-showing mkdf-standard-pag-trigger');
					thisDestList.addClass('mkdf-dl-pag-standard-animate');
				} else {
					loadingItem.addClass('mkdf-showing');
				}
				
				var ajaxData = mkdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'wanderland_core_destination_ajax_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: mkdfGlobalVars.vars.mkdfAjaxUrl,
					success: function (data) {
						if(!thisDestList.hasClass('mkdf-dl-pag-standard')) {
							nextPage++;
						}
						
						thisDestList.data('next-page', nextPage);
						
						var response = $.parseJSON(data),
							responseHtml =  response.html;
						
						if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
							mkdfInitStandardPaginationLinkChanges(thisDestList, maxNumPages, nextPage);
							
							thisDestList.waitForImages(function(){
								if(thisDestList.hasClass('mkdf-dl-masonry')){
									mkdfInitHtmlIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								} else if (thisDestList.hasClass('mkdf-dl-gallery') && thisDestList.hasClass('mkdf-dl-has-filter')) {
									mkdfInitHtmlIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								} else {
									mkdfInitHtmlGalleryNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								}
							});
						} else {
							thisDestList.waitForImages(function(){
								if(thisDestList.hasClass('mkdf-dl-masonry')){
								    if(pagedLink === 1) {
                                        mkdfInitHtmlIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
                                    }
								} else if (thisDestList.hasClass('mkdf-dl-gallery') && thisDestList.hasClass('mkdf-dl-has-filter') && pagedLink !== 1) {
									mkdfInitAppendIsotopeNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
								} else {
								    if (pagedLink === 1) {
                                        mkdfInitHtmlGalleryNewContent(thisDestList, thisDestListInner, loadingItem, responseHtml);
                                    } else {
                                        mkdfInitAppendGalleryNewContent(thisDestListInner, loadingItem, responseHtml);
                                    }
								}
							});
						}
						
						if(thisDestList.hasClass('mkdf-dl-infinite-scroll-started')) {
							thisDestList.removeClass('mkdf-dl-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisDestList.find('.mkdf-dl-load-more-holder').hide();
			}
		};
		
		var mkdfInitStandardPaginationLinkChanges = function(thisDestList, maxNumPages, nextPage) {
			var standardPagHolder = thisDestList.find('.mkdf-dl-standard-pagination'),
				standardPagNumericItem = standardPagHolder.find('li.mkdf-pag-number'),
				standardPagPrevItem = standardPagHolder.find('li.mkdf-pag-prev a'),
				standardPagNextItem = standardPagHolder.find('li.mkdf-pag-next a');
			
			standardPagNumericItem.removeClass('mkdf-pag-active');
			standardPagNumericItem.eq(nextPage-1).addClass('mkdf-pag-active');
			
			standardPagPrevItem.data('paged', nextPage-1);
			standardPagNextItem.data('paged', nextPage+1);
			
			if(nextPage > 1) {
				standardPagPrevItem.css({'opacity': '1'});
			} else {
				standardPagPrevItem.css({'opacity': '0'});
			}
			
			if(nextPage === maxNumPages) {
				standardPagNextItem.css({'opacity': '0'});
			} else {
				standardPagNextItem.css({'opacity': '1'});
			}
		};
		
		var mkdfInitHtmlIsotopeNewContent = function(thisDestList, thisDestListInner, loadingItem, responseHtml) {
            thisDestListInner.find('article').remove();
            thisDestListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisDestList, thisDestListInner.find('article'), thisDestListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisDestListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisDestList.removeClass('mkdf-dl-pag-standard-animate');
			
			setTimeout(function() {
				thisDestListInner.isotope('layout');
				mkdfInitDestinationListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitHtmlGalleryNewContent = function(thisDestList, thisDestListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing mkdf-standard-pag-trigger');
			thisDestList.removeClass('mkdf-dl-pag-standard-animate');
			thisDestListInner.html(responseHtml);
			mkdfInitDestinationListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
		};
		
		var mkdfInitAppendIsotopeNewContent = function(thisDestList, thisDestListInner, loadingItem, responseHtml) {
            thisDestListInner.append(responseHtml);
			mkdf.modules.common.setFixedImageProportionSize(thisDestList, thisDestListInner.find('article'), thisDestListInner.find('.mkdf-masonry-grid-sizer').width(), true);
            thisDestListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('mkdf-showing');
			
			setTimeout(function() {
				thisDestListInner.isotope('layout');
				mkdfInitDestinationListAnimation();
				mkdf.modules.common.mkdfInitParallax();
				mkdf.modules.common.mkdfPrettyPhoto();
			}, 600);
		};
		
		var mkdfInitAppendGalleryNewContent = function(thisDestListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('mkdf-showing');
			thisDestListInner.append(responseHtml);
			mkdfInitDestinationListAnimation();
			mkdf.modules.common.mkdfInitParallax();
			mkdf.modules.common.mkdfPrettyPhoto();
		};
		
		return {
			init: function() {
				if(destList.length) {
					destList.each(function() {
						var thisDestList = $(this);
						
						if(thisDestList.hasClass('mkdf-dl-pag-standard')) {
							initStandardPagination(thisDestList);
						}
						
						if(thisDestList.hasClass('mkdf-dl-pag-load-more')) {
							initLoadMorePagination(thisDestList);
						}
						
						if(thisDestList.hasClass('mkdf-dl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisDestList);
						}
					});
				}
			},
			scroll: function() {
				if(destList.length) {
					destList.each(function() {
						var thisDestList = $(this);
						
						if(thisDestList.hasClass('mkdf-dl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisDestList);
						}
					});
				}
			},
            getMainPagFunction: function(thisDestList, paged) {
                initMainPagFunctionality(thisDestList, paged);
            }
		};
	}

})(jQuery);
(function($) {
    'use strict';
	
	var masonryGalleryList = {};
	mkdf.modules.masonryGalleryList = masonryGalleryList;

    masonryGalleryList.mkdfInitMasonryGallery = mkdfInitMasonryGallery;

    masonryGalleryList.mkdfOnDocumentReady = mkdfOnDocumentReady;
	
	$(document).ready(mkdfOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function mkdfOnDocumentReady() {
		mkdfInitMasonryGallery().init();
	}
	
	/**
	 * Masonry gallery, init masonry and resize pictures in grid
	 */
	function mkdfInitMasonryGallery() {
		var holder = $('.mkdf-masonry-gallery-holder');
		
		var initMasonryGallery = function (thisHolder, size) {
			thisHolder.waitForImages(function () {
				var masonry = thisHolder.children();
				
				masonry.isotope({
					layoutMode: 'packery',
					itemSelector: '.mkdf-mg-item',
					percentPosition: true,
					packery: {
						gutter: '.mkdf-mg-grid-gutter',
						columnWidth: '.mkdf-mg-grid-sizer'
					}
				});
				
				mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
				
				setTimeout(function () {
					mkdf.modules.common.mkdfInitParallax();
				}, 600);
				
				masonry.isotope( 'layout').css('opacity', '1');
			});
		};
		
		var reInitMasonryGallery = function (thisHolder, size) {
			mkdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('.mkdf-mg-item'), size, true);
			
			thisHolder.children().isotope('reloadItems');
		};
		
		return {
			init: function () {
				if (holder.length) {
					holder.each(function () {
						var thisHolder = $(this),
							size = thisHolder.find('.mkdf-mg-grid-sizer').outerWidth();
						
						initMasonryGallery(thisHolder, size);
						
						$(window).resize(function () {
							reInitMasonryGallery(thisHolder, size);
						});
					});
				}
			}
		};
	}

})(jQuery);
(function ($) {
    'use strict';

    var testimonialsCarousel = {};
    mkdf.modules.testimonialsCarousel = testimonialsCarousel;

    testimonialsCarousel.mkdfInitTestimonials = mkdfInitTestimonialsCarousel;


    testimonialsCarousel.mkdfOnWindowLoad = mkdfOnWindowLoad;

    $(window).on('load', mkdfOnWindowLoad);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function mkdfOnWindowLoad() {
        mkdfInitTestimonialsCarousel();
    }

    /**
     * Init testimonials shortcode elegant type
     */
    function mkdfInitTestimonialsCarousel(){
        var testimonial = $('.mkdf-testimonials-holder.mkdf-testimonials-carousel');

        if(testimonial.length){
            testimonial.each(function(){
                var thisTestimonials = $(this),
                    mainTestimonialsSlider = thisTestimonials.find('.mkdf-testimonials-main'),
                    imagePagSlider = thisTestimonials.children('.mkdf-testimonial-image-nav'),
                    loop = true,
                    autoplay = true,
                    sliderSpeed = 5000,
                    sliderSpeedAnimation = 600,
                    mouseDrag = false;

                if (mainTestimonialsSlider.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (mainTestimonialsSlider.data('enable-autoplay') === 'no') {
                    autoplay = false;
                }
                if (typeof mainTestimonialsSlider.data('slider-speed') !== 'undefined' && mainTestimonialsSlider.data('slider-speed') !== false) {
                    sliderSpeed = mainTestimonialsSlider.data('slider-speed');
                }
                if (typeof mainTestimonialsSlider.data('slider-speed-animation') !== 'undefined' && mainTestimonialsSlider.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = mainTestimonialsSlider.data('slider-speed-animation');
                }
                if(mkdf.windowWidth < 680){
                    mouseDrag = true;
                }

                if (mainTestimonialsSlider.length && imagePagSlider.length) {
                    var text = mainTestimonialsSlider.owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: mouseDrag,
                        onInitialize: function () {
                            mainTestimonialsSlider.css('visibility', 'visible');
                        }
                    });

                    var image = imagePagSlider.owlCarousel({
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        center: true,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: false,
                        responsive: {
                            1025: {
                                items: 5
                            },
                            0: {
                                items: 3
                            }
                        },
                        onInitialize: function () {
                            imagePagSlider.css('visibility', 'visible');
                            thisTestimonials.css('opacity', '1');
                        }
                    });

                    imagePagSlider.find('.owl-item').on('click touchpress', function (e) {
                        e.preventDefault();

                        var thisItem = $(this),
                            itemIndex = thisItem.index(),
                            numberOfClones = imagePagSlider.find('.owl-item.cloned').length,
                            modifiedItems = itemIndex - numberOfClones / 2 >= 0 ? itemIndex - numberOfClones / 2 : itemIndex;

                        image.trigger('to.owl.carousel', modifiedItems);
                        text.trigger('to.owl.carousel', modifiedItems);
                    });

                }
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var testimonialsImagePagination = {};
    mkdf.modules.testimonialsImagePagination = testimonialsImagePagination;

    testimonialsImagePagination.mkdfOnDocumentReady = mkdfOnDocumentReady;

    $(document).ready(mkdfOnDocumentReady);

    /* 
     All functions to be called on $(document).ready() should be in this function
     */
    function mkdfOnDocumentReady() {
        mkdfTestimonialsImagePagination();
    }

    /**
     * Init Owl Carousel
     */
    function mkdfTestimonialsImagePagination() {
        var sliders = $('.mkdf-testimonials-image-pagination-inner');

        if (sliders.length) {
            sliders.each(function() {
                var slider = $(this),
                    slideItemsNumber = slider.children().length,
                    loop = true,
                    autoplay = true,
                    autoplayHoverPause = false,
                    sliderSpeed = 3500,
                    sliderSpeedAnimation = 500,
                    margin = 0,
                    stagePadding = 0,
                    center = false,
                    autoWidth = false,
                    animateInClass = false, // keyframe css animation
                    animateOutClass = false, // keyframe css animation
                    navigation = true,
                    pagination = false,
                    drag = true,
                    sliderDataHolder = slider;

                if (sliderDataHolder.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
                    sliderSpeed = sliderDataHolder.data('slider-speed');
                }
                if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
                }
                if (sliderDataHolder.data('enable-auto-width') === 'yes') {
                    autoWidth = true;
                }
                if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
                    animateInClass = sliderDataHolder.data('slider-animate-in');
                }
                if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                    animateOutClass = sliderDataHolder.data('slider-animate-out');
                }
                if (sliderDataHolder.data('enable-navigation') === 'no') {
                    navigation = false;
                }
                if (sliderDataHolder.data('enable-pagination') === 'yes') {
                    pagination = true;
                }

                if (navigation && pagination) {
                    slider.addClass('mkdf-slider-has-both-nav');
                }

                if (pagination) {
                    var dotsContainer = '#mkdf-testimonial-pagination';
                    $('.mkdf-tsp-item').on('click', function () {
                        slider.trigger('to.owl.carousel', [$(this).index(), 300]);
                    });
                }

                if (slideItemsNumber <= 1) {
                    loop = false;
                    autoplay = false;
                    navigation = false;
                    pagination = false;
                }

                slider.waitForImages(function () {
                    $(this).owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayHoverPause: autoplayHoverPause,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        margin: margin,
                        stagePadding: stagePadding,
                        center: center,
                        autoWidth: autoWidth,
                        animateIn: animateInClass,
                        animateOut: animateOutClass,
                        dots: pagination,
                        dotsContainer: dotsContainer,
                        nav: navigation,
                        drag: drag,
                        callbacks: true,
                        navText: [
                            '<span class="mkdf-prev-icon ion-chevron-left"></span>',
                            '<span class="mkdf-next-icon ion-chevron-right"></span>'
                        ],
                        onInitialize: function () {
                            slider.css('visibility', 'visible');
                        },
                        onDrag: function (e) {
                            if (mkdf.body.hasClass('mkdf-smooth-page-transitions-fadeout')) {
                                var sliderIsMoving = e.isTrigger > 0;

                                if (sliderIsMoving) {
                                    slider.addClass('mkdf-slider-is-moving');
                                }
                            }
                        },
                        onDragged: function () {
                            if (mkdf.body.hasClass('mkdf-smooth-page-transitions-fadeout') && slider.hasClass('mkdf-slider-is-moving')) {

                                setTimeout(function () {
                                    slider.removeClass('mkdf-slider-is-moving');
                                }, 500);
                            }
                        }
                    });

                });
            });
        }
    }
    
})(jQuery);