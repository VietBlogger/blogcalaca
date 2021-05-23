<?php

if ( ! function_exists( 'wanderland_mikado_disable_behaviors_for_header_vertical' ) ) {
	/**
	 * This function is used to disable sticky header functions that perform processing variables their used in js for this header type
	 */
	function wanderland_mikado_disable_behaviors_for_header_vertical( $allow_behavior ) {
		return false;
	}
	
	if ( wanderland_mikado_check_is_header_type_enabled( 'header-vertical', wanderland_mikado_get_page_id() ) ) {
		add_filter( 'wanderland_mikado_filter_allow_sticky_header_behavior', 'wanderland_mikado_disable_behaviors_for_header_vertical' );
		add_filter( 'wanderland_mikado_filter_allow_content_boxed_layout', 'wanderland_mikado_disable_behaviors_for_header_vertical' );
		remove_action('wanderland_mikado_action_before_page_header', 'wanderland_mikado_get_header_top');
	}
}