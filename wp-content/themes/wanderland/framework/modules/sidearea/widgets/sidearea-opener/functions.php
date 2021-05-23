<?php

if ( ! function_exists( 'wanderland_mikado_register_sidearea_opener_widget' ) ) {
	/**
	 * Function that register sidearea opener widget
	 */
	function wanderland_mikado_register_sidearea_opener_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassSideAreaOpener';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_sidearea_opener_widget' );
}