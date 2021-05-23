<?php

if ( ! function_exists( 'wanderland_mikado_set_header_bottom_centered_type_global_option' ) ) {
	/**
	 * This function set header type value for global header option map
	 */
	function wanderland_mikado_set_header_bottom_centered_type_global_option( $header_types ) {
		$header_types['header-bottom-centered'] = array(
			'image' => WANDERLAND_MIKADO_FRAMEWORK_HEADER_TYPES_ROOT . '/header-bottom/assets/img/header-bottom.png',
			'label' => esc_html__( 'Bottom Centered', 'wanderland' )
		);
		
		return $header_types;
	}
	
	add_filter( 'wanderland_mikado_filter_header_type_global_option', 'wanderland_mikado_set_header_bottom_centered_type_global_option' );
}

if ( ! function_exists( 'wanderland_mikado_set_header_bottom_centered_type_meta_boxes_option' ) ) {
	/**
	 * This function set header type value for header meta boxes map
	 */
	function wanderland_mikado_set_header_bottom_centered_type_meta_boxes_option( $header_type_options ) {
		$header_type_options['header-bottom-centered'] = esc_html__( 'Bottom Centered', 'wanderland' );
		
		return $header_type_options;
	}
	
	add_filter( 'wanderland_mikado_filter_header_type_meta_boxes', 'wanderland_mikado_set_header_bottom_centered_type_meta_boxes_option' );
}

if ( ! function_exists( 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' ) ) {
	/**
	 * This function is used to hide all containers/panels for admin options when this header type is selected
	 */
	function wanderland_mikado_set_hide_dep_options_header_bottom_centered( $hide_dep_options ) {
		$hide_dep_options[] = 'header-bottom-centered';
		
		return $hide_dep_options;
	}
	
	// header global panel options
	add_filter( 'wanderland_mikado_filter_header_logo_area_hide_global_option', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	
	// header global panel meta boxes
	add_filter( 'wanderland_mikado_filter_header_logo_area_hide_meta_boxes', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	
	// header types panel options
	add_filter( 'wanderland_mikado_filter_header_centered_hide_global_option', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	add_filter( 'wanderland_mikado_filter_full_screen_menu_hide_global_option', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	add_filter( 'wanderland_mikado_filter_header_vertical_hide_global_option', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	add_filter( 'wanderland_mikado_filter_header_vertical_menu_hide_global_option', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	add_filter( 'wanderland_mikado_filter_header_vertical_closed_hide_global_option', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	add_filter( 'wanderland_mikado_filter_header_vertical_sliding_hide_global_option', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	
	// header types panel meta boxes
	add_filter( 'wanderland_mikado_filter_header_centered_hide_meta_boxes', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
	add_filter( 'wanderland_mikado_filter_header_vertical_hide_meta_boxes', 'wanderland_mikado_set_hide_dep_options_header_bottom_centered' );
}