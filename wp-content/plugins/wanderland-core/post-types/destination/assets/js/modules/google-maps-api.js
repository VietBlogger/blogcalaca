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