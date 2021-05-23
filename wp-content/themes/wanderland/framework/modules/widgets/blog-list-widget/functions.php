<?php

if ( ! function_exists( 'wanderland_mikado_register_blog_list_widget' ) ) {
	/**
	 * Function that register blog list widget
	 */
	function wanderland_mikado_register_blog_list_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassBlogListWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_blog_list_widget' );
}