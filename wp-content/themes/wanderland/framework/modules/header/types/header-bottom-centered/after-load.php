<?php

if ( ! function_exists( 'wanderland_mikado_disable_behaviors_for_header_bottom_centered' ) ) {
	/**
	 * This function is used to disable sticky header functions that perform processing variables their used in js for this header type
	 */
	function wanderland_mikado_disable_behaviors_for_header_bottom_centered( $allow_behavior ) {
		return false;
	}
	
	if ( wanderland_mikado_check_is_header_type_enabled( 'header-bottom-centered', wanderland_mikado_get_page_id() ) ) {
		add_filter( 'wanderland_mikado_filter_allow_sticky_header_behavior', 'wanderland_mikado_disable_behaviors_for_header_bottom_centered' );
		add_filter( 'wanderland_mikado_filter_allow_content_boxed_layout', 'wanderland_mikado_disable_behaviors_for_header_bottom_centered' );
		
		remove_action('wanderland_mikado_action_after_wrapper_inner', 'wanderland_mikado_get_header');
		add_action('wanderland_mikado_action_before_main_content', 'wanderland_mikado_get_header');
	}
}