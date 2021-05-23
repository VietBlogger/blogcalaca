<?php

if ( ! function_exists( 'wanderland_mikado_register_sticky_sidebar_widget' ) ) {
	/**
	 * Function that register sticky sidebar widget
	 */
	function wanderland_mikado_register_sticky_sidebar_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassStickySidebar';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_sticky_sidebar_widget' );
}