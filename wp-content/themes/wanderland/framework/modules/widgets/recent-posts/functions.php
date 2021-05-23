<?php

if ( ! function_exists( 'wanderland_mikado_register_recent_posts_widget' ) ) {
	/**
	 * Function that register search opener widget
	 */
	function wanderland_mikado_register_recent_posts_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassRecentPosts';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_recent_posts_widget' );
}