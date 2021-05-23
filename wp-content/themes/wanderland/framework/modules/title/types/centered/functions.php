<?php

if ( ! function_exists( 'wanderland_mikado_set_title_centered_type_for_options' ) ) {
	/**
	 * This function set centered title type value for title options map and meta boxes
	 */
	function wanderland_mikado_set_title_centered_type_for_options( $type ) {
		$type['centered'] = esc_html__( 'Centered', 'wanderland' );
		
		return $type;
	}
	
	add_filter( 'wanderland_mikado_filter_title_type_global_option', 'wanderland_mikado_set_title_centered_type_for_options' );
	add_filter( 'wanderland_mikado_filter_title_type_meta_boxes', 'wanderland_mikado_set_title_centered_type_for_options' );
}