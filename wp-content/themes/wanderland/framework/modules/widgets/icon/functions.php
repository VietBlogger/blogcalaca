<?php

if ( ! function_exists( 'wanderland_mikado_register_icon_widget' ) ) {
	/**
	 * Function that register icon widget
	 */
	function wanderland_mikado_register_icon_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassIconWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_icon_widget' );
}