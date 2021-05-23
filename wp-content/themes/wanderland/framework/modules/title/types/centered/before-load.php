<?php

if ( ! function_exists( 'wanderland_mikado_set_hide_dep_options_title_centered' ) ) {
	/**
	 * This function is used to hide all containers/panels for admin options when this title type is selected
	 */
	function wanderland_mikado_set_hide_dep_options_title_centered( $hide_dep_options ) {
		$hide_dep_options[] = 'centered';
		
		return $hide_dep_options;
	}
	
	// hide breadcrumbs meta
	add_filter( 'wanderland_mikado_filter_breadcrumbs_title_hide_meta_boxes', 'wanderland_mikado_set_hide_dep_options_title_centered' );
}