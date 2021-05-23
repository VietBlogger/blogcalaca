<?php

if ( ! function_exists( 'wanderland_core_add_google_maps_extensions' ) ) {
    function wanderland_core_add_google_maps_extensions( $extensions ) {
        $items      = array(
            'geometry',
            'places'
        );
        $extensions = array_unique( array_merge( $extensions, $items ) );

        return $extensions;
    }

    add_filter( 'wanderland_mikado_filter_google_maps_extensions_array', 'wanderland_core_add_google_maps_extensions' );
}

if ( ! function_exists( 'wanderland_core_enable_google_maps_in_admin' ) ) {
    function wanderland_core_enable_google_maps_in_admin() {
        return true;
    }

    add_action( 'wanderland_mikado_filter_google_maps_in_backend', 'wanderland_core_enable_google_maps_in_admin' );
}

if ( ! function_exists( 'wanderland_core_set_global_map_variables' ) ) {
    /**
     * Function for setting global map variables
     */
    function wanderland_core_set_global_map_variables() {
        $global_map_variables = array();

        $global_map_variables['mapStyle']          = json_decode( wanderland_mikado_options()->getOptionValue( 'destination_map_style' ) );
        $global_map_variables['scrollable']        = wanderland_mikado_options()->getOptionValue( 'destination_maps_scrollable' ) == 'yes' ? true : false;
        $global_map_variables['draggable']         = wanderland_mikado_options()->getOptionValue( 'destination_maps_draggable' ) == 'yes' ? true : false;
        $global_map_variables['streetViewControl'] = wanderland_mikado_options()->getOptionValue( 'destination_maps_street_view_control' ) == 'yes' ? true : false;
        $global_map_variables['zoomControl']       = wanderland_mikado_options()->getOptionValue( 'destination_maps_zoom_control' ) == 'yes' ? true : false;
        $global_map_variables['mapTypeControl']    = wanderland_mikado_options()->getOptionValue( 'destination_maps_type_control' ) == 'yes' ? true : false;

        $global_map_variables = apply_filters( 'wanderland_mikado_filter_js_global_map_variables', $global_map_variables );

        wp_localize_script( 'wanderland-mikado-modules', 'mkdfMapsVars', array(
            'global' => $global_map_variables
        ) );
    }

    add_action( 'wp_enqueue_scripts', 'wanderland_core_set_global_map_variables', 20 );
}

/* MULTIPLE MAP FUNCTIONS - START */
if ( ! function_exists( 'wanderland_core_set_multiple_map_variables' ) ) {
    /**
     * Function for setting single map variables
     *
     * @param $query - $query is used just for multiple type. $query is Wp_Query args object containing destination items which should be presented on map
     * @param $return - whether map object should be returned (for ajax call) or passed to localize script
     *
     * @return array - array with addresses parameters
     */
    function wanderland_core_set_multiple_map_variables( $query = '', $return = false ) {
        $map_variables = array();
        $items         = wanderland_core_get_cpt_items( 'destination-item', $query );

        if ( ! empty( $items ) ) {
            foreach ( $items as $id => $title ) {
                $map_variables['addresses'][] = wanderland_core_generate_destination_map_params( $id );
            }
        }

        if ( $return ) {
            return $map_variables;
        }

        wp_localize_script( 'wanderland-mikado-modules', 'mkdfMultipleMapVars', array(
            'multiple' => $map_variables
        ) );
    }
}

if ( ! function_exists( 'wanderland_core_get_destination_multiple_map' ) ) {
    /**
     * Function that renders map holder for multiple destination item
     *
     * @param $query - $query is used just for multiple type. $query is Wp_Query object containing destination items which should be presented on map
     *
     * @return string
     */
    function wanderland_core_get_destination_multiple_map( $query = '' ) {
	    wanderland_core_set_multiple_map_variables( $query );

        $html = '<div id="mkdf-destination-multiple-map-holder"></div>';

        do_action( 'wanderland_mikado_action_after_destination_map' );

        return $html;
    }
}

/* MULTIPLE MAP FUNCTIONS - START */

/* MAP ITEMS FUNCTIONS START - */
if ( ! function_exists( 'wanderland_core_marker_info_template' ) ) {
    /**
     * Template with placeholders for marker info window
     *
     * uses underscore templates
     */
    function wanderland_core_marker_info_template() {

        $html = '<script type="text/template" class="mkdf-info-window-template">
				<div class="mkdf-info-window">
					<div class="mkdf-info-window-inner">
					    <a itemprop="url" class="mkdf-info-window-link" href="<%= itemUrl %>"></a>
						<% if ( featuredImage ) { %>
							<div class="mkdf-info-window-image">
							    <span class="icon_close"></span>
								<img itemprop="image" src="<%= featuredImage[0] %>" alt="<%= title %>" width="<%= featuredImage[1] %>" height="<%= featuredImage[2] %>">
							</div>
						<% } %>
						<div class="mkdf-info-window-details">
							<h6 itemprop="name" class="mkdf-info-window-title"><%= title %></h6>
							<p itemprop="name" class="mkdf-info-window-excerpt"><%= excerpt %></p>
						</div>
					</div>
				</div>
			</script>';

        print wanderland_mikado_get_module_part($html);
    }

    add_action( 'wanderland_mikado_action_after_destination_map', 'wanderland_core_marker_info_template' );
}

if ( ! function_exists( 'wanderland_core_marker_template' ) ) {
    /**
     * Template with placeholders for marker
     */
    function wanderland_core_marker_template() {

        $html = '<script type="text/template" class="mkdf-marker-template">
				<div class="mkdf-map-marker">
					<div class="mkdf-map-marker-inner">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20.6 36" style="enable-background:new 0 0 20.6 36;" xml:space="preserve">
				<g>
					<path style="fill:#59815C;" d="M4.8,18.3V7C3.5,6.6,2.4,6,1.6,5.4C0.8,4.7,0.4,4.1,0.4,3.5c0-1.1,1.6-1.9,4.9-2.4s6.6-0.5,9.8,0
						s4.9,1.3,4.9,2.4c0,0.5-0.4,1.2-1.2,1.8c-0.8,0.7-1.9,1.2-3.2,1.7v11.3c2.9,0.7,4.4,2,4.4,3.8c0,0.8-0.8,1.5-2.5,1.9
						c-1.7,0.5-3.8,0.7-6.2,0.8v6.6c0,0.7-0.1,1.6-0.3,2.7s-0.5,1.6-0.8,1.6s-0.5-0.5-0.8-1.6s-0.3-2-0.3-2.7v-6.6
						C6.7,24.7,4.7,24.4,3,24c-1.7-0.5-2.5-1.1-2.5-1.9C0.4,20.3,1.9,19,4.8,18.3z"/>
				</g>
				</svg>
					</div>
				</div>
			</script>';

        print wanderland_mikado_get_module_part($html);
    }

    add_action( 'wanderland_mikado_action_after_destination_map', 'wanderland_core_marker_template' );
}

/* MAP ITEMS FUNCTIONS - END */

/* HELPER FUNCTIONS - START */

if ( ! function_exists( 'wanderland_core_generate_destination_map_params' ) ) {
    function wanderland_core_generate_destination_map_params( $item_id ) {
        $map_params = array();

        //get destination image
        $image_id = get_post_thumbnail_id( $item_id );
        $image    = wp_get_attachment_image_src( $image_id, 'thumbnail' );

        //take marker pin
        $marker_pin = wanderland_mikado_icon_collections()->renderIcon( 'icon_pin', 'font_elegant' );

        //get address params
        $address_array = wanderland_core_get_address_params( $item_id );

        //excerpt length

        $excerpt_full = get_the_excerpt( $item_id );
        $charlength = 50;

        if ( mb_strlen( $excerpt_full ) > $charlength ) {
            $subex = mb_substr( $excerpt_full, 0, $charlength - 5 );
            $exwords = explode( ' ', $subex );
            $excut = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );
            if ( $excut < 0 ) {
                $excerpt = mb_substr( $subex, 0, $excut );
            } else {
                $excerpt = $subex;
            }
            $excerpt .= '...';
        } else {
            $excerpt = $excerpt_full;
        }

        //Get item location
        if ( $address_array['address'] === '' && $address_array['address_lat'] === '' && $address_array['address_long'] === '' ) {
            $map_params['location'] = null;
        } else {
            $map_params['location'] = array(
                'address'   => $address_array['address'],
                'latitude'  => $address_array['address_lat'],
                'longitude' => $address_array['address_long']
            );
        }

        $cat_taxonomy = 'destination-category';
        $destination_cat_terms = get_terms($cat_taxonomy);

        $map_params['categories']    = '';
        if ( $destination_cat_terms && !is_wp_error( $destination_cat_terms ) ) :
                 foreach ( $destination_cat_terms as $term ) {
                    if(has_term( $term, 'destination-category', $item_id )) {
                        $map_params['categories'] .= '<a href="'.get_term_link($term->slug, $cat_taxonomy).'">'.$term->name .'</a>';
                    }
                 }
        endif;

        $map_params['title']         = get_the_title( $item_id );
        $map_params['excerpt']       = $excerpt;
        $map_params['itemId']        = $item_id;
        $map_params['markerPin']     = $marker_pin;
        $map_params['featuredImage'] = $image;
        $map_params['itemUrl']       = get_the_permalink( $item_id );

        return $map_params;
    }
}

if ( ! function_exists( 'wanderland_core_get_address_params' ) ) {
    /**
     * Function that set up address params
     *
     * @param $id - id of current post
     *
     * @return array
     */
    function wanderland_core_get_address_params( $id ) {
        $address_array  = array();
        $address_string = get_post_meta( $id, 'mkdf_destination_single_full_address_meta', true );
        $address_lat    = get_post_meta( $id, 'mkdf_destination_single_full_address_latitude_meta', true );
        $address_long   = get_post_meta( $id, 'mkdf_destination_single_full_address_longitude_meta', true );

        $address_array['address']      = $address_string !== '' ? $address_string : '';
        $address_array['address_lat']  = $address_lat !== '' ? $address_lat : '';
        $address_array['address_long'] = $address_long !== '' ? $address_long : '';

        return $address_array;
    }
}

/* HELPER FUNCTIONS - END */