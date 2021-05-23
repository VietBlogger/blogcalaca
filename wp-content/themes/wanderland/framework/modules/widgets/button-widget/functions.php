<?php

if ( ! function_exists( 'wanderland_mikado_register_button_widget' ) ) {
	/**
	 * Function that register button widget
	 */
	function wanderland_mikado_register_button_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassButtonWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_button_widget' );
}