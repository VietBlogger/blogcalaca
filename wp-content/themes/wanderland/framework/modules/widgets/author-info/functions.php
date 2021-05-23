<?php

if ( ! function_exists( 'wanderland_mikado_register_author_info_widget' ) ) {
	/**
	 * Function that register author info widget
	 */
	function wanderland_mikado_register_author_info_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassAuthorInfoWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_author_info_widget' );
}